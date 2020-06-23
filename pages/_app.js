import React from 'react';
import Header from '../components/shared/Header';

function MyApp({ Component, pageProps, router }) {

  return (
    <div>
      <Header />
      <Component {...pageProps} key={router.route} />
    </div>
  )
}
export default MyApp;