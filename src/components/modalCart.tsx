import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import {
  Content,
  ImageContainer,
  Product,
  ProductCheckoutContainer,
  ProductContainer,
  ProductDetails,
  ProductPrice,
  ProductQuantity,
} from "../styles/components/modalCart";

export default function ModalCart() {
  const { cartProduct, removeProductInCart } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const totalPrice = cartProduct.reduce((prev, current) => {
    return prev + current.amount
  }, 0)
  
  const totalPriceFormat = new Intl
    .NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalPrice)

  function handleRemoveProductInCart(id: string) {
    removeProductInCart(id)
  }


  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const checkoutProduct = cartProduct.map((product) => {
        return {
          price: product.defaultPriceId,
          quantity: 1
        }
      })

      const response = await axios.post("/api/checkout", {
        products: checkoutProduct
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <Dialog.Portal>
      <Content>
        <h1>Sacola de compras</h1>
        <ProductContainer>
          {cartProduct.map((product) => {
            return (
            <Product key={product.id}>
              <ImageContainer>
                <Image layout='fill'objectFit='contain' src={product.imageUrl} alt="" />  
              </ImageContainer>
              <ProductDetails>
                <div>
                  <h2>{product.name}</h2>
                  <strong>{product.price}</strong>
                </div>
                  <button onClick={() => handleRemoveProductInCart(product.id)}>Remover</button>
              </ProductDetails>
            </Product>
            )
          })}
        </ProductContainer>
        <ProductCheckoutContainer>
          <ProductQuantity>
            Quantidade
            <span>{cartProduct.length} Itens</span>
          </ProductQuantity>
          <ProductPrice>
            Valor Total
            <strong>{totalPriceFormat}</strong>
          </ProductPrice>
          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Finalizar Compra</button>
        </ProductCheckoutContainer>
      </Content>
    </Dialog.Portal>
  );
}
