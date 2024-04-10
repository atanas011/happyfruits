import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { register, clearErrors } from '../actions/user'
import MetaData from '../components/MetaData'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/avatar.jpg')

    const { name, email, password } = user
    const { error, loading, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, navigate, isAuthenticated, error])

    const submitHandler = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)
        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            <MetaData title={'Register'} />

            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg pb-4' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mb-3'>Register</h1>

                        <div className='form-group'>
                            <label htmlFor='name_field'>Name</label>
                            <input
                                type='name'
                                id='name_field'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor='email_field'>Email</label>
                            <input
                                type='email'
                                id='email_field'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor='password_field'>Password</label>
                            <input
                                type='password'
                                id='password_field'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group my-3'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            alt='Avatar preview'
                                            className='rounded-circle'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file ms-4'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='form-control'
                                        id='avatar_upload'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            id='register_button'
                            type='submit'
                            className='btn btn-block py-2'
                            disabled={loading ? true : false}>
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
