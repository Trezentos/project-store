import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem 2rem;
  background-color: #f3f4fd;
  border-radius: 10px;
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 1rem;

    h4 {
      font-weight: 400;
      margin-right: 1rem;
    }

    svg {
      cursor: pointer;
    }
  }

  > div {
    margin-bottom: 1rem;
  }
`
