import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: #f8f8f8;

  form {
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 1rem;
    }
  }
`
