import { useState } from 'react'
import './styles/generalStyle.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { BrowserRouter } from 'react-router'

import { useDispatch } from 'react-redux'
import { uploadTokenFromStorage } from './components/Auth/AuthReducer'

function App() {
    let dispatch = useDispatch()
    dispatch(uploadTokenFromStorage())
    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
        </BrowserRouter>
    )
}

export default App
