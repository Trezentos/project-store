import styled from 'styled-components'

export const AddForm = styled.form`
  h3 {
    margin-bottom: 1rem;
  }
  text-align: center;

  > div {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5rem;
    max-width: 280px;
    p {
      margin-bottom: 0.5rem;
    }
  }

  .invisible {
    display: none;
  }
`

export const ErrorMessage = styled.p`
  color: tomato;
  text-align: left;
`
