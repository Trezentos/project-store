import styled from 'styled-components'

interface ULNavigationProps {
  mobileHeaderActive: boolean
}

export const ULNavigation = styled.ul<ULNavigationProps>`
  display: flex;
  gap: 2.6rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;

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

  @media (max-width: 1200px) {
    position: absolute;
    background-color: white;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    transition: 0.3s;
    right: ${(props) => (props.mobileHeaderActive ? '0%' : '100%')};

    gap: 0;
    top: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    > img {
      margin: 0 auto;
    }

    > li {
      width: 100%;

      > a {
        line-height: 50px;
        height: 50px;
        width: 100%;
        display: flex;
        text-align: right;
        padding-left: 1rem;
        border-bottom: 1px solid #eeeeee;
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

  @media (max-width: 1200px) {
    display: none;
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

  @media (max-width: 1200px) {
    height: 100%;
    top: 0;
    flex-direction: column;
    gap: 0;
  }
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

  @media (max-width: 1200px) {
  }
`

export const MobileContent = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;

    svg {
      margin: 5px;
    }

    img {
      margin: 0 auto;
    }

    button {
      margin-right: auto;
      background-color: transparent;
      border: none;
    }
  }
`
