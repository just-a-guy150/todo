import { useState, useEffect } from 'react'
import './styles/generalStyle.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { BrowserRouter } from 'react-router'
import { getEvents } from './components/CalendarReducer'
import { useDispatch, useSelector } from 'react-redux'
import { uploadTokenFromStorage } from './components/Auth/authReducer'


function App() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(uploadTokenFromStorage())
    }, [])

    let token = useSelector((state) => state.auth.token)

    useEffect(() => {
        if (token) dispatch(getEvents())
    }, [token])

    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
        </BrowserRouter>
    )
}

export default App
