import styled from 'styled-components'

interface IDot {
  dotColor: string
}

export const Dot = styled.div<IDot>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  /* border: 1px solid black; */
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  transition: 0.3s;

  &:after {
    content: '';
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 80%;
    border: 1px solid gray;
    height: 80%;
    background-color: ${(props) => props.dotColor};
    border-radius: 50%;
  }

  &.active {
    border: 1px solid black;
  }
`

export const Colors = styled.div`
  display: flex;
  gap: 0.3rem;
`
