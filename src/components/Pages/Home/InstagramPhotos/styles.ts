import styled from 'styled-components'

export const InstagramContainer = styled.div`
  padding: 5rem 0;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
    user-select: none;
    font-weight: 400;
  }
`
export const CarrouselWrapper = styled.div`
  &:hover {
    .arrow-insta-container {
      opacity: 0.7;
    }
  }
  position: relative;
`

export const ArrowContainer = styled.div`
  height: 100%;
  width: 5%;
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;

  svg {
    height: 60px;
    color: black;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
  }
`
export const ImageContainer = styled.div`
  height: 240px;
  cursor: pointer;
  position: relative !important;

  &:after {
    width: 100%;
    height: 100%;
    content: '';
    background-color: black;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: 0.2s;
    left: 0;
  }

  &:hover {
    &:after {
      opacity: 0.7;
    }

    svg {
      opacity: 1;
    }
  }

  svg {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    opacity: 0;
    color: white;
    z-index: 4;
    transition: 0.3s;
  }
`
