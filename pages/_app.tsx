import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'HCmoj4jmyn5bvefc4FkuR8mLEMWfB5RLVgIVDqpT';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'vQ8a9W3myQrXjUuqUGJH7d1amkg2xWWEgsQRJcdH';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);

Parse.serverURL = PARSE_HOST_URL;


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
