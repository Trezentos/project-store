import styled from 'styled-components'

interface SelectedFiltersProps {
  theresContent: boolean
}

export const Container = styled.div<SelectedFiltersProps>`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-200']};
  display: ${(props) => (props.theresContent ? 'block' : 'none')};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-weight: 400;
    }

    small {
      font-size: 0.7rem;
      text-decoration: underline;
      z-index: 99;
      margin-right: 0.2rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.4rem;

  button {
    margin: 0.2rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme['gray-100']};
    border: none;

    svg {
      margin-left: 0.4rem;
    }
  }
`
