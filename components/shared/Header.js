import React, {useEffect, useState, useRef, useContext} from 'react';
import Link from 'next/link';
import '../../assets/styles/main.css';
import Head from 'next/head';
import contentfulClient from '../../lib/contentful';
// import algoliasearch from 'algoliasearch/lite';
import { InstantSearch,   connectHits, connectSearchBox } from 'react-instantsearch-dom';
import BlogDataContext from '../BlogDataContext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import {useRouter} from 'next/router';
import _ from 'lodash';

// new
import algoliasearch from 'algoliasearch';
const client = algoliasearch('M9SIDYA62K', 'e278595e667bbbe39f9dd4c380574c45');
const index = client.initIndex('prod_TheIranianVegan');

// index.searchForFacetValues('course', 'Main Course').then(({ facetHits }) => {
//   console.log(facetHits);
// })

// index.search('Main Course', {facets: ['course']}).then(({ hits }) => {
//   console.log('asd', hits);
// });

const getData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'nav',
    limit: 100,
  });
  const navData = res.items.map(item => item.fields);
  return navData;
};

// ALGOLIA
const searchClient = algoliasearch(
  'M9SIDYA62K',
  'e278595e667bbbe39f9dd4c380574c45'
);
const Hits = (data) => {
  const {updateBlogs} = useContext(BlogDataContext);
  data.hits != undefined ? updateBlogs(data.hits) : null;
  return(null);
};
const CustomHits = connectHits(Hits);


const SearchBox = ( { currentRefinement, isSearchStalled, refine, setIsSearching, updateSearchState }) => (
  <form noValidate action="" role="search" className='mt-4 lg:mt-0 relative'>
    <input
      type="search"
      value={currentRefinement}
      onChange={event =>  updateSearchState(event.currentTarget.value)}
      className='search-input text-sm font-medium px-2 py-1 flex justify-center text-black items-center '
      placeholder='Search here...'
      onFocus={() => setIsSearching(true)}
      onBlur={() => setIsSearching(false)}
    />
    <svg onClick={() => updateSearchState('')} role="presentation" className="i-search w-3" viewBox="5 5 30 30" fill="none" stroke="currentcolor" color='gray' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

//MARKDOWN
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

// COMPONENT
const Header = props => {
  const refy = useRef();
  const [logoBgImage, setLogoBgImage] = useState([]);
  const [isShrink, setIsShrink] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const { isEnglish, setIsEnglish } = useContext(BlogDataContext);
  
  const { filteredBlogs, blogs, isSearching, setIsSearching, userSearchQuery, setUserSearchQuery } = useContext(BlogDataContext);

  const router = useRouter();
  const slug = router.pathname;
  
  useEffect(() => {
    getData().then(navData => {
      setLogoBgImage(navData[0].textBgImage.fields.file.url)
    });
  }, []);
  
  useEffect(() => {
    setUserSearchQuery({query: ""});
  }, [slug]);

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
    offset >= 200 ? isShrink ? '' : setIsShrink(true) : isShrink == false ? '' : setIsShrink(false);
  };

  
  const updateSearchState = (query) => {
    slug != '/recipes' ? router.push("/recipes/").then(() => {setUserSearchQuery({query});}) : setUserSearchQuery({query});
  };

  return (
    <div className='sticky top-0 z-50'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
      </Head>
      <nav ref={refy} className={`max-width-1170 bg-gray-1000 border-btm  left-0 m-auto flex flex-col justify-center items-center z-150 py-4 relative`}>

        <Link href="/">
          <h1 className={`italic relative z-10 text-3xl  text-black font-bold my-4 ${isShrink ? 'lg:m-0 mb-4 lg:text-6xl transform ease-in duration-200' : 'lg:my-8 lg:text-65xl transform ease-in duration-200 '} pointer main-logo  bg-gray-1000 bg-clip-text`}  style={{color: 'transparent', backgroundSize: '100%', backgroundImage: `url(${logoBgImage})`, textShadow: '4px 4px 0px rgba(0,0,0,0.1)'}}>THE IRANIAN VEGAN</h1>
        </Link>

        <div className='flex w-4/5 lg:w-1/3 m-auto justify-around relative'  > 
          {/* <div  onMouseEnter={() => setIsDropDown(true)} onMouseLeave={() => setIsDropDown(false)}>
            <Link href="/recipes" >
              <h1 className='pointer text-sm font-medium  hover:opacity-60 transform ease-in duration-100 pointer'>RECIPES</h1>
            </Link>
            <div className={`absolute pt-8 z-150 border ${isDropDown ? 'block' : 'hidden'} `} style={{left: '0.5rem', top: '0', }}>
              <div  className='bg-white px-4 py-4 flex flex-col shadow-lg' >
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Appetizers' )}>Appetizers</h1>
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Main Course' )}>Main Course</h1>
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Dessert' )}>Desserts</h1>
                <h1 className='text-sm pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Sides' )}>Sides</h1>
              </div>
            </div>
          </div> */}

          <div className="dropdown">
            <Link href="/recipes" >
              {isEnglish 
                ? <h1 className='pointer text-sm font-medium  hover:opacity-60 transform ease-in duration-100 pointer'>RECIPES</h1>
                : <h1 className='pointer text-base font-medium  hover:opacity-60 transform ease-in duration-100 pointer'>طرز تهیه غذاها</h1>
              }
            </Link>
            <div className="dropdown-content">
              <div  className='bg-white px-4 py-4 flex flex-col shadow-lg' >
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Appetizers' )}>Appetizers</h1>
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Main Course' )}>Main Course</h1>
                <h1 className='text-sm mb-4 pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Dessert' )}>Desserts</h1>
                <h1 className='text-sm pointer opacity-75 hover:opacity-100' onClick={() => updateSearchState( 'Sides' )}>Sides</h1>
              </div>
            </div>
          </div>

          <Link href="/about">
            {isEnglish 
              ? <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>ABOUT</h1>
              : <h1 className='pointer text-base font-medium hover:opacity-60 transform ease-in duration-100'>درباره من</h1>
            }
          </Link>

          <a href="/contact">
            {isEnglish 
              ? <h1 className='pointer text-sm font-medium hover:opacity-60 transform ease-in duration-100'>CONTACT</h1>
              : <h1 className='pointer text-base font-medium hover:opacity-60 transform ease-in duration-100'>تماس با من</h1>
            }
          </a>
          
        </div>
        <div className='lg:absolute lg:right-185px lg:bottom-12px'>
          <InstantSearch
            indexName="prod_TheIranianVegan"
            searchClient={searchClient}
            searchState={userSearchQuery}
          >
            <CustomSearchBox reset={<img src='' alt="" />} setIsSearching={setIsSearching} updateSearchState={updateSearchState}/>
            <CustomHits userSearchQuery={userSearchQuery}/>
          </InstantSearch>
        </div>
      </nav>
      {slug.includes('/recipes') ?
      ''
      :
      <div className={`max-width-850 shadow-sm bg-white left-0 m-auto flex flex-col items-center px-4 py-4 even:bg-red absolute left-0 right-0 overflow-y-scroll max-h-25rem ease-in duration-200 ${isSearching ? '' : 'transform  -translate-y-full'}`}>
        {_.map(filteredBlogs, blog => {
          return (
            <Link  key={blog.slug} href='/recipes/[slug]' as={`/recipes/${blog.slug}/`}>
              <div key={blog.title} className='flex pointer hover:opacity-60 transform ease-in duration-100 '> 
                <div className='mb-4 relative pointer max-w-280px max-h-284px min-h-284px min-w-228px lg:max-w-228px ' style={{backgroundSize: '50%', backgroundImage:`url(${blog.smallBlogPostImage.fields.file.url})`, backgroundRepeat:  'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                </div>
                <div className='flex flex-col p-4'>
                  <h1 className='mb-10 text-sm text-center'>{blog.title}</h1>
                  {truncate(documentToReactComponents(blog.shortDescription, options), 400)}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      }
      <div style={{top: '50px', right: '50px', backdropFilter: 'saturate(150%) blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} className="absolute text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
        <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? 'text-blue-400' : ''} rounded-l-full px-4 py-2`} onClick={() => setIsEnglish(true)}>
            <span>English</span>
        </button>
        <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${isEnglish ? '' : 'text-blue-400'} rounded-r-full px-4 py-2`} onClick={() => setIsEnglish(false)}>
            <span>فارسی</span>
        </button>
      </div>
      
    </div>
  );
}
export default Header;




