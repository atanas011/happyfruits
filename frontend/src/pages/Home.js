import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import ProductCard from '../components/ProductCard'
import { getProducts } from '../actions/product'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'
import Filters from '../components/Filters'

const Home = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 20])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const { keyword } = useParams()
    const { loading, error, products, count, tempCount, resPerPage } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            toast.error(error)
            return
        }
        dispatch(getProducts(currentPage, keyword, price, category, rating))
    }, [dispatch, error, currentPage, keyword, price, category, rating])

    // removes empty pages for filtered products
    let productCount = keyword ? tempCount : count

    return (
        <>
            <MetaData title={'Buy Fruit Plants Online at Lowest Price'} />
            <h1 className='mb-0'>Happy Fruits</h1>

            {loading ? <Loader /> :
                <>
                    <div className='row'>
                        {keyword ?
                            <>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                    <Filters
                                        price={price}
                                        setPrice={setPrice}
                                        setCategory={setCategory}
                                        setRating={setRating}
                                    />
                                </div>
                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        {products.map(product =>
                                            <ProductCard key={product._id} product={product} col={4} />
                                        )}
                                    </div>
                                </div>
                            </> :
                            products.map(product =>
                                <ProductCard key={product._id} product={product} col={3} />
                            )
                        }
                    </div>
                    {resPerPage < productCount &&
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productCount}
                                onChange={pageNum => setCurrentPage(pageNum)}
                                firstPageText={'«'}
                                prevPageText={'⟨'}
                                nextPageText={'⟩'}
                                lastPageText={'»'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Home
