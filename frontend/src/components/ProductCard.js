import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const details = `product/${product._id}`

    return (
        <div className='col-sm-12 col-md-6 col-lg-3 mt-4'>
            <div className='card'>
                <Link to={details}>
                    <img className='card-img-top' src={product.images[0].url} alt={product.name} />
                </Link>
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                        <Link to={details}>{product.name}</Link>
                    </h5>
                    <div id='ratings'>
                        <div className='rating-outer me-2'>
                            <div className='rating-inner' style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span className='no-of-reviews text-nowrap'>({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className='card-text'>{product.price}€</p>
                    <Link to={details} className='btn btn-block' id='view-btn'>View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
