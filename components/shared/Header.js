import React from 'react';
import Link from 'next/link';
import '../../assets/styles/main.css';

const Header = () => {
  return (
    <nav className="max-w-1170 bg-gray-1000 border-btm  sticky top-0 left-0 m-auto flex flex-col justify-center items-center z-150 py-4">
        <Link href="/">
          <h1 className='italic text-xl lg:text-3xl text-black font-bold z-50 mb-8 pointer'>THE IRANIAN VEGAN</h1>
        </Link>


      <div className='flex w-4/5 lg:w-1/4 m-auto justify-around'> 
        <Link href="/recipes/blog">
          <h1 className='checking pointer text-sm'>RECIPES</h1>
        </Link>

        <Link href="/about">
          <h1 className='pointer text-sm'>ABOUT</h1>
        </Link>

        <Link href="/contact">
          <h1 className='pointer text-sm'>CONTACT</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Header;




