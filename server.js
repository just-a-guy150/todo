import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const app = express()
const port = 3000

app.use(express.json())

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // 67
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', async (req, res) => {
    const { login, email, password } = req.body
    try {
        let result = await pool.query(
            `SELECT * FROM users WHERE login = ? OR email = ?`,
            [login, email]
        )

        if (result[0].length > 0) {
            return res.status(400).send({
                error: "Error registering user"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await pool.query(
            `INSERT INTO Users (login, email, password) VALUES (?, ?, ?)`,
            [login, email, hashedPassword]
        )
        res.status(201).send({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).send({ error: "Error registering user.I wonder why did it go wrong?" })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const [users] = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )

        if (users.length === 0) {
            return res
                .status(401)
                .send({ error: "Invalid email or password" })
        }

        const user = users[0]
        console.log(user);
        console.log(password);
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res
                .status(401)
                .send({ error: "Invalid email or password" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).send({ token })



    } catch (error) {
        res.status(500).send({ error: "Error logging in." })
    }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(403).send({ error: "Access denied" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403).send({ error: "Invalid token" })
        }

        req.user = user
        next()
    })
}

app.get("/protected", authenticateToken, (req, res) => {
    res.send({ message: `Hello ${req.user.id}` })
})


app.post("/addEvent", authenticateToken, async (req, res) => {
    const { title, data } = req.body
    try {
        await pool.query(
            `INSERT INTO events (title, data, user_id) VALUES (?, ?, ?)`,
            [title, data, req.user.id]
        )
        res.status(201).send({ message: "Event added successfully" })
    } catch (error) {
        res.status(500).send({ error: "Error adding event" })
    }
})

app.get("/getEvents", authenticateToken, async (req, res) => {
    try {
        const [events] = await pool.query(`SELECT * FROM events`)
        res.status(200).send(events)
    } catch (error) {
        res.status(500).send({ error: "Error fetching events" })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})