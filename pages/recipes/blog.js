import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../../lib/contentful';
import '../../assets/styles/main.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import _ from 'lodash';
import Header from '../../components/shared/Header';

const  Blog = ( props ) => {
    const [blogPosts, setBlogPosts] = useState([]);
    
    useEffect(() => {
        setBlogPosts(props);
    }, []);

    return (
        <div className='m-auto text-2xl bg-gray-primary'>
            <Header />
            <div className='max-w-1170 mx-auto lg:flex lg:flex-wrap'>
                {_.map(blogPosts, item => {
                    return(
                        <div key={item.slug} className='lg:w-1/3 p-6'>
                            <Link  href='/recipes/[slug]' as={`/recipes/${item.slug}/`}>
                                <div className='card'>
                                    <div className='mb-4 pointer'>
                                        <img className='w-full pointer h-80p object-cover hover:scale-95 transform ease-in duration-500 pointer' src={item.smallBlogPostImage.fields.file.url} alt="my image" />
                                    </div>
                                    <div >
                                        <h2 className='text-base'>{item.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
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

