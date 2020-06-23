import { useEffect, useState } from 'react';
import {createClient} from 'contentful';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';

const GetHomePageData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'manasHomePage',
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return data;
};

const  HomePage = () => {
  const [homePagePic, setHomePagePic] = useState('')
  const [mobileHomePagePic, setMobileHomePagePic] = useState('')
  const [windowWidth, setWindowWidth] = useState(0);
    
  useEffect(() => {
    GetHomePageData().then(phrases => {
        setHomePagePic(phrases[0].homePageImage.fields.file.url);
        setMobileHomePagePic(phrases[0].mobileHomePageImage.fields.file.url);
    });
    setWindowWidth(window.innerWidth)
  }, []);

//   async function fetchEntries() {
//     const entries = await client.getEntries()
//     if (entries.items) return entries.items
//     console.log(`Error getting Entries for ${contentType.name}.`)
//   }
  return (
    <div className='h-screen w-screen  bg-no-repeat bg-103p bg-center flex justify-center items-center' style={{backgroundSize: '103%', backgroundImage: windowWidth > 430 ? `url(${homePagePic})` : `url(${mobileHomePagePic})`}} >
      {/* <img className='w-full h-80p object-cover' src={homePagePic} alt="my image" /> */}

      <h1 className='m-auto text-3xl text-white'>Heeyeyeyey Guuuuys</h1>
    </div>
  )
}

export default HomePage;