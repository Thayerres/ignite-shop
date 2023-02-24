import type { AppProps } from 'next/app'
import Header from '../components/header'
import { CartProvider } from '../contexts/cartContext'
import { globalStyles } from '../styles/global'

import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
