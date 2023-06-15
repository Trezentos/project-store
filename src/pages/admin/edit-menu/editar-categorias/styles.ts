import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;

  > div {
    border: 1px solid lightgray;
    width: 70%;
    height: calc(100% - 270px);
    overflow-y: scroll;
    border-radius: 10px;
    margin-top: 270px;
    position: relative;
  }
`
