import { useEffect, useState } from 'react';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
// import PostList from '../components/post-list';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Meta from '../components/shared/SeoMeta.js'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

const Bold = ({ children }) => <span className="text-base text-black font-medium">{children}</span>;
 
const Text = ({ children }) => {
    return <p className="text-base text-justify">{children}</p>
};

const HEADING1 = ({ children }) => <h1 className="align-center text-gray-800 text-xl">{children}</h1>;

const HEADING3 = ({ children }) => <h3 className="align-center text-gray-800 text-lg ">{children}</h3>;

const MyLink = ({ children }) => <a className=" text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a>;

const UlList = ({ children }) => <ul className="text-lg text-gray-700  list-disc">{children}</ul>;

const OlList = ({ children }) => <ol className="text-lg text-red  list-decimal">{children}</ol>;

const addJSONLD = () => {
  return {
      __html: `[{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://theiranianvegan.com/about/#webpage",
        "url": "https://theiranianvegan.com/about/",
        "name": "About Me - The Iranian Vegan",
        "datePublished": "2020-08-31T12:00:44+00:00",
        "inLanguage": "en-GB",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://theiranianvegan.com/#webpage",
          "url": "https://theiranianvegan.com/",
          "name": "The Iranian Vegan",
          "description": "Discover authentic iranian vegan recipes!",
          "inLanguage": "en-GB" 
        },
        "description": "One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.",
        "publisher": {
            "@type": "Person",
            "name": "Mana Rose Shamshiri-Fard"
        }
      }]`
  }
};



const GetAboutPageData = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'aboutMe',
    limit: 100,
  });
  const aboutMedata = res.items.map(item => item.fields);
  return aboutMedata;
};

const About = () => {
  const [aboutMePagePic, setAboutMePagePic] = useState('');
  const [aboutMeDescription, setAboutMeDescription] = useState('');

  useEffect(() => {
    GetAboutPageData().then(data => {
      data[0].aboutMePic != undefined ? setAboutMePagePic(data[0].aboutMePic.fields.file.url) : '';
      setAboutMeDescription(data[0].aboutMeDescription)
    });
  }, []);


  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
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


  return (
    <div>
      <Meta 
        title='Iranian Vegan | About' 
        description='One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food.'
      />
      <div className='m-auto text-2xl bg-gray-primary'>
        <Header />
        <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:my-20 '>
          {documentToReactComponents(aboutMeDescription, options)}

          <img className='mt-8' src={aboutMePagePic}></img>

        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addJSONLD()}
      /> 
    </div>
)
}

export default About;
