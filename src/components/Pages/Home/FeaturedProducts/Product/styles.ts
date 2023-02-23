import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
`

export const ContentWrapper = styled.div`
  position: relative;
  height: 450px;

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
    object-fit: cover;
    /* height: 440px !important; */
    transition: 0.2s;
  }

  video {
    transition: 0.2s;
    position: absolute;
    left: 0;
    top: 0;
    height: 450px;
    opacity: 0;
    width: 100%;
    object-fit: cover;
    border: none;
  }

  &:hover {
    video {
      opacity: 1;
    }

    img:nth-child(2) {
      opacity: 0;
    }
  }

  @media (min-width: 1500px) {
    height: 530px;

    img {
    }

    video {
      height: 530px;
      width: 100%;
    }
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
`

export const Colors = styled.div`
  display: flex;
  gap: 0.3rem;
`

interface IDot {
  dotColor: string
}

export const Dot = styled.div<IDot>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  /* border: 1px solid black; */
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  transition: 0.3s;

  &:after {
    content: '';
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 80%;
    border: 1px solid gray;
    height: 80%;
    background-color: ${(props) => props.dotColor};
    border-radius: 50%;
  }

  &.active {
    border: 1px solid black;
  }
`
