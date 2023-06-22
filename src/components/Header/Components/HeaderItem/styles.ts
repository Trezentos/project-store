import Link from 'next/link'
import styled from 'styled-components'

export const MobileItemButtonExpandItems = styled.button`
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
  transition: 0.3s background-color;
  text-transform: uppercase;

  &:active {
    background-color: ${(props) => props.theme['pink-400']};
  }

  svg {
    margin-left: auto;
  }

  @media (min-width: 1200px) {
    display: none;
  }
`

export const MobileLinkTo = styled(Link)`
  line-height: 50px;
  height: 50px;
  width: 100%;
  display: flex;
  text-align: left;
  padding-left: 1rem;

  @media (min-width: 1200px) {
    display: none;
  }
`

export const DesktopLink = styled(Link)`
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

  @media (max-width: 1200px) {
    line-height: 50px;
    height: 50px;
    width: 100%;
    display: flex;
    text-align: right;
    padding-left: 1rem;
    border-bottom: 1px solid ${(props) => props.theme['gray-100']};
  }
`
