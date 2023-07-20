import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;

  h1 {
    margin: 3rem 0;
    font-weight: 300;
  }
`

export const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.1rem;
  padding: 0.05rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    position: relative !important;
    cursor: pointer;
    object-fit: cover !important;
    aspect-ratio: 1/1;
  }

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
