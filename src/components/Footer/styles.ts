import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${(props) => props.theme['black-800']};
  height: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    justify-content: center;
  }
`

export const PagesLinks = styled.div`
  width: 40%;
  height: 100%;
  a,
  strong {
    color: ${(props) => props.theme.white};
  }

  strong {
    text-transform: uppercase;
    font-weight: 400;
  }

  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: 70%;
    margin-top: 2rem;

    li {
      margin-bottom: 0.4rem;
      a {
        text-transform: capitalize;
        font-weight: 200;
        font-size: 0.9rem;
        color: ${(props) => props.theme['gray-200']};
        transition: 0.2s;

        &:hover {
          color: white;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;
    text-align: center;

    strong {
    }

    ul {
      justify-content: center;
      align-items: center;
      li {
        text-align: center;

        a {
          font-size: 1rem;
        }
      }
    }
  }
`
export const NewsletterContainer = styled.div`
  margin-top: 1rem;

  h3 {
    color: ${(props) => props.theme['gray-200']};
    font-weight: 300;
  }

  button {
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`

export const OutlineContainer = styled.div`
  height: 1.5rem;
  width: 100%;
  background-color: ${(props) => props.theme['gray-800']};
  display: flex;
  align-items: center;
  padding: 0 2rem;

  a {
    color: ${(props) => props.theme['gray-200']};
    font-size: 0.6rem;
  }

  div {
    margin-left: auto;
    height: 100%;
    a {
      margin-left: 3rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      width: 100%;
      height: fit-content;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      a {
        margin-left: 0;
      }
    }
  }
`
