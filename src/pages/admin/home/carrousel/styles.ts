import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  > div {
    max-width: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    > button {
      margin-top: 1rem;
      position: absolute;
      bottom: 20px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 15rem;
    input {
      margin-bottom: 1rem;
    }
  }
`
