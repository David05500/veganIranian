import React from 'react';
import Link from 'next/link';
import '../../assets/styles/main.css';
import Head from 'next/head';

const Header = () => {
  return (
    <div className='sticky top-0 z-50'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
      </Head>
      <nav className="max-width-1170 bg-gray-1000 border-btm  left-0 m-auto flex flex-col justify-center items-center z-150 py-4">

        <div>
          <Link href="/">
            <h1 className='italic text-3xl lg:text-52xl text-black font-bold mb-8 pointer main-logo mt-8'>THE IRANIAN VEGAN</h1>
          </Link>
          <div style={{backgroundSize: '100%', backgroundImage: 'url("logoBG.jpg")'}} >
             
          </div>
        </div>

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




