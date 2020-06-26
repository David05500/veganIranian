import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../../lib/contentful';
import '../../assets/styles/main.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        GetHomePageData().then(data => {
            setPost(documentToReactComponents(data[0].paragraph1));
            setBlogPosts(data);
        });
    }, []);

    return (
        <div className='m-auto text-2xl bg-gray-primary'>
            <div className='max-w-1170 mx-auto lg:flex lg:flex-wrap'>
                {blogPosts.map(item => {
                    return(
                        <div key={item.name} className='lg:w-1/3 p-12'>
                            <div className='card'>
                                <div className='mb-4 pointer'>
                                    <img className='w-full pointer h-80p object-cover hover:scale-95 transform ease-in duration-500 pointer' src={item.smallBlogPostImage.fields.file.url} alt="my image" />
                                </div>
                                <div >
                                    <h2 className='text-base'>{item.title}</h2>
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

