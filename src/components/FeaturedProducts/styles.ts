import styled from 'styled-components'

export const Container = styled.div`
  margin: 6rem 0;
  padding: 0 5rem;
  text-align: center;
  position: relative;

  svg {
    fill: black;
    width: 30px;
    height: 60px;

    color: rgba(0, 0, 0, 0.7);

    &:hover {
      color: black;
    }
  }

  .arrow--left {
    left: -30px;
  }

  .arrow--right {
    left: auto;
    right: -25px;
  }

  h2 {
    margin-bottom: 2rem;
  }

  @media (max-width: 1200px) {
    padding: 0 2rem;
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
    height: 500px;
    max-height: 70vh;
  }

  .number-slide1 {
    background: rgb(64, 175, 255);
    background: linear-gradient(
      128deg,
      rgba(64, 175, 255, 1) 0%,
      rgba(63, 97, 255, 1) 100%
    );
  }

  .number-slide2 {
    background: rgb(255, 75, 64);
    background: linear-gradient(
      128deg,
      rgba(255, 154, 63, 1) 0%,
      rgba(255, 75, 64, 1) 100%
    );
  }

  .number-slide3 {
    background: rgb(182, 255, 64);
    background: linear-gradient(
      128deg,
      rgba(182, 255, 64, 1) 0%,
      rgba(63, 255, 71, 1) 100%
    );
    background: linear-gradient(
      128deg,
      rgba(189, 255, 83, 1) 0%,
      rgba(43, 250, 82, 1) 100%
    );
  }

  .number-slide4 {
    background: rgb(64, 255, 242);
    background: linear-gradient(
      128deg,
      rgba(64, 255, 242, 1) 0%,
      rgba(63, 188, 255, 1) 100%
    );
  }

  .number-slide5 {
    background: rgb(255, 64, 156);
    background: linear-gradient(
      128deg,
      rgba(255, 64, 156, 1) 0%,
      rgba(255, 63, 63, 1) 100%
    );
  }

  .number-slide6 {
    background: rgb(64, 76, 255);
    background: linear-gradient(
      128deg,
      rgba(64, 76, 255, 1) 0%,
      rgba(174, 63, 255, 1) 100%
    );
  }
`

export const CarrouselWrapper = styled.div`
  position: relative;
`
