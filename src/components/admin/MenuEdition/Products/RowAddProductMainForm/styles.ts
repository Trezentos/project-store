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
    justify-content: space-between;
    flex-direction: column;
    gap: 1.5rem;

    width: 240px;
    flex-wrap: wrap;
    p {
      margin-bottom: 0.5rem;
    }
  }

  .invisible {
    display: none;
  }
`

export const SelectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  gap: 0.2rem;
`

export const ErrorMessage = styled.p`
  color: tomato;
  text-align: left;
  width: 180px;
`
