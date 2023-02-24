import { styled } from "..";

export const Container = styled('header', {
  display: 'flex',
  justifyContent: "space-between",
  alignItems: "center",
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  button: {
    position: 'relative',
    padding: '0.75rem',
    backgroundColor: "$gray800",
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    
    svg: {
      color: '#8D8D99',
    },

    span: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 'calc(-0.75rem)',
      right: 'calc(-0.75rem)',
      borderRadius: '50%',
      height: '1.5rem',
      width: '1.5rem',
      backgroundColor: "$green500",
      color: "$white",
      outline: '3px solid $gray900',
      fontSize: '0.875rem',
    }
  }
})