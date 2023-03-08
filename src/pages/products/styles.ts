import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Banner = styled.div`
  max-width: 100vw;

  img {
    object-fit: contain;
    position: relative !important;
  }
`

export const Breadcrumb = styled.div`
  display: flex;
  padding-left: 0.8rem;
  padding: 0.4rem 0.8rem;

  p,
  a {
    display: inline;
    margin-right: 0.5rem;
    font-size: 0.7rem;
    color: gray;

    &:not(&:last-child):after {
      content: '/';
      margin-left: 0.5rem;
    }
  }
`

export const FilterLayout = styled.div`
  width: 100%;
  margin-top: 1rem;
`

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 80px;
  background-color: ${(props) => props.theme.white};
  z-index: 999;

  div {
    border: 1px solid ${(props) => props.theme['gray-200']};
  }

  div:nth-child(1) {
    width: 16%;

    button {
      border: none;
      width: 100%;
      text-align: left;
      padding-left: 1.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      display: flex;
      align-items: center;
      transition: 0.3s;
      background-color: transparent;

      svg {
        margin-right: 0.4rem;
      }

      &:hover {
        color: ${(props) => props.theme['pink-400']};
      }
    }

    @media (max-width: 768px) {
      width: 40%;
    }
  }

  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    border-right: none;
    border-left: none;

    p {
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      p {
        display: none;
      }
    }
  }

  div:nth-child(3) {
    width: 15%;

    select {
      width: 100%;
      height: 100%;
      border: none;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: ${(props) => props.theme['pink-400']};

        option {
          color: black;
        }
      }
    }

    @media (max-width: 768px) {
      width: 40%;
    }
  }
`

export const BodyContent = styled.div`
  width: 100%;
  display: flex;
`

export const AsideFilterContainer = styled.div`
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: sticky;
  top: 120px;
  height: fit-content;
  width: 0;

  &.open {
    width: 18%;
    max-width: 275px;
  }

  @media (max-width: 768px) {
    overflow: visible;
    position: fixed;
    height: 100%;
    top: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: hidden;
    right: -50px;

    &.open {
      visibility: visible;
      background-color: white;
      width: 45% !important;
      right: 0;
    }
  }
`

export const AsideFilterContainerBGMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 55%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: black;
    z-index: 99999;
    opacity: 0;
    transition: 0.3s;
    visibility: hidden;

    &.active {
      opacity: 0.5;
      visibility: visible;
    }
  }
`

export const ProductsContainer = styled.div`
  flex: 1;

  div {
    width: 200px;
    background-color: red;
    height: 200px;
    margin: 1rem;
  }
`
