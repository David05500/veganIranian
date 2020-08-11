import '../assets/styles/main.css';
// import PostList from '../components/post-list';
import Header from '../components/shared/Header';
import Head from 'next/head';
import _ from 'lodash';

const  About = () => {

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
            <p className='text-justify text-sm leading-7 mb-4'>
            One of the cultural traits that immigrant communities pass on from generation to generation is the heritage of our cuisine. For us, as Iranians, and especially as the Iranian diaspora, food is so much more than just food. Engaging with the rituals and practices of creating and eating food are ways in which we connect with and hold on to our culture. Our identities are often fragmented, confused and we feel estranged from the world outside of our homes and our families. Given our history, and the political upheaval and change that has displaced us, consuming such food offers a stability of identity and ties us to our lineage in spaces of uncertainty.          </p>

            <p className='text-justify text-sm leading-7 mb-4'> Like many vegans from non-Western backgrounds, we often feel like we’re entering into a white-dominated space. Like veganism isn’t ours. With meat being such a huge staple in Iranian culture and diet, it often feels hard to disconnect with our culture and distance ourselves from our family, friends, social situations and identify with veganism, which is often dominated by western neoliberal narratives. This space is created to change that.          </p>

            <p className='text-justify text-sm leading-7 mb-4'>Our vegan practices don't mean that we have to leave our culture behind. As we know, the means of meat production today are nothing like it was on the farms of our ancestors. Animals are made a commodity, mass-produced and abused, whilst they are injected with hormones and medicated, having disastrous effects on our health, not to mention our dying Earth. This space is created to engage with our heritage, origins and anthropology of our food, as a way of maintaining the thread of continuity with our ancestors whilst offering a space for growth as times change, and as we change. For me, there is so much love and honour in creating the foods of my ancestors and knowing there is no pain and suffering in the dish, only love.          </p>

            <p className='text-justify text-sm leading-7 font-medium mb-4'>I’m Mana. A young woman from the Iranian diaspora based in London. That’s all you need to know really. Apart from the fact I’m probably a lot like you. I believe in compassion. I think we have a duty to create a world that is more ethical and just than the one in which we were raised. For me, this duty extends to all forms of life.
            </p>

          </div>
      </div>
    </div>
)
}

export default About;
