import React from 'react'
import PropTypes from 'prop-types'
import style from './Auth.module.scss'
import { useForm } from 'react-hook-form'

function RegisterPage(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()
    return (
        <div className={style.wrapper}>
            <h1>Register</h1>
            <form>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id='login'
                    {...register('login', {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Login must be at least 3 characters'
                        },
                        maxlength: {
                            value: 20,
                            message: 'Login must be at most 20 characters'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Login must contain only letters and numbers'
                        }
                    })}
                />
                <span></span>
                <br />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id='email'
                    {...register('login', {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Login must be at least 3 characters'
                        },
                        maxlength: {
                            value: 20,
                            message: 'Login must be at most 20 characters'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Login must contain only letters and numbers'
                        }
                    })}
                />
                <span></span>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' />
                <span></span>
                <br />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id='confirmPassword' />
                <span></span>
                <br />
                <button className={style.btn}>Register</button>
            </form>
        </div>
    )
}

RegisterPage.propTypes = {}

export default RegisterPage
