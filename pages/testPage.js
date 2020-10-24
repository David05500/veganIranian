import { useEffect, useState } from 'react';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';


const addJSONLD = (recipe) => {
    
    return {
        __html: `[{
            '@context': 'http://schema.org',
            '@type': 'Recipe',
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.theiranianvegan.com//recepies/${recipe.slug}"
            },
            "title": ${recipe.title},
            "image": [
                "https://example.com/photos/1x1/photo.jpg",
                "https://example.com/photos/4x3/photo.jpg",
                "https://example.com/photos/16x9/photo.jpg"
            ],
            "author": {
                "@type": "Person",
                "name": "Mana Rose Shamshiri-Fard"
            },
            "datePosted": ${recipe.createdAt},
            "description": "desc",
            "image": "job.company.logo",
            "prepTime": ${recipe.prepTime},
            "cookTime": ${recipe.cookTime},
            "totalTime": ${recipe.totalTime},
            "keywords": "cake for a party, coffee",
            "recipeYield": "10",
            "recipeCategory": ${recipe.course},
            "recipeCuisine": "Iranian",
            "recipeIngredient": [
                "2 cups of flour",
                "3/4 cup white sugar",
                "2 teaspoons baking powder",
                "1/2 teaspoon salt",
                "1/2 cup butter",
                "2 eggs",
                "3/4 cup milk"
            ],
            "recipeInstructions": [
                {
                  "@type": "HowToStep",
                  "name": "Preheat",
                  "text": "Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.",
                  "url": "https://example.com/party-coffee-cake#step1",
                  "image": "https://example.com/photos/party-coffee-cake/step1.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Mix dry ingredients",
                  "text": "In a large bowl, combine flour, sugar, baking powder, and salt.",
                  "url": "https://example.com/party-coffee-cake#step2",
                  "image": "https://example.com/photos/party-coffee-cake/step2.jpg"
                },
              ],  
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "108"
            },
        }]`,
    }
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={addJSONLD(props.data[0])}
            />  
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
