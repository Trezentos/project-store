import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 20px;
  > div {
    width: 700px;

    img {
      /* width: 60% !important; */
      position: relative !important;
      object-fit: contain;
      user-select: none;
    }

    @media (max-width: 768px) {
      img {
        width: 100% !important;
        object-fit: contain;
        margin: 0 auto;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px !important;

    > div {
      width: 100%;
      height: 500px;
      overflow: hidden;
      /* padding-top: 1rem; */

      img {
        object-fit: cover;
      }
    }
  }
`

export const ModalContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    padding-top: 0.4rem;
  }
`

export const BodyContent = styled.div`
  padding: 1rem;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  h3,
  h4 {
    font-weight: 400;
    user-select: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;

    h4 {
      margin-top: 0.5rem;
    }
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;

    &:active {
      outline: none;
    }

    polyline {
      stroke-width: 6;
    }

    line {
      stroke-width: 6;
    }
  }

  @media (max-width: 768px) {
    > div {
      margin-left: auto;
    }
  }

  @media (min-width: 1024px) {
    transition: 200ms;

    &:hover {
      color: gray;
    }
  }
`
