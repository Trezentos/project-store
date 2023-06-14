import styled from 'styled-components'

export const AddForm = styled.form`
  h3 {
    margin-bottom: 1rem;
  }
  text-align: center;

  > div {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5rem;

    button {
      padding: 1rem 1rem;
      font-size: 1rem;
      border: none;
      background-color: lightgray;
      /* color: white; */
    }
  }

  p {
  }
`

export const ErrorMessage = styled.p`
  color: tomato;
  text-align: left;
`
