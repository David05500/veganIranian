import React, {useEffect, useState} from 'react';
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




const Bold = ({ children }) => <p className="text-6xl text-green-700">{children}</p>;
 
const Text = ({ children }) => {
    console.log('children', children);
    return <p className="text-lg">{children}</p>
};

const HEADING1 = ({ children }) => <p className="align-center text-blue-300 text-2xl mb-10 mt-20">{children}</p>;

const HEADING3 = ({ children }) => <p className="align-center text-blue-300 text-xl mb-5 mt-10">{children}</p>;

const MyLink = ({ children }) => <a className=" text-green-700 pointer">{children}</a>;

const UiList = ({ children }) => <ul className="text-lg text-green-700 pointer">{children}</ul>;

const BlogPost = (props) => {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState(null)
    useEffect(() => {
        setPost(props.blogPost);
        console.log(props.blogPost)
    }, []);

    const options = {
        // renderMark: {
        //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        // },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
          [BLOCKS.UL_LIST]: (node, children) => <UiList>{children}</UiList>,
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
            <div className='m-auto text-2xl bg-gray-primary '>
                <Header />
                <div className='max-w-1170 px-4 lg:px-8 mx-auto mt-20'>

                    <h1 className='mb-10 text-center'>{post.title}</h1>
                    <div className='w-full flex justify-center mb-10'>
                        <button className='px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base'>take me to the recipe</button>
                    </div>

                    {documentToReactComponents(post.recipeDescription, options)}

                    <div className='my-10 text-lg'>

                        <div className='flex items-center w-full mb-2'>
                            <IoIosInformationCircleOutline className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Course: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.course}</h1>
                            </div>
                        </div>

                        <div className='flex items-center w-full mb-2'>
                            <GiWorld className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Cuisine: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.cuisine}</h1>
                            </div>
                        </div>

                        <div className='flex items-center w-full mb-2'>
                            <RiKnifeLine className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Prep Time: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.prepTime}</h1>
                            </div>
                        </div>


                        <div className='flex items-center w-full mb-2'>
                            <GiCookingPot className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Cook Time: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.cookTime}</h1>
                            </div>
                        </div>
                        

                        <div className='flex items-center w-full mb-2'>
                            <IoMdTime className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Total Time: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.totalTime}</h1>
                            </div>
                        </div>

                        
                        <div className='flex items-center w-full mb-2'>
                            <IoIosPeople className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Servings: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.servings}</h1>
                            </div>
                        </div>

                        <div className='flex items-center w-full mb-2'>
                            <FaBatteryThreeQuarters className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Calories: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5'>{post.calories}</h1>
                            </div>
                        </div>

                        <div className='flex items-center w-full mb-2'>
                            <GiChefToque className='text-gray-800 mr-4'/>
                            <div className='w-full flex'>
                                <h1 className='w-1/2 self-center lg:flex-1'>Author: </h1>
                                <h1 className='w-1/2 text-gray-800 lg:flex-5 '>{post.author}</h1>
                            </div>
                        </div>
                    </div>
    
                    <div className='mb-10'>
                        <h1  className="align-center text-blue-300 font-bold text-xl mb-5 mt-10">Ingredients</h1>
                        {documentToReactComponents(post.ingredients, options)}
                    </div>
    
                    
                    <div className='mb-10'>
                        <h1  className="align-center text-blue-300 font-bold text-xl mb-5 mt-10">Instructions</h1>
                        {documentToReactComponents(post.instructions, options)}
                    </div>
    
                    <div className='mb-10'>
                        <h1 className="align-center text-blue-300 font-bold text-xl mb-5 mt-10">Notes</h1>
                        {documentToReactComponents(post.notes, options)}
                    </div>
    
                    {/* <div>
                        <h1>Nutrition</h1>
                        {documentToReactComponents(post.nutrition)}
                    </div> */}
                </div>
            </div>
        )
    }
};

BlogPost.getInitialProps = async ({ query }) => {
    const { slug } = query;
    const props = await getContentfulContent('blogPost', slug);
    return props;
};
export default BlogPost;