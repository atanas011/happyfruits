import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { getProductDetails, clearErrors } from '../actions/product'
import ReviewModal from '../components/ReviewModal'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'

// import store from '../store'

const ProductDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { loading, product, error } = useSelector(state => state.productDetails)

    useEffect(() => {
        // console.log(store.getState())
        if (error) {
            toast.error(error)
            return () => dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
        window.scrollTo(0, 0)
    }, [error, dispatch, id])

    return (
        <>
            {loading ? <Loader /> :
                product.name &&
                <>
                    <MetaData title={product.name} />

                    <div className='row f-flex justify-content-around'>
                        <div className='col-12 col-sm-5 mt-5'>
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image =>
                                    <Carousel.Item key={image.public_id}>
                                        <img className='d-block w-100' src={image.url} alt={product.name} />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>

                        <div className='col-12 col-sm-5 mt-5'>
                            <h3>{product.name}</h3>
                            <p className='text-secondary'>Product # {product._id}</p>
                            <hr />

                            <div className='rating-outer me-2'>
                                <div className='rating-inner' style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span className='no-of-reviews'>({product.numOfReviews} Reviews)</span>
                            <hr />

                            <p id='product-price'>{product.price}€</p>
                            <div className='input-group d-inline text-nowrap'>
                                <span className='btn btn-danger minus'>-</span>
                                <input type='number' className='form-control count d-inline' value='1' readOnly />
                                <span className='btn btn-primary plus me-3'>+</span>
                            </div>
                            <button className='mt-2 mt-md-0' type='button' id='cart-btn'>Add to Cart</button>
                            <hr />

                            <p className={`stock-status ${product.stock > 0 ? 'greenColor' : 'redColor'}`}>
                                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                            </p>
                            <hr />

                            <h4 className='mt-2'>Description:</h4>
                            <p>{product.description}</p>
                            <hr />

                            {/* <p className='mb-3'>Sold by: <strong>{product.seller}</strong></p> */}
                            <button
                                type='button'
                                className='review-btn mt-2'
                                data-bs-toggle='modal'
                                data-bs-target='#ratingModal'>
                                Submit Your Review
                            </button>

                            <ReviewModal />

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ProductDetails
