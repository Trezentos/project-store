import Link from 'next/link'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid ${(props) => props.theme['gray-100']};

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0.5rem;
    flex: 1;
  }

  > button {
    all: unset;
    position: absolute;
    top: 1rem;
    left: 0.2rem;
    cursor: pointer;
  }
`

export const ProductDetail = styled.div`
  h4 {
    font-weight: 400;
  }

  p {
    font-weight: 300;
    font-size: 0.8rem;
    margin-top: 0.3rem;

    span {
      font-weight: 200;
    }
  }
`
export const ProductAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    justify-content: space-between;
    width: 4.5rem;
    height: 2rem;
    align-items: center;

    p {
      font-size: 0.9rem;
    }

    button {
      all: unset;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  p {
    font-size: 0.9rem;
  }
`

export const EditButton = styled(Link)`
  all: unset;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.6rem;
`
