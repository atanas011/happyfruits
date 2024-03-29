import { HelmetProvider, Helmet } from 'react-helmet-async'

const MetaData = ({ title }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{`HappyFruits - ${title}`}</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default MetaData
