import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  header {
    width: 100%;
    height: 10rem;
    padding-top: 3.5rem;
    text-align: center;
    vertical-align: center;
    background-color: white;

    h1 {
      font-weight: 300;
    }
  }

  div {
    width: 100%;
    background-color: #f4f5f4;
    border-top: ${(props) => props.theme['gray-200']} 1px solid;
    display: flex;
    justify-content: center;
    height: 25rem;

    form {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 45%;

      label {
        margin-bottom: 1rem;

        h1 {
          font-weight: 400;
          font-size: 1.2rem;
          margin-bottom: 0.2rem;
        }

        input {
          width: 100%;
          padding: 1rem;
          border: ${(props) => props.theme['gray-100']} 1px solid;
        }

        label {
          color: #b46060;
        }
      }

      > button {
        margin-top: 0.2rem;
        margin-bottom: 0.4rem;
        width: 100%;
        height: 3rem;
        background-color: black;
        text-transform: uppercase;
        border: none;
        color: white;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      @media (max-width: 768px) {
        padding: 1rem;
        width: 100%;
      }
    }
  }
`
