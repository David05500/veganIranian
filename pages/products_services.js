import { useEffect, useState } from 'react';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';



const ProductsServices = () => {
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
                <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:my-20 '>
                    Home deliveries, 
                    Catering (coming soon!), 
                    Mealkits (coming soon!)

                </div>
            </div>
        </div>
    )
}

export default ProductsServices;
