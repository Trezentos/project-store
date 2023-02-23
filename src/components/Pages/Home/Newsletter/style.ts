import Image from 'next/image'
import styled from 'styled-components'

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 25rem;

    input {
      margin-top: 2rem;
      padding: 1rem 1rem;
      width: 100%;
      border: none;
      border-radius: 5px;
    }

    button {
      padding: 1rem 2rem;
      border: 1px solid ${(props) => props.theme.white};
      border-radius: 5px;
      width: 120px;
      background-color: transparent;
      color: white;
      font-weight: 700;
      transition: 0.2s;

      &:hover {
        color: black;
        background-color: ${(props) => props.theme.white};
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    h1 {
      width: 90%;
      line-height: 2.5rem;
    }

    form {
      width: 100%;

      input {
      }
    }
  }
`
