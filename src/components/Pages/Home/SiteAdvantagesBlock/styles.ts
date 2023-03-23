import styled from 'styled-components'

export const AdvantagesContainer = styled.div`
  padding: 1rem 0;
  border-top: 1px solid gray;
  margin-bottom: 5rem;
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  justify-content: space-around;

  div {
    width: 25%;
    padding: 0.5rem 0;

    h2,
    h3 {
      text-align: center;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }

    h3 {
      font-weight: 300;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1rem;

    div {
      width: 100%;
    }
  }
`
