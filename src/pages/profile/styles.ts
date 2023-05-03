import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3.5rem;

  h1 {
    margin-bottom: 4rem;
    font-weight: 300;
  }
`

export const TabNavigation = styled.div`
  height: 6rem;
  border-top: 1px solid ${(props) => props.theme['gray-200']};
  border-bottom: 1px solid ${(props) => props.theme['gray-200']};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    all: unset;
    border-bottom: 2px solid black;
    padding: 1rem 2rem;
    font-size: 1rem;
    color: ${(props) => props.theme['gray-800']};
    color: gray;
    font-weight: 500;
    margin-right: 1rem;
    cursor: pointer;
  }
`

export const Content = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  padding: 4rem 10rem;

  h4 {
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`
