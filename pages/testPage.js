import { useEffect, useState } from 'react';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';

const GetRecipe = async (slug) => {
    await getContentfulContent('blogPost', slug);
    return {blogPost: props.blogPost};
};

const TestPage = (props) => {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div className='m-auto text-2xl bg-gray-primary'>
                <Header />
            </div>
        </>
    )
}
TestPage.getInitialProps = async () => {
    const res = await contentfulClient.getEntries({
      content_type: 'recipe',
    });
    const data = res.items.map(item => item.fields);
    return { data }
}

export default TestPage;
