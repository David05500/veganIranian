import React, {useEffect, useState, useRef} from 'react';
import Link from 'next/link';
import '../../assets/styles/main.css';
import Head from 'next/head';
import contentfulClient from '../../lib/contentful';


const getData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'nav',
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return data;
};


const Header = props => {
  const refy = useRef();

  const [logoBgImage, setLogoBgImage] = useState([]);
  const [isShrink, setIsShrink] = useState(false);
    
  useEffect(() => {
    getData().then(data => {
      setLogoBgImage(data[0].textBgImage.fields.file.url)
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const posY = refy.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    console.log(offset);
    offset > 200 ? isShrink ? '' : setIsShrink(true) : isShrink == false ? '' : setIsShrink(false);
  };

  return (
    <div className='sticky top-0 z-50'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
      </Head>
      <nav ref={refy} className={`max-width-1170 bg-gray-1000 border-btm  left-0 m-auto flex flex-col justify-center items-center z-150 py-4`}>

        <Link href="/">
          <h1 className={`italic relative z-10 text-3xl  text-black font-bold my-4 ${isShrink ? 'lg:m-0 mb-4 lg:text-6xl transform ease-in duration-200' : 'lg:my-8 lg:text-65xl transform ease-in duration-200 '} pointer main-logo  bg-gray-1000 bg-clip-text`}  style={{color: 'transparent', backgroundSize: '100%', backgroundImage: `url(${logoBgImage})`, textShadow: '4px 4px 0px rgba(0,0,0,0.1)'}}>THE IRANIAN VEGAN</h1>
        </Link>

        <div className='flex w-4/5 lg:w-1/3 m-auto justify-around'> 
          <Link href="/recipes/blog">
            <h1 className='pointer text-sm font-medium  hover:opacity-60 transform ease-in duration-100'>RECIPES</h1>
          </Link>

          <Link href="/about">
            <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h1>
          </Link>

          <a href="/contact">
            <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h1>
          </a>
        </div>
      </nav>
    </div>
  );
}


export default Header;




