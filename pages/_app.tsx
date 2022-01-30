import '../styles/globals.css'
import React from 'react'

/**
 *
 * @return {JSX.Element}
 */
function MyApp({ Component, pageProps }: any): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
