import { useEffect, useState } from 'react';
import Head from 'next/head';
import {createClient} from 'contentful';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
import Link from 'next/link';
import { GrInstagram } from "react-icons/gr";
import ImageContainer from '../components/shared/ImageContainer';

const HomePage = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center text-3xl' >
            I will be back shortly  =)
        </div>
    )
}
export default HomePage;
