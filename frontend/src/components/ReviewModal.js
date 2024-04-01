const ReviewModal = () => {
    return (
        <div className='row mt-2 mb-5'>
            <div className='w-50'>
                <div
                    className='modal fade'
                    id='ratingModal'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='ratingModalLabel'
                    aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header d-flex justify-content-between'>
                                <h5 className='modal-title' id='ratingModalLabel'>Submit Review</h5>
                                <button type='button' className='close' data-bs-dismiss='modal' aria-label='Close'>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>

                                <ul className='stars' >
                                    <li className='star'><i className='fa fa-star'></i></li>
                                    <li className='star'><i className='fa fa-star'></i></li>
                                    <li className='star'><i className='fa fa-star'></i></li>
                                    <li className='star'><i className='fa fa-star'></i></li>
                                    <li className='star'><i className='fa fa-star'></i></li>
                                </ul>

                                <textarea name='review' id='review' className='form-control mt-3'></textarea>

                                <button
                                    className='mt-4 float-end review-btn px-4'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewModal
