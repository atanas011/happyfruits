import MetaData from '../components/MetaData'
import Card from '../components/Card'

const Home = () => {
    return (
        <>
            {/* add custom title */}
            <MetaData title={'Buy Fruit Plants Online at Lowest Price'} />

            <div className='container-fluid min-vh-100 py-4'>
                <h1 className='mb-0'>Happy Fruits</h1>
                <div className='row'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i =>
                        <Card key={i} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Home