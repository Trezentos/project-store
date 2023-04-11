import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  position: relative;

  h1 {
    margin: 4rem 0;
    font-weight: 300;
    /* font-size: 2.5rem; */
  }

  margin-bottom: 4rem;
`

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;

  > a {
    text-decoration: underline;
    transition: 0.2s;
    &:hover {
      color: ${(props) => props.theme['pink-400']};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const CartContent = styled.div`
  width: 60%;

  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      tr {
        th {
          border-top: 1px solid ${(props) => props.theme['gray-100']};
          border-bottom: 1px solid ${(props) => props.theme['gray-100']};
          p {
            font-weight: 500;
            color: gray;
            font-size: 0.8rem;
            text-transform: uppercase;
            padding: 0.8rem 0;
          }
        }
      }
    }

    tbody {
      td {
        padding-top: 1rem;
        vertical-align: top;
        > p {
          padding-top: 1.5rem;
        }
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;

    table {
      thead {
        tr {
          display: none;
        }
      }

      tbody {
        tr {
          display: flex;
          border-bottom: 1px solid ${(props) => props.theme['gray-200']};
          flex-direction: column;
          padding-bottom: 1rem;

          td {
            display: flex;
            justify-content: space-between;
            align-items: end;
            > div {
              margin: 0;
              justify-content: flex-end;
              border: none;
            }
            p {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
`

export const MobileHead = styled.p`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

export const Product = styled.div`
  position: relative;
  display: flex;

  button {
    all: unset;
    position: absolute;
    top: 5px;
    left: 5px;
    cursor: pointer;
  }
`

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 220px;
  padding-left: 1rem;
  padding-right: 1rem;

  h4 {
    font-weight: 500;
    font-size: 1.2rem;
  }

  p {
    font-weight: 500;
    font-size: 0.8rem;
    margin-top: 0.4rem;

    span {
      font-weight: 400;
    }
  }
`

export const QuantityControl = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme['gray-100']};
  margin-top: 1rem;
  margin: 1rem auto 0 auto;
  width: fit-content;

  button {
    all: unset;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: gray;
  }

  p {
    width: 2.5rem;
  }
`

export const BillContent = styled.div`
  width: 20rem;
  position: sticky;
  top: 120px;
  height: fit-content;

  h2 {
    font-weight: 400;
  }

  div {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    margin: 3rem 0;
  }

  > button {
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 3rem;
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
    margin: 0 auto;
    padding: 0 1rem;
  }
`
