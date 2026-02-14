import { useState } from 'react'
import './styles/generalStyle.scss'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import AddForm from './components/addForm/addForm'
import ContextStoreProvider from './store/contextStore'
import { BrowserRouter } from 'react-router'

function App() {
    return (
        <BrowserRouter>
            <ContextStoreProvider>
                <Header />
                <Main />
                <Footer />
            </ContextStoreProvider>
        </BrowserRouter>
    )
}

export default App
