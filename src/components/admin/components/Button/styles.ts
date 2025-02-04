import styled from 'styled-components'

export const ButtonContainer = styled.button`
  padding: 1rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: lightgray;
  /* color: white; */

  // button loading animation
  .loader {
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
`
