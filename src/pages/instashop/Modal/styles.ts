import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;

  img {
    width: 60% !important;
    position: relative !important;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img {
      width: 100% !important;
      object-fit: contain;
      margin: 0 auto;
    }
  }
`

export const ModalContent = styled.div`
  flex: 1;
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
  }

  @media (max-width: 768px) {
    > div {
      margin-left: auto;
    }
  }
`
