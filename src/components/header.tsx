import * as Dialog from '@radix-ui/react-dialog'
import logoImg from "../assets/logo.svg"
import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { Container } from '../styles/components/header'
import ModalCart from './modalCart'
import Link from 'next/link'
import { useCart } from '../hooks/useCart'


export default function Header() {
  const { cartProduct } = useCart()
  return (
    <Container>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild disabled={cartProduct.length === 0}>
          <button>
            <Handbag weight="bold" size={24} />
            {cartProduct && cartProduct.length > 0 ? (<span>{cartProduct.length}</span>): null}
          </button>
        </Dialog.Trigger>
        <ModalCart />
      </Dialog.Root>
      </Container>
  )
}