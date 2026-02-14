import React from 'react'
import PropTypes from 'prop-types'
import style from './Main.module.scss'
import AddForm from '../addForm/addForm'
import MCalendar from '../MCalendar/MCalendar'
import { FaRegCalendarPlus } from "react-icons/fa"
import { Routes, Route } from 'react-router'
import RegisterPage from '../Auth/RegisterPage'
import LoginPage from '../Auth/LoginPage'
import Dcalendar from '../DCalendar/DCalendar'
import Wcalendar from '../WCalendar/WCalendar'

function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false)
    return (
        <div className={style.wrapper}>
            {modalOpen && <AddForm open={setModalOpen} />}
            <button
                className={style.addButton}
                onClick={() => setModalOpen(true)}
            >
                <FaRegCalendarPlus />
            </button>
            <Routes>
                <Route path="/" element={<MCalendar />} />
                <Route path="/week" element={<Wcalendar/>} />
                <Route path="/day" element={<Dcalendar/>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

            </Routes>
        </div>
    )
}

Main.propTypes = {}

export default Main