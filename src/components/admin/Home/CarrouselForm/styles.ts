import styled from 'styled-components'

export const Container = styled.div`
  background-color: #f3f4fd;
  border-radius: 10px;
  padding: 1rem;
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;

    svg {
      cursor: pointer;
    }
  }

  &.hide {
    opacity: 0.5;
    transition: 0.3s;
  }
`
