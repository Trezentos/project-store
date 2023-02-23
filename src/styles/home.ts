import Image from 'next/image'
import styled from 'styled-components'

export const HomeContanier = styled.div`
  width: 100%;
`

export const HighlightsProducts = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 6rem;
  padding: 0 5rem;

  div {
    position: relative;
    flex: 1;

    img {
      object-fit: contain;
      position: relative !important;
    }

    button {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.white};
      padding: 1rem 4rem;
      text-transform: uppercase;
      color: white;
      transition: 0.4s;
      font-weight: 600;

      &:hover {
        background-color: white;
        color: ${(props) => props.theme['black-800']};
      }
    }
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 0 2rem;

    div {
      margin-bottom: 20px;
      width: 100%;
      margin-bottom: 20px;
      /* flex: 1; */

      /* height: 100vh; */
      button {
        display: none;
      }
    }

    img {
      object-fit: contain !important;
      /* object-fit: cover !important; */
      position: relative !important;
      height: auto !important;
      width: 100%;
    }
  }

  @media (min-width: 751px) and (max-width: 1200px) {
  }
`

export const HighlightImage = styled.div`
  position: relative;
  img {
    /* position: relative !important; */
    height: calc(100vh - 80px) !important;
    object-fit: cover;
    object-position: top;
    position: relative !important;

    &.mobile {
      display: none;
    }
  }

  @media (max-width: 768px) {
    img {
      &.mobile {
        display: block !important;
      }

      &.desktop {
        display: none !important;
      }
    }
  }
`
export const InstagramContainer = styled.div`
  /* position: relative; */
  height: 300px;
  width: 100%;
  display: block;

  img {
    position: relative;
  }
`

export const AdvantagesContainer = styled.div`
  padding: 1rem 0;
  border-top: 1px solid gray;
  margin-bottom: 5rem;
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  justify-content: space-around;

  div {
    width: 25%;
    padding: 0.5rem 0;

    h2,
    h3 {
      text-align: center;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }

    h3 {
      font-weight: 300;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1rem;

    div {
      width: 100%;
    }
  }
`
export const NewsletterContainer = styled.div`
  background-color: ${(props) => props.theme['pink-400']};
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width: 60%;
    text-align: center;
    margin: 0 auto;
    line-height: 2.5rem;
    letter-spacing: 0.1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    h1 {
      width: 90%;
    }
  }
`
