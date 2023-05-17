import styled from 'styled-components'

export const InputForm = styled.form`
  input[type='file'] {
    color: transparent;
    background: transparent;
    border: none;
    outline: none;
    height: 0;
    opacity: 0;
    position: absolute;
    left: -99999px;
  }

  label {
    margin-bottom: 1rem;
    height: 60px;
    width: 100%;
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

  .loader {
    /* position: absolute; */
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
    opacity: 0;
    pointer-events: none;
    margin: 0 auto;
  }

  .loader.active {
    opacity: 1;
    pointer-events: auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  button {
    padding: 0.5rem 0.5rem;
    background-color: #5e5859;
    border: none;
    border-radius: 5px;
    color: #f3f4fd;
  }

  button:disabled {
    cursor: not-allowed;
  }
`
