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
      height: 80px;
      line-height: 80px;
      padding: 0 0.3rem;
      transition: 0.3s color, 0.3s border-bottom, 0.3s background-color;
      font-weight: 500;
      border-bottom: 3px transparent solid;
      outline: none;
      &.desktop {
        display: none;
      }

      @media (min-width: 1200px) {
        display: inline-block !important;

        &:hover {
          border-bottom: 3px ${(props) => props.theme['black-800']} solid;
          color: ${(props) => props.theme['pink-400']};
        }
      }

      &:active {
        background-color: ${(props) => props.theme['pink-400']};
      }
    }

    > button {
      margin-left: auto;
      display: flex;
      align-items: center;
      width: 100%;
      outline: none;
      height: 50px;
      border: none;
      font-size: 0.9rem;
      transition: 0.3s;
      padding-left: 1rem;
      font-family: 'Montserrat';
      font-weight: 500;
      border-bottom: 1px solid ${(props) => props.theme['gray-100']};
      transition: 0.3s background-color;

      &:active {
        background-color: ${(props) => props.theme['pink-400']};
      }

      svg {
        margin-left: auto;
      }

      @media (min-width: 1200px) {
        display: none;
      }
    }

    @media (min-width: 1200px) {
      &:hover {
        > div {
          display: flex;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    position: absolute;
    background-color: ${(props) => props.theme.white};
    flex-direction: column;
    width: 100%;
    z-index: 99999;
    height: 110vh;
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
        border-bottom: 1px solid ${(props) => props.theme['gray-100']};
      }
    }
  }

  @media (min-width: 1200px) {
    // @ts-ignore
    li:has(div:hover) {
      > a {
        border-bottom: 3px ${(props) => props.theme['black-800']} solid;
        color: ${(props) => props.theme['pink-400']};
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
    display: none !important;
  }
`

export const SubUlsNavigationsContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 4rem;
  background-color: ${(props) => props.theme.white};
  align-items: flex-start;
  display: none;
  padding: 2rem 0;
  border-bottom: 1px solid black;
  z-index: 9999;

  @media (max-width: 1200px) {
    overflow-y: scroll;
    height: 100%;
    top: 0;
    left: 100%;
    transition: 0.2s;
    right: 50px;
    flex-direction: column;
    gap: 0;
    display: flex; // simula o active
    justify-content: flex-start;
    padding: 0.5rem 0;
    text-align: center;

    h2 {
      font-weight: 400;
    }

    button {
      display: flex;
      align-items: center;
    }
    /* gap: 2rem; */

    &.active {
      display: flex;
      left: 0%;
    }
  }
`

export const SubULNavigation = styled.ul`
  li {
    list-style: none;
    margin-top: 0.8rem;

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
    margin-top: 2rem;
    text-align: left;
    width: 100%;

    li {
      border-bottom: 1px solid ${(props) => props.theme['gray-100']};
      width: 100%;
      font-size: 0.9rem;
      padding: 1.2rem 0;
      transition: 0.3s background-color;

      a {
        padding-left: 1.5rem;
        font-size: 1rem;
        font-weight: 500;
      }

      &:first-child {
        a {
          padding-left: 1rem;
        }
      }

      &:active {
        background-color: ${(props) => props.theme['pink-400']};
      }
    }
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
export const SubMobileOptions = styled.div`
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;

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
      display: flex;
      width: 100%;
    }
  }
  display: none;
`
