import styled from 'styled-components'

export const ULNavigation = styled.ul`
  display: flex;
  gap: 2.6rem;
  justify-content: center;
  align-items: center;

  > li {
    list-style: none;
    font-weight: 500;
    font-size: 0.9rem;

    > a {
      display: inline-block;
      height: 80px;
      padding: 0 0.3rem;
      line-height: 80px;
      transition: 0.3s color, 0.3s border-bottom;
      font-weight: 500;
      border-bottom: 3px transparent solid;

      &:hover {
        border-bottom: 3px ${(props) => props.theme['black-800']} solid;
        color: ${(props) => props.theme['pink-400']};
      }
    }

    &:hover {
      div {
        display: flex;
      }
    }
  }
`
export const ImageContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  p {
    margin-top: 0.4rem;
    font-weight: 200;
  }
`

export const SubUlsNavigationsContainer = styled.div`
  position: absolute;
  left: 0px;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 4rem;
  background-color: ${(props) => props.theme.white};
  align-items: flex-start;
  display: none;
  padding: 2rem 0;
  border-bottom: 1px solid black;
`

export const SubULNavigation = styled.ul`
  li {
    list-style: none;
    margin-bottom: 0.6rem;

    a {
      font-weight: 400;
      transition: 0.3s;

      &:hover {
        color: ${(props) => props.theme['pink-400']};
      }
    }

    &:first-child {
      a {
        font-weight: 500;
      }
    }
  }
`
