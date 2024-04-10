import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { login, clearErrors } from '../actions/user'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { error, loading, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, navigate, error, isAuthenticated])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Login'} />

                    <div className='row wrapper'>
                        <div className='col-10 col-lg-5'>
                            <form className='shadow-lg' onSubmit={submitHandler}>
                                <h1 className='mb-3'>Login</h1>

                                <div className='form-group'>
                                    <label htmlFor='email_field'>Email</label>
                                    <input
                                        type='email'
                                        id='email_field'
                                        className='form-control'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mt-3'>
                                    <label htmlFor='password_field'>Password</label>
                                    <input
                                        type='password'
                                        id='password_field'
                                        className='form-control'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to='/password/forgot' className='float-end mt-2'>Forgot Password?</Link>

                                <button
                                    id='login_button'
                                    type='submit'
                                    className='btn btn-block py-2'>
                                    LOG IN
                                </button>

                                <Link to='/register' className='float-end mt-3'>New User?</Link>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Login
