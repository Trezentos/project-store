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
    text-transform: uppercase;
    border-bottom: 1px solid ${(props) => props.theme['gray-100']};

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
    height: calc(100vh + 20px);

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
        /* line-height: 50px;
        height: 50px;
        width: 100%;
        display: flex;
        text-align: right;
        padding-left: 1rem;
        border-bottom: 1px solid ${(props) => props.theme['gray-100']}; */
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

export const SubUlsNavigationsContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  background-color: ${(props) => props.theme.white};
  display: none;
  padding: 2rem 0;
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

export const HeaderMobile = styled.div`
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
