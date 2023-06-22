import styled from 'styled-components'

export const EditForm = styled.form`
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
  }
`

export const ErrorMessage = styled.p`
  color: tomato;
  text-align: left;
`
