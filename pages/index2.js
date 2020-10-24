import { useEffect, useState } from 'react';
import Head from 'next/head';
import {createClient} from 'contentful';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Link from 'next/link';
import { GrInstagram } from "react-icons/gr";
import ImageContainer from '../components/shared/ImageContainer';

const GetHomePageData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'homePage',
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return data;
};

const  HomePage = () => {
  const [homePagePic, setHomePagePic] = useState('')
  const [mobileHomePagePic, setMobileHomePagePic] = useState('')
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setIsLoading(true);
    GetHomePageData().then(phrases => {
      setHomePagePic(phrases[0].homePageImage.fields.file);
      setMobileHomePagePic(phrases[0].mobileHomePageImage.fields.file);
      setWindowWidth(window.innerWidth)
      setIsLoading(false);
    });
  }, []);


  if(isLoading){
    return (
      <div>
        Loading ....
      </div>
    )
  }else{
    console.log(homePagePic)
    return (
      <div>
          <Head>
            <title>Home</title>
            <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          </Head>
          <div className='h-screen w-screen  bg-no-repeat bg-103p bg-center flex justify-center items-center' style={{backgroundSize: 'cover', backgroundImage: windowWidth > 430 ? `url(${homePagePic.url})` : `url(${mobileHomePagePic.url})`}} >
            <div style={{maxWidth: '600px'}}>
              <ImageContainer  width={1646} height={973} src={windowWidth > 430 ? `url(${homePagePic})` : `url(${mobileHomePagePic})`} thumb='{res.urls.thumb}' alt='{res.alt_description}'/>
            </div>
  
            <div style={{background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))', pointerEvents: 'none',  width: '100vw', height: '100vh', position: 'absolute'}} />
            <div className='flex flex-col justify-between pt-12 pb-28 lg:justify-center items-center h-screen '>
              <h1 className='italic text-3xl lg:text-7xl text-white font-bold z-50 main-logo lg:text-spaceping-4 mt-28' style={{textShadow: '6px 6px 0px rgba(0,0,0,0.1)'}} >THE IRANIAN VEGAN</h1>
  
              <div className='flex flex-col justify-center items-center w-full'>
  
                <div className='flex flex-col lg:flex-row items-center text-white w-5/7 min-h-24 max-w-26 tracking-wide z-50 justify-around'>
                  <Link href="/recipes">
                    <h1 className='checking pointer text-base font-medium hover:opacity-60 transform ease-in duration-100'>RECIPES</h1>
                  </Link>
  
                  <Link href="/about">
                    <h1 className='pointer text-base font-medium hover:opacity-60 transform ease-in duration-100' >ABOUT</h1>
                  </Link>
  
                  <Link href="/contact">
                    <h1 className='pointer text-base font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h1>
                  </Link>
  
                </div>
  
                <Link href="/services">
                  <h1 className='pointer text-base font-medium hover:opacity-60 text-white transform ease-in duration-100'>PRODUCTS & SERVICES</h1>
                </Link>
  
                <a href='https://www.instagram.com/theiranianvegan/' className='text-white mt-10 z-50  hover:opacity-60 transform ease-in duration-100'> 
                  <GrInstagram  size={30}/>
                </a>
              </div>
              
            </div>
          </div>
      </div>
    )
  }
}
export default HomePage;

