import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Search = () => {

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

    const searchHandler = e => {
        e.preventDefault()
        navigate(keyword.trim() ? `/search/${keyword}` : '/')
    }

    return (
        <form onSubmit={searchHandler}>
            <div className='input-group'>
                <input
                    type='text'
                    id='search-field'
                    className='form-control'
                    placeholder='Search'
                    onChange={e => setKeyword(e.target.value)}
                />
                <button className='btn' id='search-btn' title='Search'>
                    <i className='fa fa-search'></i>
                </button>
            </div>
        </form>
    )
}

export default Search
