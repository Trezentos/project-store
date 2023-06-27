import styled from 'styled-components'

export const Container = styled.div`
  > button {
    position: fixed;
    bottom: 2.5rem;
    right: 4rem;
    border-radius: 50%;
    height: 3rem;
    aspect-ratio: 1/1;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #767776;
    transition: 0.2s;

    &:hover {
      bottom: 2.7rem;
    }
  }
`
