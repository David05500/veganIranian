import { useEffect, useState } from 'react';
import contentfulClient from '../lib/contentful';
import '../assets/styles/main.css';
// import PostList from '../components/post-list';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

const Bold = ({ children }) => <p className="text-base text-black font-medium">{children}</p>;
 
const Text = ({ children }) => {
    return <p className="text-base text-justify">{children}</p>
};

const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-xl">{children}</p>;

const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-lg ">{children}</p>;

const MyLink = ({ children }) => <a className=" text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a>;

const UlList = ({ children }) => <ul className="text-lg text-gray-700  list-disc">{children}</ul>;

const OlList = ({ children }) => <ol className="text-lg text-red  list-decimal">{children}</ol>;



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
      <Head>
          <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <div className='m-auto text-2xl bg-gray-primary'>
        <Header />
        <div className='max-width-735 p-6 lg:p-0 mx-auto my-10 lg:my-20 '>
          {documentToReactComponents(aboutMeDescription, options)}

          <img className='mt-8' src={aboutMePagePic}></img>

        </div>
      </div>
    </div>
)
}

export default About;
