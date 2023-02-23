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
