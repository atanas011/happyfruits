import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../actions/user'
import Search from './Search'

const Header = () => {

    const dispatch = useDispatch()

    const { loading, user } = useSelector(state => state.auth)

    return (
        <header className='row'>
            <div className='col-12 col-md-3'>
                <Link to='/'>
                    <img id='logo' src='/favicon.ico' alt='logo' title='Home' />
                </Link>
            </div>

            <div className='col-12 col-md-6 mt-2 mt-md-0'>
                <Search />
            </div>

            <div className='col-12 col-md-3 mt-3 mt-md-0 text-center text-nowrap'>
                {user ?
                    <div className='dropdown d-inline me-1 me-md-3'>
                        <Link
                            to='/#'
                            className='btn dropdown-toggle text-white'
                            type='button'
                            id='dropdownMenuButton'
                            data-bs-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'>
                            <figure className='avatar avatar-header'>
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className='rounded-circle'
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>

                        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                            {user && user.role !== 'Admin' ?
                                <Link className='dropdown-item' to='/orders/user'>Orders</Link> :
                                <Link className='dropdown-item' to='/dashboard'>Dashboard</Link>
                            }
                            <Link className='dropdown-item' to='/profile'>Profile</Link>
                            <Link className='dropdown-item text-danger' to='/' onClick={() => dispatch(logout())}>Logout</Link>
                        </div>
                    </div> :
                    !loading && <Link to='/login' className='btn me-3 me-md-5' id='login-btn'>Login</Link>
                }
                <Link to='/cart' style={{ textDecoration: 'none' }} title='Cart'>
                    <i className='me-2 fa fa-shopping-cart text-white'></i>
                    <span id='cart-count'>0</span>
                </Link>
            </div>
        </header>
    )
}

export default Header
