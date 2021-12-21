import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }) {

  Router.events.on('routeChangeStart', () => {
    nProgress.start()
  })
  Router.events.on('routeChangeComplete', () => {
    nProgress.done()
  })
  Router.events.on('routeChangeError', () => {
    nProgress.done()
  })
  return <div style={{ fontFamily: `'Bangers', 'cursive'` }}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/tailwind.output.css" />
    </Head>
    <Component {...pageProps} /> </div>
}

export default MyApp;





