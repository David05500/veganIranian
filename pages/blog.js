import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';

const GetHomePageData = async () => {
    const res = await contentfulClient.getEntries({
      content_type: 'blogPost',
      limit: 100,
    });
    const data = res.items.map(item => item.fields);
    return data;
};
const  Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    
    useEffect(() => {
        GetHomePageData().then(data => {
            setBlogPosts(data);
        });
    }, []);

    return (
        <div className='m-auto text-2xl bg-gray-primary'>
            <div className='max-w-screen-lg mx-auto lg:flex lg:flex-wrap'>
                {blogPosts.map(item => {
                    return(
                        <div className='lg:w-1/2 p-16'>
                            <div className='card'>
                                <div className='mb-4 pointer'>
                                    <img className='w-full pointer h-80p object-cover hover:scale-90 transform ease-in duration-700 pointer' src={item.blogPostImage.fields.file.url} alt="my image" />
                                </div>
                                <div >
                                    <h2>{item.name}</h2>
                                    <h2>{item.date}</h2>
                                </div>
                            </div>
                        </div>
                    )
                        
                })}
            </div>
        </div>
    )
}

export default Blog;