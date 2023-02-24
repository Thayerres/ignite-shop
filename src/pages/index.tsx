import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react";
import {
  HomeContainer,
  Product,
  ProductDetails,
  ProductFooter,
  ProductAction,
} from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "phosphor-react";
import { IProduct } from "../contexts/cartContext";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <ProductFooter>
                  <ProductDetails>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </ProductDetails>
                  <ProductAction>
                    <Handbag weight="bold" size={32} />
                  </ProductAction>
                </ProductFooter>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
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
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Horas
  };
};
