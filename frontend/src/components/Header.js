const Header = () => {
    return (
        <header className='row'>
            <div className='col-12 col-md-3'>
                <img id='logo' src='/favicon.ico' alt='logo' />
            </div>

            <div className='col-12 col-md-6 mt-2 mt-md-0'>
                <div className='input-group'>
                    <input
                        type='text'
                        id='search-field'
                        className='form-control'
                        placeholder='Search'
                    />
                    <button className='btn' id='search-btn' title='Search'>
                        <i className='fa fa-search'></i>
                    </button>
                </div>
            </div>

            <div className='col-12 col-md-3 mt-3 mt-md-0 text-center text-nowrap'>
                <button className='btn' id='login-btn'>Log in</button>
                <i className='ms-5 me-2 fa fa-shopping-cart text-white'></i>
                <span id='cart-count'>0</span>
            </div>
        </header>
    )
}

export default Header
