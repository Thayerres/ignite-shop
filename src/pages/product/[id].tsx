import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { IProduct } from "../../contexts/cartContext";
import { useCart } from "../../hooks/useCart";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const { addProductInCart, cartProduct } = useCart()

  const existsProductInCart = cartProduct.some((cartProduct) => {
    return cartProduct.id === product.id
  })

  function handleAddProductToCart(){
    addProductInCart(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={existsProductInCart}
            onClick={handleAddProductToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // { params: { id: "prod_N8ncyYPZZ9SRyT" } }
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id,
        amount: price.unit_amount! / 100,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 Hora
  };
};
