import React from 'react'
import PropTypes from 'prop-types'
import style from './Header.module.scss'
import { BsCalendar3, BsCalendar3Week, BsCalendar3Event } from 'react-icons/bs'
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaRegRegistered } from "react-icons/fa";
import { NavLink } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { removeToken } from '../Auth/authReducer'

function Header(props) {
    let isAuthenticated = useSelector((state) => state.auth.token !== null)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let logout = () => {
        dispatch(removeToken())
        navigate('/login')
    }
    return (
        <header className={style.wrapper}>
            <NavLink to="/" className={style.logoBar}>
                <BsCalendar3 className={style.icon} />
                <div className="title">RoboCalendar</div>
            </NavLink>
            <nav className={style.navBar}>
                {isAuthenticated && <>
                    <NavLink to="/" className={({ isActive }) => (isActive ? style.active : style.link)}>
                        <BsCalendar3 />
                        <span>Month</span>
                    </NavLink>
                    <NavLink to="/week" className={({ isActive }) => (isActive ? style.active : style.link)}>
                        <BsCalendar3Week />
                        <span>Week</span>
                    </NavLink>
                    <NavLink to="/day" className={({ isActive }) => (isActive ? style.active : style.link)}>
                        <BsCalendar3Event />
                        <span>Day</span>
                    </NavLink>
                    <NavLink className={style.link} onClick={logout}>
                        <IoIosLogOut />
                        <span>Logout</span>
                    </NavLink>
                </>}

                {!isAuthenticated &&
                    <>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? style.active : style.link)}>
                            <IoIosLogIn />
                            <span>Login</span>
                        </NavLink>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? style.active : style.link)}>
                            <FaRegRegistered />
                            <span>Register</span>
                        </NavLink>
                    </>

                }

            </nav>
        </header>
    )
}

Header.propTypes = {}

export default Header
