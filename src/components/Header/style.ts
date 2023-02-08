import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  height: 80px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  position: relative;
`
export const MainContent = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    margin: auto 0;
  }

  button {
    background-color: transparent;
    border: none;

    @media (min-width: 1200px) {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    padding: 0 0.5rem;
  }
`

export const GeneralOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.4rem 0;
  > a {
    margin-left: auto;
    font-weight: 500;
  }

  a {
    transition: 0.3s;
    font-size: 0.8rem;

    svg {
      color: ${(props) => props.theme['black-800']};
      transition: 0.3s;
    }

    &:hover {
      color: ${(props) => props.theme['pink-400']};

      svg {
        color: ${(props) => props.theme['pink-400']};
      }
    }
  }
`

export const GeneralContent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
`
