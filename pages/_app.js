import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/shared/Header';

function MyApp({ Component, pageProps, router }) {

  return (
    <div>
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </div>
  )
}
export default MyApp;