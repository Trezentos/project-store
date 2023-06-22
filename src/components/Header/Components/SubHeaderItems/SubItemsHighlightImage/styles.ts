import styled from 'styled-components'

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
