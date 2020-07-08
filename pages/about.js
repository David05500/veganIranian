import '../assets/styles/main.css';
// import PostList from '../components/post-list';
import Header from '../components/shared/Header';

const  About = () => {

  return (
    <div className='m-auto text-2xl bg-gray-primary'>
        <Header />
        <div className='max-w-1170 px-4 lg:px-8 mx-auto mt-20'>
          <p className='text-center text-base leading-7'>
            IRANIAN BORN DIRECTOR AND PHOTOGRAPHER, SOMAYEH COMBINES HER EYE FOR THE CINEMATIC
            MOMENT WITH HER DOCUMENTARY EXPERIENCE AND INTEREST. HER PERSONAL HISTORY IS OFTEN LAYERED INTO HER WORK, SOMETIMES RAW, OFTEN POETIC. THE STORY OF HER OWN HERITAGE AND SELF-IDENTITY OFTEN BECOMES INTERLACED WITH HER SUBJECT MATTER TO PRODUCE AN INTIMATE AND VERY FEMININE LANGUAGE ON-SCREEN.
          </p>

          <p className='text-center text-base'>EMAIL: MANNAROSESHAMSHIRI@GMAIL.COM</p>

          <div className='w-full flex justify-center mb-10'>
            <button className='px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base'>take me to the recipe</button>
          </div>

          <div className='w-full flex justify-center mb-10'>
            <button className='px-4 py-3 bg-white rounded border-solid border border-gray-500 text-base'>take me to the recipe</button>
          </div>
        </div>
    </div>
)
}

export default About;
