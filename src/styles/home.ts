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
  margin-top: 2rem;
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
