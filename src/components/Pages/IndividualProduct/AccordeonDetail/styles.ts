import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  transition: 0.5s max-height ease-out;
  padding-top: 10px;
  padding-bottom: 30px;
  max-height: fit-content;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme['gray-200']};
  border-top: 1px solid ${(props) => props.theme['gray-200']};

  button {
    font-weight: 400;
    height: 100%;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    background-color: transparent;
    padding-left: 1rem;
  }

  p {
    margin-top: 0.6rem;
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
    padding-left: 1rem;
  }
`
