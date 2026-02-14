import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './addForm.module.scss'

import { ContextStore } from '../../store/contextStore'

function addForm(props) {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [correct, setCorrect] = useState(false)

    const titleRef = useRef(null)
    const dateRef = useRef(null)

    let { addEvent } = React.useContext(ContextStore)


    const handleSubmit = (e) => {
        console.log(date);
        
        e.preventDefault()
        if (correct) {
            addEvent({title, date})
            props.open(false)
        }
    }

    useEffect(() => {
        titleRef.current.style.display = 'none'
        dateRef.current.style.display = 'none'
        if (title.length < 1) {
            titleRef.current.style.display = 'block'
        } else if (date.length < 1) {
            dateRef.current.style.display = 'block'
        } else {
            setCorrect(true)
        }
    }, [title, date])
    return (
        <div className={style.wrapper}>
            <div className={style.inner}>
                <h1 className={style.title}>Add new event</h1>
                <div className={style.item}>
                    <label
                        htmlFor="title"
                        className={style.label}>
                        Title
                    </label>
                    <input
                        type="text"
                        name='title'
                        className={style.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <span className={style.error} ref={titleRef}>Title is empty</span>
                </div>
                <div className={style.item}>
                    <label
                        htmlFor="date"
                        className={style.label}
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        name='date'
                        className={style.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <span className={style.error} ref={dateRef}>Date is empty</span>
                </div>
                <button className={style.button} onClick={handleSubmit} disabled={!correct} >Add</button>
                <button className={style.closeButton} onClick={() => props.open(false)}>✖</button>
            </div>
        </div>
    )
}

addForm.propTypes = {}

export default addForm
