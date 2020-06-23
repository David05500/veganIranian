import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-white bg-opacity-75 fixed bottom-0 left-0 w-full flex justify-center z-150">
      <ul className="flex w-full lg:w-60% justify-around">
        <li>
          <Link href="/">
            <a className="block p-4 text-black hover:text-blue-200 text-base lg:text-2xl font-semibold" style={{
              color: 'rgba(0,0,0,0.6)',
              textShadow: '2px 8px 6px rgba(0,0,0,0.2) 0px -5px 35px rgba(255,255,255,0.3);'
            }}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="block p-4 text-black hover:text-blue-200 text-base lg:text-2xl font-semibold" style={{
              color: 'rgba(0,0,0,0.6)',
              textShadow: '2px 8px 6px rgba(0,0,0,0.2) 0px -5px 35px rgba(255,255,255,0.3);'
            }}>About Me</a>
          </Link>
        </li>

        <li>
          <Link href="/blog">
            <a className="block p-4 text-black hover:text-blue-200 text-base lg:text-2xl font-semibold" style={{
              color: 'rgba(0,0,0,0.6)',
              textShadow: '2px 8px 6px rgba(0,0,0,0.2) 0px -5px 35px rgba(255,255,255,0.3);'
            }}>Blog</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;




