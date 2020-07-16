import '../assets/styles/main.css';
import Header from '../components/shared/Header';
import Head from 'next/head';
import ContactForm from '../components/contactForm';

const  Contact = () => {

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
          <div className='max-width-920 px-4 lg:px-8 mx-auto my-20'>
            <h1 className=' mb-5 sub-title text-center text-lg text-gray-900'>CONTACT FORM</h1>
            <ContactForm />
          </div>
      </div>
    </div>
)
}

export default Contact;
