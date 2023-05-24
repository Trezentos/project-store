import styled from 'styled-components'

export const Container = styled.div`
  height: fit-content;
`

export const ContentWrapper = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;

  .product-item-slider {
    display: none;
  }

  > div {
    position: relative;
    height: 100%;
  }

  .product-item-slider.active {
    display: block;
  }

  img {
    object-fit: contain;
    /* object-fit: cover; */
    /* height: 440px !important; */
    transition: 0.2s;
  }

  video {
    transition: 0.2s;
    position: absolute;
    left: 0;
    top: 0;
    /* height: 400px; */
    opacity: 0;
    width: 100%;
    object-fit: cover;
    border: none;
  }

  img:nth-child(2) {
    opacity: 0;
  }

  &:hover {
    video {
      opacity: 1;
    }

    img:nth-child(2) {
      opacity: 1;
    }
  }

  @media (min-width: 1500px) {
    height: 650px;

    video {
      width: 100%;
      height: 600px;
      max-height: 600px;
      /* overflow: hidden; */
    }
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.3rem;

  strong {
    font-size: 0.7rem;
  }

  h5 {
    font-weight: 500;
  }

  a {
    text-align: center;
  }
`

export const Colors = styled.div`
  display: flex;
  gap: 0.3rem;
`
