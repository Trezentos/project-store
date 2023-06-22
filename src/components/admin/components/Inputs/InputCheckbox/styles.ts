import styled from 'styled-components'

export const Container = styled.div`
  p {
    margin-bottom: 0.4rem;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    max-height: 70px;
  }

  label {
    input {
      color: lightgray;
      margin-right: 0.2rem;
      border: 1px solid lightgray;
    }
  }
`
