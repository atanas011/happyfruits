import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Filters = ({ price, setPrice, setCategory, setRating, setCurrentPage }) => {

    const categories = [
        'Apple',
        'Apricot',
        'Pear',
        'Plum',
        'Walnut'
    ]

    return (
        <div className='px-5'>
            {/* =========================== FILTER BY PRICE RANGE */}
            <Range
                marks={{ 1: '1€', 20: '20€' }}
                min={1}
                max={20}
                defaultValue={[1, 20]}
                tipFormatter={value => `${value}€`}
                tipProps={{ placement: 'top', visible: true }}
                value={price}
                onChange={price => setPrice(price)}
            />
            {/* ============================== FILTER BY CATEGORY */}
            <hr className='my-5' />
            <div className='mt-5' >
                <h4 className='mb-3'>Categories</h4>
                <ul className='pl-0'>
                    {categories.map(category =>
                        <li
                            key={category}
                            style={{ cursor: 'pointer', listStyle: 'none' }}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    )}
                </ul>
            </div>
            {/* =============================== FILTER BY RATINGS */}
            <hr className='my-3' />
            <div className='mt-5' >
                <h4 className='mb-3'>Ratings</h4>
                <ul className='pl-0'>
                    {[5, 4, 3, 2, 1].map(star =>
                        <li
                            key={star}
                            style={{ cursor: 'pointer', listStyle: 'none' }}
                            onClick={() => setRating(star)}
                        >
                            <div className='rating-outer'>
                                <div
                                    className='rating-inner'
                                    style={{ width: `${star * 20}%` }}>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Filters
