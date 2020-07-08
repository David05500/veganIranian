import React from 'react'
import App from 'next/app'

function MyApp({ Component, pageProps, router }) {
  return <Component {...pageProps} key={router.route}/>
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default MyApp;