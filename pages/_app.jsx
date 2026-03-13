import '../styles/globals.css'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { GA_TRACKING_ID } from '../lib/gtag'
import Script from 'next/script'


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
  
    const handleRouteChange = (url) => {
      NProgress.done();
      gtag.pageview(url);
    }

    router.events.on('routeChangeStart', () => NProgress.start()); 
    router.events.on('routeChangeError', () => NProgress.done());  
    router.events.on('routeChangeComplete', handleRouteChange);


    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }

  }, []);

  return  (
  <>
     {GA_TRACKING_ID && 
      <Script 
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} 
      />
      }
      <Component {...pageProps} />
  </>
  )


}

export default MyApp
