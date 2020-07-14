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
          <Link href="/">
            <h1 className='italic text-xl lg:text-6xl text-black font-bold mb-8 pointer main-logo mt-8'>THE IRANIAN VEGAN</h1>
          </Link>

        <div className='flex w-4/5 lg:w-1/3 m-auto justify-around'> 
          <Link href="/recipes/blog">
            <h1 className='checking pointer text-baseLg font-medium  hover:opacity-60 transform ease-in duration-300'>RECIPES</h1>
          </Link>

          <Link href="/about">
            <h1 className='pointer text-baseLg font-medium hover:opacity-60 transform ease-in duration-300'>ABOUT</h1>
          </Link>

          <Link href="/contact">
            <h1 className='pointer text-baseLg font-medium hover:opacity-60 transform ease-in duration-300'>CONTACT</h1>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;




