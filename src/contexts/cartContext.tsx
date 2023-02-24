import { createContext, ReactNode, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  amount: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextType {
  cartProduct: IProduct[];
  addProductInCart: (product: IProduct) => void;
  removeProductInCart: (id:string) => void
}

export const CartContext = createContext({} as CartContextType);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartProduct, setCartProduct] = useState<IProduct[]>([]);

  function addProductInCart(product: IProduct) {
    setCartProduct((state) => [...state, product]);
  }

  function removeProductInCart(id: string) {
    const newProductCart = cartProduct.filter((product) => product.id !== id)

    setCartProduct((state) => [...newProductCart]);
  }

  return (
    <CartContext.Provider value={{ cartProduct, addProductInCart,removeProductInCart }}>
      {children}
    </CartContext.Provider>
  );
}
