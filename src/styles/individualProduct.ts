import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 0 1rem;
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

export const MainContent = styled.main`
  display: flex;
  height: 100%;
  align-items: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const ImagesDemo = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const ProductProperties = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.6rem;
  width: 30%;
  margin-left: 4rem;

  > h2 {
    font-weight: 400;
  }

  > h5 {
    font-weight: 400;
    font-size: 1rem;
  }

  > a {
    font-size: 0.8rem;
    text-decoration: underline;
  }

  > button {
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 3.5rem;
    background-color: black;
    text-transform: uppercase;
    border: none;
    color: white;
    transition: 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0rem;
    margin-top: 2rem;
  }
`

export const AccordeonBorders = styled.div``
