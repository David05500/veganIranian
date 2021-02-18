import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import {createClient} from 'contentful';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Link from 'next/link';
import { GrInstagram } from "react-icons/gr";
import BlogDataContext from '../components/BlogDataContext';
import useProgressiveImageHook from '../components/shared/useProgressiveImageHook';

const GetHomePageData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'homePage',
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return data;
};

const addJSONLD = () => {
  return {
      __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/#webpage",
        "url": "https://theiranianvegan.com/",
        "keywords": 'iranian, vegan, iranian recipes',
        "name": "Homepage - The Iranian Vegan",
        "datePublished": "2020-06-26T12:00:44+00:00",
        "inLanguage": "en-GB",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://theiranianvegan.com/#webpage",
          "url": "https://theiranianvegan.com/",
          "name": "The Iranian Vegan",
          "description": "Discover authentic iranian vegan recipes!",
          "inLanguage": "en-GB" 
        },
        "description": "I believe in compassion. I think we have a duty to create a world that is more ethical and just than the one in which we were raised. For me, this duty extends to all forms of life.",
        "publisher": {
            "@type": "Person",
            "name": "Mana Rose Shamshiri-Fard"
        }
      }]`
  }
};

const  HomePage = () => {
  const [homePagePic, setHomePagePic] = useState('')
  const [mobileHomePagePic, setMobileHomePagePic] = useState('')
  const [windowWidth, setWindowWidth] = useState(0);
  const [isBGImageLoaded, setIsBGImageLoaded] = useState(false);
    
  useEffect(() => {
    GetHomePageData().then(phrases => {
      setHomePagePic(phrases[0].homePageImage.fields.file.url);
      setMobileHomePagePic(phrases[0].mobileHomePageImage.fields.file.url);
    });
    setWindowWidth(window.innerWidth);
  }, []);

  const { isEnglish, setIsEnglish } = useContext(BlogDataContext);
  const heroUrl = windowWidth > 430 ? homePagePic : mobileHomePagePic;
  const loaded = useProgressiveImageHook(heroUrl);

  if (loaded == null){
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    )
  }
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

        {/* <useProgressiveImage src={windowWidth > 430 ? `url(${homePagePic})` : `url(${mobileHomePagePic})`} placeholder='path/to/placeholder.jpg' /> */}

        <div className='h-screen w-screen  bg-no-repeat bg-103p bg-center flex justify-center items-center'  style={{backgroundSize: 'cover', backgroundImage: `url(${loaded})`}} >
          <div style={{background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))', width: '100vw', height: '100vh'}} >
            <div className='flex flex-col justify-between pt-12 pb-28 lg:justify-center items-center h-screen '>
              <h1 className='italic text-3xl lg:text-7xl text-white font-bold z-50 main-logo lg:text-spaceping-4 mt-28' style={{textShadow: '6px 6px 0px rgba(0,0,0,0.1)'}} >THE    IRANIAN    VEGAN</h1>

              <div className='flex flex-col justify-center items-center w-full'>
                <div className='flex flex-col lg:flex-row items-center text-white w-5/7 min-h-24 max-w-26 tracking-wide z-50 justify-around'>
                  <Link href="/recipes">
                    {isEnglish 
                      ? <h1 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>RECIPES</h1>
                      : <h1 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>طرز تهیه غذاها</h1>
                    }
                  </Link>

                  <Link href="/about">
                    {isEnglish 
                      ? <h1 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h1>
                      : <h1 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>درباره من</h1>
                    }
                  </Link>

                  <a href="/contact">
                    {isEnglish 
                      ? <h1 className='checking pointer text-small font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h1>
                      : <h1 className='checking pointer text-xl font-medium hover:opacity-60 transform ease-in duration-100'>تماس با من</h1>
                    }
                  </a>
                </div>

                <a href='https://www.instagram.com/theiranianvegan/' className='text-white mt-10 z-50  hover:opacity-60 transform ease-in duration-100'> 
                  <GrInstagram  size={30}/>
                </a>
              </div>
              
              <div style={{top: '50px', right: '50px', backdropFilter: 'saturate(150%) blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.8)'}} className="absolute text-sm text-gray-500 leading-none rounded-full inline-flex">
                <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? 'text-blue-400' : 'text-white'} rounded-l-full px-4 py-2`} onClick={() => setIsEnglish(true)}>
                    <span>English</span>
                </button>
                <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? 'text-white' : 'text-blue-400'} rounded-r-full px-4 py-2`} onClick={() => setIsEnglish(false)}>
                    <span>فارسی</span>
                </button>
              </div>


            </div>
          </div>
          
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJSONLD()}
        /> 
    </div>
    
  )
}
export default HomePage;

