import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout';

function MyApp({ Component, pageProps, router }) {

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  )
}
export default MyApp;