import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../../lib/contentful';
import '../../assets/styles/main.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import _ from 'lodash';
import Header from '../../components/shared/Header';
import Head from 'next/head';

const  Blog = ( props ) => {
    const [blogPosts, setBlogPosts] = useState([]);
    
    useEffect(() => {
        setBlogPosts(props);
    }, []);

    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
            </Head>
            <div className='m-auto text-2xl bg-gray-primary'>
                <Header />
                <div className='max-w-1000 mx-auto lg:flex lg:flex-wrap mt-5'>
                    {_.map(blogPosts, item => {
                        return(
                            <div key={item.slug} className='lg:w-1/3 p-6'>
                                <Link  href='/recipes/[slug]' as={`/recipes/${item.slug}/`}>
                                    <div className='card'>
                                        <div className='mb-4 pointer set-blog-index-images pointer hover:opacity-60 transform ease-in duration-300 ' style={{backgroundSize: '100%', backgroundImage:`url(${item.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                        </div>
                                        <div >
                                            <h2 className='text-base text-center'>{item.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

Blog.getInitialProps = async (ctx) => {
    const res = await contentfulClient.getEntries({
        content_type: 'blogPost',
        limit: 100,
    });
    const data = res.items.map(item => item.fields);
    return data;
};
export default Blog;

