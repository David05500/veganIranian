import '../assets/styles/main.css';
import Header from '../components/shared/Header';
import Head from 'next/head';
import images from '../images.json';
import ImageContainer from '../components/shared/ImageContainer';
import _ from 'lodash';

const Services = () => {
    const onIsVisible = index => {
        if (index === images.length - 1) {
            console.log('index', index);
            console.log('images.length - 1', images.length - 1);
            // setPage(page => page + 1);
        }
    };
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div className='m-auto text-2xl bg-gray-primary'>
                <Header />
                <div>Services</div>
                <div style={{width: '100%', maxWidth: '600px'}}>
                    {images.map((res, index) => {
                        return (
                            <div key={res.id} style={{padding: '1em 0'}}>
                            <ImageContainer
                                src={res.urls.regular}
                                thumb={res.urls.thumb}
                                height={res.height}
                                width={res.width}
                                alt={res.alt_description}
                                onIsVisible={() => onIsVisible(index)}
                            />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Services;
