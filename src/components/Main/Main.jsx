import React from 'react'
import PropTypes from 'prop-types'
import style from './Main.module.scss'
import AddForm from '../AddForm/AddForm'
import MCalendar from '../MCalendar/MCalendar'
import { FaRegCalendarPlus } from "react-icons/fa"
import { Routes, Route } from 'react-router'
import RegisterPage from '../Auth/RegisterPage'
import LoginPage from '../Auth/LoginPage'
import Dcalendar from '../DCalendar/DCalendar'
import Wcalendar from '../WCalendar/WCalendar'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../CalendarReducer'

function Main(props) {

    const modalState = useSelector((state) => state.calendars.modalState)
    let isAuthenticated = useSelector((state) => state.auth.token !== null)
    let dispatch = useDispatch()
    return (
        <div className={style.wrapper}>
            {modalState && <AddForm/>}
            <button
                className={style.addButton}
                onClick={() => dispatch(openModal())}
            >
                <FaRegCalendarPlus />
            </button>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route path="/month" element={<MCalendar />} />
                <Route path="/week" element={<Wcalendar/>} />
                <Route path="/day" element={<Dcalendar/>} />
                <Route path="/login" element={<LoginPage />} />

            </Routes>
        </div>
    )
}

Main.propTypes = {}

export default Main