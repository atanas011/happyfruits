const ProductCard = ({ product }) => {
    return (
        <div className='col-sm-12 col-md-6 col-lg-3 mt-4'>
            <div className='card'>
                <img className='card-img-top' src={product.images[0].url} alt={product.name} />
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                        <a href='/#'>{product.name}</a>
                    </h5>
                    <div id='ratings'>
                        <div className='rating-outer me-2'>
                            <div className='rating-inner' style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span className='no-of-reviews text-nowrap'>({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className='card-text'>{product.price}€</p>
                    <a className='btn btn-block' id='view-btn' href='/#'>View Details</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
