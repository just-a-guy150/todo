import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './Auth.module.scss'
import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { setToken } from '../Auth/AuthReducer'
import { data, useNavigate } from 'react-router'

function LoginPage(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (data) {
            dispatch(setToken(data.Token))
            navigate('/')
        }
    }, [data])
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()
    return (
        <div className={style.wrapper}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id='email'
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email format'
                        }
                    })}
                />
                <span>{errors.email?.message}</span>
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Password must be at least 3 characters'
                        },
                        maxlength: {
                            value: 20,
                            message: 'Password must be at most 20 characters'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Password must contain only letters and numbers'
                        }
                    })}
                />
                <span>{errors.password?.message}</span>
                <br />
                <button className={style.btn}>Login</button>
            </form>
        </div>
    )
}

LoginPage.propTypes = {}

export default LoginPage
