import styled from 'styled-components'

export const Container = styled.div`
  /* width: 100%; */
  overflow: hidden;

  .keen-slider {
    height: 100vh;
    width: 100vw;

    img {
      object-fit: cover;
    }
  }

  .mobile {
    display: none;
  }

  @media (max-width: 1200px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }

    .keen-slider {
      width: 100vw;
    }
  }

  [class^='number-slide'],
  [class*=' number-slide'] {
    background: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #fff;
    font-weight: 500;
    height: 90vh;
    max-height: 100vh;
    width: 100%;
  }

  .navigation-wrapper {
    position: relative;
  }

  .dots {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }

  .dot {
    border: none;
    width: 10px;
    height: 10px;
    background: #c5c5c5;
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }

  .dot:focus {
    outline: none;
  }

  .dot.active {
    background: #000;
  }

  .arrow {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #fff;
    cursor: pointer;
  }

  .arrow--left {
    left: 5px;
  }

  .arrow--right {
    left: auto;
    right: 5px;
  }

  .arrow--disabled {
    fill: rgba(255, 255, 255, 0.5);
  }
`

// interface IImageContainer {
//   mobileSrc: string
//   desktopSrc: string
// }

// export const ImageContainer = styled.div<IImageContainer>`
//   img {
//     content: url(${(props) => props.desktopSrc});
//   }
// `
