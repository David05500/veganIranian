import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../../lib/contentful';
import '../../assets/styles/main.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import _ from 'lodash';
import Header from '../../components/shared/Header';
import Hit from '../../components/Hit';
import Head from 'next/head';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox,  connectHits} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'KCP4G3STUF',
  '70231e407e7e59d0ed63b92e2f0a8be7'
);

const Hits = data => {
    let slug = '';
    let hitData = '';
    return _.map(data.hits, hit => {
        slug = hit.fields.slug["en-US"];
        hitData = _.find(data.blogPosts, { 'slug': slug});
        return(
            <div key={hitData.slug} className='lg:w-1/3 mb-8'>
                <Link prefetch='ture'  href='/recipes/[slug]' as={`/recipes/${hitData.slug}/`}>
                    <div className='card'>
                        <div className='m-auto mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px   pointer hover:opacity-60 transform ease-in duration-100 ' style={{backgroundSize: '50%', backgroundImage:`url(${hitData.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        </div>
                        <div >
                            <h2 className='text-xs text-center px-4'>{hitData.title}</h2>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })
};

const CustomHits = connectHits(Hits);

const  Blog = ( props ) => {
    const [blogPosts, setBlogPosts] = useState([]);
    
    useEffect(() => {
        setBlogPosts(_.orderBy(props, ['createdAt' ], ['desc']));
    }, []);

    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            {blogPosts != {} ? 
                (<div className='m-auto text-2xl bg-gray-primary'>
                    <Header />
                    <div className='max-width-735 px-4 lg:px-0 mx-auto lg:flex lg:flex-wrap mt-10'>
                        <InstantSearch
                            indexName="dev_Iranian"
                            searchClient={searchClient}
                        >
                            <div className='w-full mb-8 flex justify-center'>
                                <SearchBox submit={<img src="" alt=""/>}/>
                            </div>
                            <CustomHits blogPosts={blogPosts}/>
                        </InstantSearch>
                    </div>
                </div>
                )
            :
                (<div>Loading</div>)
            }
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

