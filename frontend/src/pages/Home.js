import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ProductCard from '../components/ProductCard'
import { getProducts } from '../actions/product'
import MetaData from '../components/MetaData'

const Home = () => {

    const dispatch = useDispatch()

    const { loading, products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className='container-fluid min-vh-100 py-4'>
            <MetaData title={'Buy Fruit Plants Online at Lowest Price'} />
            <h1 className='mb-0'>Happy Fruits</h1>

            {loading ? <h1 className='pt-3'>Loading...</h1> :
                <div className='row'>
                    {products && products.map(product =>
                        <ProductCard key={product._id} product={product} />
                    )}
                </div>
            }
        </div>
    )
}

export default Home
