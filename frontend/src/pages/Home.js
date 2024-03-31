import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import ProductCard from '../components/ProductCard'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'

const Home = () => {

    const { loading, products, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            toast.error(error)
            return
        }
    }, [error])

    return (
        <>
            <MetaData title={'Buy Fruit Plants Online at Lowest Price'} />
            <h1 className='mb-0'>Happy Fruits</h1>

            {loading ? <Loader /> :
                <div className='row'>
                    {products && products.map(product =>
                        <ProductCard key={product._id} product={product} />
                    )}
                </div>
            }
        </>
    )
}

export default Home
