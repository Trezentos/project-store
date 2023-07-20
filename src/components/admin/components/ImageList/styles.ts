import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;

    strong {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        cursor: pointer;
      }
    }
  }
`

export const InputFileContainer = styled.div`
  position: relative;
  input {
    position: absolute;
    right: 99999px;
    opacity: 0;
  }

  label {
    strong {
      font-weight: 500;
    }
  }

  p {
    all: unset !important;
    margin: 10px 0 !important;
    margin-bottom: 5px !important;
  }

  svg {
    cursor: pointer;
  }
`
