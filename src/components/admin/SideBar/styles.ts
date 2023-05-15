import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`
export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 18%;
  border-right: 2px solid #e6e4e9;
  align-items: center;
  align-items: flex-start;
  padding: 2rem;

  img {
    position: relative !important;
    width: 100px;
    height: fit-content !important;
    object-fit: contain;
  }
`

export const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 3rem;
  width: 100%;

  h4 {
    color: #767776;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  button {
    font-family: 'Montserrat';
    cursor: pointer;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    font-size: 0.9rem;
    width: 100%;
    background-color: transparent;
    transition: 0.5s;
    color: #767776;
    border-radius: 4px;
    border: none;

    &.active {
      background-color: #f3f4fd;
      color: black;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    svg {
      margin-right: 4px;
    }
  }

  ul {
    padding-left: 1rem;
    overflow: hidden;
    transition: 200ms;
    max-height: auto;
    li {
      list-style: none;
      margin-bottom: 0.4rem;
      /* background-color: #f3f4fd; */
      padding: 0.2rem;
      display: flex;

      a {
        flex: 1;
        font-size: 0.9rem;
      }
    }
  }
`

export const ConfigButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: auto;

  button {
    font-family: 'Montserrat';
    cursor: pointer;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
    width: 100%;
    background-color: transparent;
    transition: 0.5s;
    color: #767776;

    &.active {
      background-color: #f3f4fd;
      color: black;
    }

    border-radius: 4px;
    border: none;

    svg {
      margin-right: 4px;
    }
  }
`
