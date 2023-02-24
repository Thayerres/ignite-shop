import Link from "next/link";
import { ImageBG, ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string,
  products: [{
    name: string,
    imageUrl: string,
  }]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          {
            products &&
            products.map((product) => {
              return (
                <ImageBG key={product.imageUrl} >
                  <Image src={product.imageUrl} width={140} height={140} alt="" />
                </ImageBG>
              )
            })
          }
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products?.length} {products?.length === 1 ? 'camiseta' : 'camisetas'} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand:['line_items','line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const listProducts = session.line_items?.data as Stripe.LineItem[]

  const productItems = listProducts?.map((productItem) => {
    let product = productItem.price?.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  })

  return {
    props: {
      customerName,
      products: productItems
    }
  }
}