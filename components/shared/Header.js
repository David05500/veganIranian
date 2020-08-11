import React, {useEffect, useState, useRef, useContext} from 'react';
import Link from 'next/link';
import '../../assets/styles/main.css';
import Head from 'next/head';
import contentfulClient from '../../lib/contentful';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch,   connectHits, connectSearchBox } from 'react-instantsearch-dom';
import BlogDataContext from '../BlogDataContext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import {useRouter} from 'next/router';
import _ from 'lodash';


const getData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'nav',
    limit: 100,
  });
  const data = res.items.map(item => item.fields);
  return data;
};

const searchClient = algoliasearch(
  'KCP4G3STUF',
  '70231e407e7e59d0ed63b92e2f0a8be7'
);
const Hits = data => {
  const { updateBlogs } = useContext(BlogDataContext);
  updateBlogs(data.hits);
  return('');
};
const CustomHits = connectHits(Hits);


const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={event =>  refine(event.currentTarget.value)}
      className=' text-sm font-medium px-2 py-1'
      placeholder='Search here...'
    />
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

//Markdown
const Text = ({ children }) => {
  return <p className="text-sm text-justify">{children}</p>
};
const options = {
  renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.UL_LIST]: (node, children) => <UlList>{children}</UlList>,
    [BLOCKS.OL_LIST]: (node, children) => <OlList>{children}</OlList>,
    [BLOCKS.HEADING_1]: (node, children) => <HEADING1>{children}</HEADING1>,
    [BLOCKS.HEADING_3]: (node, children) => <HEADING3>{children}</HEADING3>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return <img src={node.data.target.fields.file.url} className='my-10'/>
    },
    [INLINES.HYPERLINK]: (node, children) => <MyLink>{children}</MyLink>,
  },
};



const Header = props => {
  const refy = useRef();
  const [logoBgImage, setLogoBgImage] = useState([]);
  const [isShrink, setIsShrink] = useState(false);

  const router = useRouter();
  const slug = router.pathname;
  
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

  const truncate = (str, value) => {
    return str.length > 10 ? str.substring(0, `${value}`) + "..." : str;
  };
  const handleScroll = () => {
    const posY = refy.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    offset > 200 ? isShrink ? '' : setIsShrink(true) : isShrink == false ? '' : setIsShrink(false);
  };
  const { filteredBlogs, blogs, isSearching } = useContext(BlogDataContext);

  return (
    <div className='sticky top-0 z-50'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
      </Head>
      <nav ref={refy} className={`max-width-1170 bg-gray-1000 border-btm  left-0 m-auto flex flex-col justify-center items-center z-150 py-4 relative`}>

        <Link href="/">
          <h1 className={`italic relative z-10 text-3xl  text-black font-bold my-4 ${isShrink ? 'lg:m-0 mb-4 lg:text-6xl transform ease-in duration-200' : 'lg:my-8 lg:text-65xl transform ease-in duration-200 '} pointer main-logo  bg-gray-1000 bg-clip-text`}  style={{color: 'transparent', backgroundSize: '100%', backgroundImage: `url(${logoBgImage})`, textShadow: '4px 4px 0px rgba(0,0,0,0.1)'}}>THE IRANIAN VEGAN</h1>
        </Link>

        <div className='flex w-4/5 lg:w-1/3 m-auto justify-around '> 
          <Link href="/recipes/blog">
            <h1 className='pointer text-sm font-medium  hover:opacity-60 transform ease-in duration-100'>RECIPES</h1>
          </Link>

          <Link href="/about">
            <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h1>
          </Link>

          <Link href="/contact">
            <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h1>
          </Link>
          
        </div>
        <div className='lg:absolute lg:right-185px lg:bottom-12px'>
          <InstantSearch
            indexName="dev_Iranian"
            searchClient={searchClient}
          >
            <CustomSearchBox submit={<img src="" alt=""/>}/>
            <CustomHits />
          </InstantSearch>
        </div>
      </nav>
      {console.log(filteredBlogs)}
      {slug.includes('/recipes/blog') ?
      ''
      :
      <div className={`max-width-850 shadow-sm bg-white left-0 m-auto flex flex-col items-center px-4 py-4 even:bg-red absolute left-0 right-0 overflow-y-scroll max-h-25rem ease-in duration-200 ${isSearching ? '' : 'transform  -translate-y-full'}`}>
        {_.map(filteredBlogs, blog => {
          return (
            <div key={blog.title} className='flex pointer hover:opacity-60 transform ease-in duration-100 '> 
              <div className='mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px ' style={{backgroundSize: '50%', backgroundImage:`url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
              </div>
              <div className='flex flex-col p-4'>
                <h1 className='mb-10 text-sm text-center'>{blog.title}</h1>
                {truncate(documentToReactComponents(blog.shortDescription, options), 400)}
              </div>
            </div>
          )
        })}
      </div>
      }
      
    </div>
  );
}


export default Header;




