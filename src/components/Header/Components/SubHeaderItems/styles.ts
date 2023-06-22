import styled from 'styled-components'

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

export const SubULNavigation = styled.ul`
  li {
    text-align: left;
    list-style: none;
    margin-bottom: 0.8rem;

    a {
      font-weight: 400;
      transition: 0.3s;
      font-size: 0.8rem;
      text-transform: capitalize;
      letter-spacing: 0.05rem;
      margin-top: 0.6rem;

      &:hover {
        color: ${(props) => props.theme['pink-400']};
      }

      &.highlighted-item {
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 1200px) {
    margin-top: 2rem;
    text-align: left;
    width: 100%;

    li {
      margin-bottom: 0rem;
      border-bottom: 1px solid ${(props) => props.theme['gray-100']};
      width: 100%;
      padding: 1.2rem 0;
      transition: 0.3s background-color;
      font-size: 0.8rem;

      a {
        padding-left: 1.5rem;
        font-weight: 500;
        text-transform: uppercase;

        &.highlighted-item {
          padding-left: 1rem;
          font-weight: 600;
        }
      }

      &:active {
        background-color: ${(props) => props.theme['pink-400']};
      }
    }
  }
`
