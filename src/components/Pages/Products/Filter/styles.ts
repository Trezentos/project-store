import styled from 'styled-components'

export const AsideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid black; */

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    border: none;
    background-color: transparent;
    padding: 1rem 1.2rem;
    text-transform: uppercase;

    h3 {
      font-weight: 400;
      font-size: 0.85rem;
      letter-spacing: 0.1rem;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: end;

      small {
        font-size: 0.7rem;
        text-transform: lowercase;
        text-decoration: underline;
        z-index: 99;
        letter-spacing: 0.05rem;
        margin-right: 0.2rem;
      }
    }
  }
`

export const AsideOptions = styled.div`
  padding: 0.2rem 1.4rem;
  overflow: hidden;
  max-height: 0px;
  transition: 0.3s max-height ease-out;
  border-bottom: 1px solid ${(props) => props.theme['gray-200']};

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(29px, 1fr));
    grid-column-gap: 6%;
    grid-row-gap: 0.6rem;
    padding: 0.3rem;
    padding-bottom: 1rem;

    li {
      list-style: none;
      width: 30px;
      max-height: 30px;
    }

    button {
      background-color: transparent;
      border: none;
    }

    &.prices {
      display: flex;
      flex-direction: column;

      li {
        width: 100%;

        button {
          all: unset;
          width: 100%;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            > div::after {
              content: '';
              width: 12px;
              height: 12px;
              background-color: ${(props) => props.theme['pink-400']};
              position: absolute;
              transform: translate(-50%, -50%);
              left: 50%;
              top: 50%;
              border-radius: 50%;
            }
          }

          > div {
            &.selected::after {
              content: '';
              width: 12px;
              height: 12px;
              background-color: ${(props) => props.theme['pink-400']};
              position: absolute;
              transform: translate(-50%, -50%);
              left: 50%;
              top: 50%;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  &.active {
  }
`

interface CircleOptionProps {
  color?: string
}

export const CircleColorOption = styled.div<CircleOptionProps>`
  background-color: ${(props) => props.color || 'gray'};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: relative;

  &.selected::after {
    content: '';
    border: 1px solid black;
    width: 30px;
    height: 30px;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 50%;
  }
`

export const CircleSizeOption = styled.div`
  border: 1px solid ${(props) => props.theme['gray-200']};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  small {
    font-size: 0.6rem;
    font-weight: 500;
  }

  &.selected {
    color: white;
    background-color: black;
  }

  &:hover {
    border: 1px solid black;
  }
`

export const CheckBoxButton = styled.div`
  width: 20px;
  height: 20px;
  aspect-ratio: 1/1;
  border: 1px solid black;
  border-radius: 50%;
  position: relative;
`
