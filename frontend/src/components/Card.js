const Card = () => {
    return (
        <div className='col-sm-12 col-md-6 col-lg-3 mt-4'>
            <div className='card'>
                <img
                    src='https://res.cloudinary.com/dpv5tcps3/image/upload/v1683131890/happyfruits/products/abate_fetel_fpqgzq.jpg'
                    className='card-img-top'
                    alt='abate_fetel'
                />
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                        <a href='/#'>Abate Fetel</a>
                    </h5>
                    <div id='ratings'>
                        <div className='rating-outer me-2'>
                            <div className='rating-inner'></div>
                        </div>
                        <span className='no-of-reviews text-nowrap'>(0 Reviews)</span>
                    </div>
                    <p className='card-text'>5.00€</p>
                    <a className='btn btn-block' id='view-btn' href='/#'>View Details</a>
                </div>
            </div>
        </div>
    )
}

export default Card
