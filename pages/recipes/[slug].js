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





const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

const Bold = ({ children }) => <p className="text-6xl text-green-700">{children}</p>;
 
const Text = ({ children }) => {
    return <p className="text-lg">{children}</p>
};

const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-2xl">{children}</p>;

const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-xl ">{children}</p>;

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
                    <div className='max-width-1000 px-4 lg:px-8 mx-auto mt-20'>

                        <h1 className='mb-10 text-center'>{post.title}</h1>
                        <div className='w-full flex justify-center mb-10'>
                            <button onClick={executeScroll}  className='px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base flex'><GiKnifeFork size={20} className='text-gray-600 mr-2'/> JUMP TO RECIPE</button>
                        </div>

                        {documentToReactComponents(post.recipeDescription, options)}

                        {/* Recipe Card */}
                        <div ref={myRef} className='m-20 border-solid border-15 border-white'>
                            <div className='w-full bg-white'>
                                <h1 className='py-10 text-center text-3xl font-medium'>{post.title}</h1>
                            </div>
                            <div className='px-8'> 
                                <div className='my-10 text-lg mt-16'>
                                    <div className='flex items-center w-full mb-2'>
                                        <IoIosInformationCircleOutline size={26} className='text-gray-800 mr-4'/>
                                        <div className='w-full flex'>
                                            <h1 className='w-1/3 self-center'>Course: </h1>
                                            <h1 className='w-2/3 text-gray-800 font-medium'>{post.course}</h1>
                                        </div>
                                    </div>

                                    <div className='flex items-center w-full mb-2'>
                                        <RiKnifeLine size={26} className='text-gray-800 mr-4'/>
                                        <div className='w-full flex'>
                                            <h1 className='w-1/3 self-center'>Prep Time: </h1>
                                            <h1 className='w-2/3 text-gray-800 font-medium '>{post.prepTime}</h1>
                                        </div>
                                    </div>


                                    <div className='flex items-center w-full mb-2'>
                                        <GiCookingPot size={26} className='text-gray-800 mr-4'/>
                                        <div className='w-full flex'>
                                            <h1 className='w-1/3 self-center'>Cook Time: </h1>
                                            <h1 className='w-2/3 text-gray-800 font-medium'>{post.cookTime}</h1>
                                        </div>
                                    </div>


                                    <div className='flex items-center w-full mb-2'>
                                        <IoMdTime size={26} className='text-gray-800 mr-4'/>
                                        <div className='w-full flex'>
                                            <h1 className='w-1/3 self-center'>Total Time: </h1>
                                            <h1 className='w-2/3 text-gray-800 font-medium'>{post.totalTime}</h1>
                                        </div>
                                    </div>


                                    <div className='flex items-center w-full mb-2'>
                                        <IoIosPeople size={26} className='text-gray-800 mr-4'/>
                                        <div className='w-full flex'>
                                            <h1 className='w-1/3 self-center'>Servings: </h1>
                                            <h1 className='w-2/3 text-gray-800 font-medium'>{post.servings}</h1>
                                        </div>
                                    </div>

                                </div>


                                <div className='my-16'>
                                    <h1  className="align-center text-gray-800 font-bold text-xl mb-5 mt-10">Ingredients</h1>
                                    {documentToReactComponents(post.ingredients, options)}
                                </div>
                
                                
                                <div className='my-10'>
                                    <h1  className="align-center text-gray-800 font-bold text-xl mb-5 mt-10">Instructions</h1>
                                    {documentToReactComponents(post.instructions, options)}
                                </div>
                                <div className='my-10 bg-white p-8'>
                                    <h1 className="align-center text-gray-800 font-bold text-xl mb-5 ">Notes</h1>
                                    {documentToReactComponents(post.notes, options)}
                                </div>
                            </div>
                           
                            <div className='w-full bg-white'>
                                <h1 className='py-10 text-center'>{post.title}</h1>
                            </div>
                        </div>

        
                        {/* <div>
                            <h1>Nutrition</h1>
                            {documentToReactComponents(post.nutrition)}
                        </div> */}
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