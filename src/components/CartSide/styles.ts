import styled, { css } from 'styled-components'

interface OverlayProps {
  showOverlay: boolean
}

export const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  left: 0;
  top: 0;
  visibility: hidden;
  display: flex;
  transition: 0.3s;

  ${(props) =>
    !!props.showOverlay &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      visibility: visible;
    `}
`

interface CartProps {
  openCart: boolean
}

export const Cart = styled.div<CartProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  position: relative;

  width: 380px;
  height: 100%;
  background-color: white;
  position: fixed;
  right: -500px;
  top: 0;
  z-index: 99999;
  transition: 0.2s;
  padding: 1.5rem 2.5rem;
  ${(props) =>
    !!props.openCart &&
    css`
      right: 0;
    `}

  > button {
    margin-right: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 0.5rem;

  h2 {
    font-weight: 400;
  }

  button {
    all: unset;
    cursor: pointer;
    margin-left: 100%;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`

export const ProductsContent = styled.div`
  flex: 1;
  overflow-y: scroll;
  text-align: center;

  > h3 {
    margin-top: 2rem;
    font-weight: 300;
  }
`

export const Footer = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
    margin-top: 0.2rem;
  }

  > button {
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 3rem;
    background-color: black;
    text-transform: uppercase;
    border: none;
    color: white;
    transition: 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`
