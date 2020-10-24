import { useContext } from 'react';
import '../../assets/styles/main.css';
import Link from 'next/link';
import _ from 'lodash';
import Header from '../../components/shared/Header';
import Head from 'next/head';
import BlogDataContext from '../../components/BlogDataContext';


const  Index = ( props ) => {
    const { filteredBlogs } = useContext(BlogDataContext);
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            {filteredBlogs != null ? 
                (<div className='m-auto text-2xl bg-gray-primary'>
                    <Header />
                    <div className='max-width-735 px-4 lg:px-0 mx-auto lg:flex lg:flex-wrap mt-10'>
                        {!_.isEmpty(filteredBlogs) ?
                            _.map(filteredBlogs, blog => {
                                if(blog != undefined ) {
                                    console.log(blog);
                                    return(
                                        <div key={blog.slug} className='lg:w-1/3 mb-8'>
                                            <Link   href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
                                                <div className='card'>
                                                    <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 ' 
                                                        style={{backgroundSize: '50%', backgroundImage:`url(${blog.image1.fields.thumb.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                                    </div>
                                                    <div >
                                                        <h2 className='text-xs text-center px-4'>{blog.title}</h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                            })
                            : 
                            ''
                        }
                    </div>
                </div>
                )
            :
                (<div>Loading</div>)
            }
        </div>
    )
};

export default Index;
