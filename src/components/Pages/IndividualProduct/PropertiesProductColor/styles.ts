import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 0.5rem;

  h4 {
    font-weight: 400;
    font-size: 0.8rem;

    span {
      font-weight: 300;
      font-style: italic;
      text-transform: capitalize;
    }
  }
`

export const ColorsOptionsContainer = styled.div`
  width: 100%;
  flex: 1;
  height: 40px;
  display: flex;
  gap: 0.4rem;
  margin-top: 0.2rem;
`

interface ColorsOptionsContainerProps {
  color: string
}

export const ColorDiv = styled.button<ColorsOptionsContainerProps>`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  position: relative;
  outline: none;
  transition: 0.2s border;
  border: 0px solid transparent;

  &:after {
    content: '';
    position: absolute;
    width: 1.9rem;
    height: 1.9rem;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    cursor: pointer;
  }

  &.active {
    border: 1px solid ${(props) => props.theme['black-800']};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme['gray-800']};
  }
`

export const SizeDiv = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  position: relative;
  outline: none;
  background-color: white;
  transition: 0.2s border, 0.4s background-color, 0.2s color;
  border: 1px solid ${(props) => props.theme['gray-200']};
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme['gray-800']};
  }

  &.active {
    background-color: black;
    color: white;
  }
`
