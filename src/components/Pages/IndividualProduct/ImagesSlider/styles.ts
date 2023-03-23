import styled from 'styled-components'

export const ImagesDemo = styled.div`
  display: flex;
  width: 55% !important;
  overflow: hidden;
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    width: 100% !important;
  }
`

export const ImageContainer = styled.div`
  height: 80vh;

  img {
    object-fit: cover !important;
    object-fit: contain !important;
  }
`

export const ArrowContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s;
  cursor: pointer;
  z-index: 88;

  svg {
    height: 60px;
    color: black;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    z-index: 99;

    &.arrow--right {
      right: 20px;
    }
    &.arrow--left {
      left: -20px;
    }
  }
`
