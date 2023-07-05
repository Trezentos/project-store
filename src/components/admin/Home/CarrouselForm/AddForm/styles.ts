import styled from 'styled-components'

export const AddFormContainer = styled.form`
  justify-content: space-between;

  button {
    padding: 0.5rem 0.5rem;
    background-color: #5e5859;
    border: none;
    border-radius: 5px;
    color: #f3f4fd;
  }

  button:disabled {
    cursor: not-allowed;
  }
`
export const ErrorMessage = styled.div`
  p {
    margin-bottom: 1rem;
    color: #f45050;
    font-size: 0.9rem;
  }
`
