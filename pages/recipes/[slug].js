import React, {useEffect, useState, useRef} from 'react';
import {useRouter} from 'next/router';
import getContentfulContent from '../../lib/getContentfulContent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import '../../assets/styles/main.css';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Header from '../../components/shared/Header';
import { RiKnifeLine } from "react-icons/ri";
import { GiCookingPot, GiChefToque, GiWorld } from "react-icons/gi";
import { IoMdTime, IoIosPeople, IoIosInformationCircleOutline } from "react-icons/io";
import { FaBatteryThreeQuarters } from "react-icons/fa";
import Head from 'next/head';
import { GiKnifeFork } from "react-icons/gi";
import { GrInstagram } from "react-icons/gr";




const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

const Bold = ({ children }) => <p className="text-6xl text-green-700">{children}</p>;
 
const Text = ({ children }) => {
    return <p className="text-base text-justify">{children}</p>
};

const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-xl">{children}</p>;

const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-lg ">{children}</p>;

const MyLink = ({ children }) => <a className=" text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a>;

const UlList = ({ children }) => <ul className="text-lg text-gray-700 pointer list-disc">{children}</ul>;

const OlList = ({ children }) => <ol className="text-lg text-red pointer list-decimal">{children}</ol>;

const BlogPost = ({blogPost}) => {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState(null);

    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);
    
    useEffect(() => {
        setPost(blogPost);
    }, []);

    const options = {
        // renderMark: {
        //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        // },
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

    if (post == null) {
        return(
            <h1>Loading...</h1>
        )
    }else{
        return (
            <div>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </Head>
                <div className='m-auto text-2xl bg-gray-primary '>
                    <Header />
                    <div className='max-width-735 px-4 mx-auto mt-10 lg:mt-20'>

                        <h1 className='mb-10 text-center'>{post.title}</h1>

                        <div className='w-full flex justify-center mb-10'>
                            <button onClick={executeScroll}  className='flex items-center px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base flex'><img src="/cutlery.svg"  className='w-8 text-gray-300 mr-3' /> JUMP TO RECIPE</button>
                            
                        </div>

                        {documentToReactComponents(post.recipeDescription, options)}

                        {/* Recipe Card */}
                        <div ref={myRef} className='mb-8 lg:mx-16 p-2 lg:p-8 lg:my-20 shadow-md bg-white'>
                            <div className='w-full '>
                                <h1 className='py-10 text-center text-3xl font-medium border-btm mb-10'>{post.title}</h1>
                                <div className='my-2 text-lg'>
                                    <div className='flex items-center justify-center w-full mb-4'>
                                        <IoIosInformationCircleOutline size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                        <div className='flex'>
                                            <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Course: </h1>
                                            <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.course}</h1>
                                        </div>
                                    </div>
                                    
                                    <div className='flex items-center justify-center mb-4'>

                                        <div className='w-1/2 flex items-center w-full lg:ml-8'>
                                            <GiCookingPot size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                            <div className='flex'>
                                                <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Cook Time: </h1>
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.cookTime}</h1>
                                            </div>
                                        </div>

                                        <div className='w-1/2 flex items-center w-full'>
                                            <IoMdTime size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                            <div className='flex'>
                                                <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Total Time: </h1>
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.totalTime}</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center mb-4'>
                                        <div className='w-1/2 flex items-center w-full lg:ml-8'>
                                            <RiKnifeLine size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                            <div className='flex'>
                                                <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Prep Time: </h1>
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.prepTime}</h1>
                                            </div>
                                        </div>

                                        <div className='w-1/2 flex items-center w-full'>
                                            <IoIosPeople size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                            <div className='flex'>
                                                <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-4'>Servings: </h1>
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.servings}</h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='px-4 lg:px-8 bg-gray-primary lg:pb-8 py-5'> 
                                
                                <div className='border-btm mb-12 mt-4 pb-8'>
                                    <h1  className="align-center text-gray-500 font-bold text-base mb-5">INGREDIENTS</h1>
                                    {documentToReactComponents(post.ingredients, options)}
                                </div>
                
                                
                                <div className='border-btm mb-12 pb-8'>
                                    <h1  className="align-center text-gray-500 font-bold text-base mb-5">INSTRUCTIONS</h1>
                                    {documentToReactComponents(post.instructions, options)}
                                </div>
                                <div className=' bg-white p-4 lg:p-8 mb-12 pb-8'>
                                    <h1 className="align-center flex items-center text-gray-500 font-bold text-base mb-8">
                                    <IoIosInformationCircleOutline size={20} className='hidden lg:block text-gray-700 mr-1 lg:mr-2'/>
                                    NOTES</h1>
                                    {documentToReactComponents(post.notes, options)}
                                </div>
                            </div>
                        
                            <div className='w-full flex bg-white p-4 lg:p-8'>
                                <div className='w-1/3 flex justify-left lg:justify-center items-center'>
                                    <GrInstagram  size={60}/>
                                </div>
                                <div className='w-2/3'>
                                    <h1 className='text-xl mb-4'>Did you make this recipe?</h1>
                                    <h1 className='text-base'>Tag @theiranianvegan on Instagram and hashtag it #theiranianvegan</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

BlogPost.getInitialProps = async ({ query }) => {
    const { slug } = query;
    const props = await getContentfulContent('blogPost', slug);
    return {blogPost: props.blogPost};
};
export default BlogPost;