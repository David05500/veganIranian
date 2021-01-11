import React, {useEffect, useState, useRef, useContext} from 'react';
import getContentfulContent from '../../lib/getContentfulContent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import '../../assets/styles/main.css';
import Header from '../../components/shared/Header';
import Head from 'next/head';
import { GrInstagram } from "react-icons/gr";
import BlogDataContext from '../../components/BlogDataContext';


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 220);

// const Bold = ({ children }) => <p className="text-6xl text-green-700">{children}</p>;
 
// const Text = ({ children }) => <p className="text-base text-justify">{children}</p>;

const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-xl">{children}</p>;

const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-lg ">{children}</p>;

const MyLink = ({ children }) => <a className=" text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a>;

// const UlList = ({ children }) => <ul className="text-lg text-gray-700  list-disc">{children}</ul>;

const OlList = ({ children }) => <ol className="text-lg text-red list-decimal">{children}</ol>;
const addJSONLD = (recipe) => {
    return {
        __html: `[{
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.theiranianvegan.com//recepies/${recipe.slug}"
            },  
            "name": "${recipe.title}",
            "image": [
                "/course.svg"
            ],
            "author": {
              "@type": "Person",
              "name": "Mana Rose Shamshiri-Fard"
            },
            "datePublished": "${recipe.createdAt}",
            "description": "This coffee cake is awesome and perfect for parties.",
            "prepTime": "${recipe.prepTime}",
            "cookTime": "${recipe.cookTime}",
            "totalTime": "${recipe.totalTime}",
            "keywords": "cake for a party, coffee",
            "recipeYield": "${recipe.servings}",
            "recipeCategory": "${recipe.course}",
            "recipeCuisine": "${recipe.cuisine}",
            "recipeIngredient": [
              "2 cups of flour",
              "3/4 cup white sugar",
              "2 teaspoons baking powder",
              "1/2 teaspoon salt",
              "1/2 cup butter",
              "2 eggs",
              "3/4 cup milk"
              ],
            "recipeInstructions": [
              {
                "@type": "HowToStep",
                "name": "Preheat",
                "text": "Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.",
                "url": "https://example.com/party-coffee-cake#step1",
                "image": "https://example.com/photos/party-coffee-cake/step1.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Mix dry ingredients",
                "text": "In a large bowl, combine flour, sugar, baking powder, and salt.",
                "url": "https://example.com/party-coffee-cake#step2",
                "image": "https://example.com/photos/party-coffee-cake/step2.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Add wet ingredients",
                "text": "Mix in the butter, eggs, and milk.",
                "url": "https://example.com/party-coffee-cake#step3",
                "image": "https://example.com/photos/party-coffee-cake/step3.jpg"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "18"
            }
        }]`,
    }
};
const BlogPost = ({blogPost}) => {
    const { isEnglish } = useContext(BlogDataContext);
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
            [BLOCKS.PARAGRAPH]: (node, children) => <p className={`text-base mb-4 ${isEnglish ? 'text-justify' : 'text-right'}`}>{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className={`text-base lg:text-lg text-gray-700  list-disc`} style={{direction: isEnglish ? 'unset' : 'rtl',  marginRight: isEnglish ? 'unset' : '1.5rem'}}>{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className="text-base lg:text-lg text-red  list-decimal" style={{direction: isEnglish ? 'unset' : 'rtl', listStyle: isEnglish ? 'unset' : 'persian', marginRight: isEnglish ? 'unset' : '1.5rem'}}>{children}</ol>,
            [BLOCKS.HEADING_1]: (node, children) => <HEADING1>{children}</HEADING1>,
            [BLOCKS.HEADING_3]: (node, children) => <HEADING3>{children}</HEADING3>,
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                return <img src={node.data.target.fields.file.url} className='my-10'/>
            },
            [INLINES.HYPERLINK]: (node, children) => <MyLink>{children}</MyLink>,
        },
    };
    if (post == null) {
        return <h1>Loading...</h1>
    }else{
        return (
            <div>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap"  rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Cookie|Dancing+Script|Sacramento&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800&display=swap" rel="stylesheet"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </Head>
                <div className='m-auto text-2xl bg-gray-primary '>
                    <Header />
                    <div className='max-width-735 px-4 mx-auto mt-10 lg:mt-20'>

                        <h1 className='mb-10 text-center transform ease-in text-xl lg:text-2xl duration-100'>{isEnglish ? post.title : post.farsiTitle}</h1>
                        {post.blogPostImage != undefined ? <img src={post.blogPostImage.fields.file.url} className='mb-8 w-5/6 m-auto'></img> : ''}
                        {post.blogPostImage2 != undefined ? <img src={post.blogPostImage2.fields.file.url} className='mb-8 w-5/6 m-auto'></img> : ''}
                        {post.blogPostImage3 != undefined ? <img src={post.blogPostImage3.fields.file.url} className='mb-8 w-5/6 m-auto'></img> : ''}
                        {post.blogPostImage4 != undefined ? <img src={post.blogPostImage4.fields.file.url} className='mb-10 w-5/6 m-auto'></img> : ''}


                        <div className='w-full flex justify-center mb-10'>
                            <button onClick={executeScroll}  className='flex items-center px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base flex'>
                                <img src="/cutlery.svg"  className='w-8 text-gray-300 mr-3' /> 
                                {isEnglish ? 'JUMP TO RECIPE' : 'دسترسی به طرز تهیه'}
                            </button>
                        </div>

                        {documentToReactComponents(isEnglish ? post.recipeDescription : post.farsiRecipeDescription, options)}

                        {/* Recipe Card */}

                        <div ref={myRef} className='mb-8  lg:mx-16 p-2 lg:p-8 lg:mb-20 mt-48 relative shadow-md bg-white'>
                            <div className='w-48 absolute my-auto left-23 lg:left-34 top-9n h-64'>
                                <div className='clip-polygon w-full h-full absolute' style={{clipPath: 'polygon(50% 0, 100% 100%, 50% 100%, 0 50%)', backgroundSize: '62%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',  backgroundImage: `url(${blogPost.smallBlogPostImage.fields.file.url})`}}>
                                </div>
                                <img src="/paisley.png"  className=' h-64 absolute text-gray-500' />
                            </div>

                            <div className='w-full mt-24 px-4 lg:px-0'>
                                <h1 className='py-10 text-center text-2xl lg:text-3xl font-medium border-btm mb-10'>{isEnglish ? post.title : post.farsiTitle}</h1>
                                <div className='my-2 text-lg pl-4 lg:pl-0'>


                                    {isEnglish 
                                        ?(
                                            <div className='flex items-center lg:justify-center w-full mb-6'>
                                                <img src="/course.svg"  className='w-5 text-gray-500 mr-3' />
                                                <div className='flex'>
                                                    <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Course: </h1> 
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</h1>
                                                </div>
                                            </div>
                                        )
                                        :(
                                            <div className='flex items-center  justify-end lg:justify-center w-full mb-6'>
                                                <div className='flex'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base'>{post.course}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm  ml-2'>:نوع وعده</h1>
                                                </div>
                                                <img src="/course.svg"  className='w-5 text-gray-500 ml-3' />
                                            </div>
                                        )
                                    }

           
                                    <div className='flex flex-col lg:flex-row items-center justify-center mb-4 lg:mr-3'>


                                        {isEnglish 
                                            ?(
                                                <div className='w-1/2 flex items-center w-full lg:ml-4 mb-4 lg:mb-0'>
                                                    <img src="/cook-time.svg"  className='w-5 text-gray-500 mr-3' />
                                                    <div className='flex'>
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Cook Time: </h1> 
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            :(
                             
                                                <div  className='w-full lg:w-45p flex items-center justify-end mb-4 lg:mb-0 lg:mr-3'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:آماده سازی</h1>
                                                    <img src="/prep-time.svg"  className='w-5 text-gray-500 ml-3' />
                                                </div>
                                            )
                                        }


                                        {isEnglish 
                                            ?(
                                                <div className='w-1/2 flex items-center w-full lg:ml-4'>
                                                    <img src="/total-time.svg"  className='w-5 text-gray-500 mr-3' />
                                                    <div className='flex'>
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Total Time: </h1> 
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            :(
                                                <div className='w-full lg:w-55p flex items-center justify-end'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.totalTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:کل مدت زمان مورد نیاز</h1>
                                                    <img src="/total-time.svg"  className='w-5 text-gray-500 ml-3' />
                                                </div>
                                            )
                                        }
                                        
                                    </div>

                                    <div className='flex flex-col lg:flex-row items-center justify-center mb-4 lg:mr-3'>
                                        {isEnglish 
                                            ?(
                                                <div  className='w-1/2 flex items-center w-full lg:ml-4 mb-4 lg:mb-0'>
                                                    <img src="/prep-time.svg"  className='w-5 text-gray-500 mr-3' />
                                                    <div className='flex'>
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Prep Time: </h1> 
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.prepTime}</h1>
                                                    </div>
                                                </div>
                                            )
                                            :(
                                                <div  className='w-full lg:w-45p flex items-center justify-end mb-4 lg:mb-0 lg:mr-3'>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm ml-3 text-right'>:تعداد سرو</h1>
                                                    <img src="/servings.svg"  className='w-5 text-gray-500 ml-3' />
                                                </div>
                                            )
                                        }

                                        {isEnglish 
                                            ?(
                                                <div  className='w-1/2 flex items-center w-full lg:ml-4'>
                                                    <img src="/servings.svg"  className='w-5 text-gray-500 mr-3' />
                                                    <div className='flex'>
                                                        <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Servings: </h1> 
                                                        <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.servings}</h1>
                                                    </div>
                                                </div>
                                            )
                                            :(
                                                <div className='w-full lg:w-55p flex items-center justify-end mb-4 lg:mb-0 '>
                                                    <h1 className='text-gray-800 font-medium text-sm lg:text-base  '>{post.cookTime}</h1>
                                                    <h1 className='self-center text-gray-600 text-sm  ml-3 lg:ml-2 text-right'>:مدت زمان پخت</h1>
                                                    <img src="/cook-time.svg"  className='w-5 text-gray-500 ml-3' />
                                                </div>
                                            )
                                        }

                                        
                                       

                                        {/* <div className='w-1/2 flex items-center w-full lg:ml-4'>
                                            <img src="/servings.svg"  className='w-5 text-gray-500 mr-3' />
                                            <div className='flex'>
                                                {isEnglish 
                                                    ? <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>Servings: </h1> 
                                                    : <h1 className='self-center text-gray-600 text-sm mr-1 lg:mr-1'>وعده:</h1>
                                                }
                                                <h1 className='text-gray-800 font-medium text-base lg:text-lg'>{post.servings}</h1>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>

                            <div className='px-4 lg:px-8 bg-gray-primary lg:pb-8 py-5'> 
                                
                                    <div className='border-btm mb-10 mt-4 pb-8'>
                                        {isEnglish 
                                            ? <h1 className="align-center text-gray-500 font-bold text-base mb-5">INGREDIENTS</h1> 
                                            : <h1 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">مواد لازم</h1>
                                        }
                                        {documentToReactComponents(isEnglish ? post.ingredients : post.farsiIngredients, options)}
                                    </div>
                    
                                    
                                    <div className='border-btm mb-10 pb-8'>
                                        {isEnglish 
                                            ? <h1 className="align-center text-gray-500 font-bold text-base mb-8">INSTRUCTIONS</h1>
                                            : <h1 className="align-center text-gray-500 font-bold text-2xl text-right mb-8">طرز تهیه</h1>
                                        }
                                        {documentToReactComponents(isEnglish ? post.instructions : post.farsiInstructions, options)}
                                    </div>

                                        {isEnglish 
                                            ? <h1 className="align-center flex items-center text-gray-500 font-bold text-base mb-5 "><img src="/notes.svg"  className='w-5 text-gray-500 mr-3' />NOTES</h1>
                                            : <h1 className="align-center flex items-center justify-end text-gray-500 font-bold text-2xl text-right mb-8  ">فوت و فن <img src="/notes.svg"  className='w-5 text-gray-500 ml-3' /></h1>
                                        }
                                    <div className='bg-white p-4 pt-10 lg:p-8 mb-12 pb-8 cut-corrner'>
                                        {documentToReactComponents(isEnglish ? post.notes : post.farsiNotes, options)}
                                    </div>
                            </div>
                        
                            <div className='w-full flex bg-white p-4 lg:p-8'>
                                <div className='w-1/3 flex justify-left lg:justify-center items-center'>
                                    <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'> 
                                    <GrInstagram  size={60}/>
                                    </a>
                                </div>
                                <div className='w-2/3'>
                                    <h1 className='text-xl mb-4'>Did you make this recipe?</h1>
                                    <h1 className='text-base'>Tag 
                                    <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'> 
                                    <span> @theiranianvegan </span>
                                    </a>
                                    <span>on Instagram and hashtag </span>  
                                    <a href='https://www.instagram.com/theiranianvegan/' className='  hover:opacity-60 transform ease-in duration-100'> 
                                        #theiranianvegan
                                    </a></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='hidden'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addJSONLD(post)}
                /> 
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