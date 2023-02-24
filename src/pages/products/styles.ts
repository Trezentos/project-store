import styled from 'styled-components'

export const Container = styled.div``

export const Banner = styled.div`
  max-width: 100vw;

  img {
    object-fit: contain;
    position: relative !important;
  }
`

export const Breadcrumb = styled.div`
  display: flex;
  padding-left: 0.8rem;
  padding: 0.4rem 0.8rem;

  p,
  a {
    display: inline;
    margin-right: 0.5rem;
    font-size: 0.7rem;
    color: gray;

    &:not(&:last-child):after {
      content: '/';
      margin-left: 0.5rem;
    }
  }
`

export const FilterLayout = styled.div`
  width: 100%;
  margin-top: 1rem;
`

export const Header = styled.header`
  display: flex;

  div {
    border: 1px solid ${(props) => props.theme['gray-200']};
  }

  div:nth-child(1) {
    width: 18%;

    button {
      border: none;
      width: 100%;
      text-align: left;
      padding-left: 1.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      display: flex;
      align-items: center;
      transition: 0.3s;
      background-color: transparent;

      svg {
        margin-right: 0.4rem;
      }

      &:hover {
        color: ${(props) => props.theme['pink-400']};
      }
    }
  }

  div:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    border-right: none;
    border-left: none;

    p {
      font-size: 0.8rem;
    }
  }

  div:nth-child(3) {
    width: 15%;

    select {
      width: 100%;
      height: 100%;
      border: none;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: ${(props) => props.theme['pink-400']};

        option {
          color: black;
        }
      }
    }
  }
`

export const BodyContent = styled.div`
  width: 100%;
  display: flex;
`
export const AsideFilter = styled.div`
  height: 500px;
  width: 18%;
  border: 1px solid black;
`
export const ProductsContainer = styled.div`
  border: 1px solid black;
  flex: 1;
`

export const AccordionAsideFilter = styled.div``

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
  }
`

export const AsideOptions = styled.div`
  padding: 0.2rem 1.4rem;
  transition: 0.5s ease;
  display: none;

  transform: scaleY(0);
  /* height: 0; */

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(29px, 1fr));
    grid-column-gap: 6%;
    grid-row-gap: 0.6rem;
    padding: 0.3rem;

    li {
      list-style: none;
      width: 30px;
      height: 30px;
    }
  }

  &.active {
    display: block;
    transform: scaleY(1);
    transform-origin: top;
  }
`

interface CircleOptionProps {
  color?: string
}

export const CircleOption = styled.div<CircleOptionProps>`
  background-color: ${(props) => props.color || 'gray'};
  width: 25px;
  height: 25px;
  border-radius: 50%;
`
