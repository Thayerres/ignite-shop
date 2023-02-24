import { styled } from "..";
import * as Dialog from "@radix-ui/react-dialog";

export const Content = styled(Dialog.Content, {
  position: "fixed",
  top: "0",
  right: "0",
  padding: "4.5rem 3rem 3rem 3rem",
  height: "100vh",
  minWidth: "480px",
  backgroundColor: "$gray800",
  boxShadow: "-4px 0 30px rgba(0,0,0,0.8)",
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$lg",
    color: "$gray100",
    fontWeight: "bold",
  },
});

export const ProductContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  marginTop: "2rem",
  flex: "1",
});

export const Product = styled("div", {
  display: "flex",
  alignItems: "stretch",
  gap: "1.25rem",
});

export const ImageContainer = styled("div", {
  position: 'relative',
  width: "100%",
  maxWidth: "6.25rem",
  minHeight: "5.875rem",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  justifyContent: "stretch",
  flexDirection: "column",

  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "5rem",

    h2: {
      fontSize: "$md",
      color: "$gray300",
      fontWeight: "normal",
    },
  },

  strong: {
    fontSize: "$md",
    color: "$gray100",
    fontWeight: "bold",
  },

  button: {
    cursor: "pointer",
    background: "transparent",
    border: 0,
    color: "$green500",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "auto",
    maxWidth: "max-content",
  },
});

export const ProductCheckoutContainer = styled("section", {
  marginTop: "auto",

  button: {
    border: "0",
    borderRadius: "8px",
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "$white",
    cursor: "pointer",
    backgroundColor: "$green500",
    padding: "1.25rem",
    textAlign: "center",
    marginTop: "3.75rem",
    width: "100%",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});

export const ProductQuantity = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "1rem",
  color: "$gray100",

  span: {
    fontSize: "1.125rem",
    color: "$gray300",
  },
});

export const ProductPrice = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "1.125rem",
  fontWeight: "bold",
  marginTop: "0.5rem",
  color: "$gray100",

  strong: {
    fontSize: "1.5rem",
    color: "$gray100",
  },
});
