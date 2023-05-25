import styled from 'styled-components'

export const Container = styled.div`
  input[type='file'] {
    color: transparent;
    background: transparent;
    border: none;
    outline: none;
    height: 0;
    opacity: 0;
    position: absolute;
    top: -99999px;
  }

  label {
    margin-bottom: 8px;
    height: 60px;
    width: 240px;
    border: 1px solid #d8d8d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    padding: 0 0.5rem;
    color: #b2b2b2;
    svg {
      color: #d8d8d8;
    }

    input {
      width: inherit;
      cursor: pointer;
      /* margin: 0 auto; */
    }

    &.file-selected {
      color: #5e5859;
      border: 2px solid #5e5859;
      font-weight: 500;
    }
  }
`
