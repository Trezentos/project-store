import styled from 'styled-components'

export const AddFormContainer = styled.form`
  /* height: 220px; */
  justify-content: space-between;

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
export const ErrorMessage = styled.div`
  p {
    /* margin-top: 0.2rem; */
    margin-bottom: 1rem;
    color: #f45050;
    font-size: 0.9rem;
  }
`
