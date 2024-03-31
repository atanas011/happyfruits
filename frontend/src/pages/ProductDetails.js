import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ProductDetails = () => {

    const pathname = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div>
            Product Details
        </div>
    )
}

export default ProductDetails
