import styled from 'styled-components'

export const Container = styled.div`
  margin: 3rem 0;
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
`

export const CarrouselWrapper = styled.div`
  position: relative;
`
