import styled from 'styled-components'

export const ImageTooltip = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;

  strong {
    cursor: pointer;
  }

  & > img {
    width: 100%;
    /* height: auto; */
  }

  & > .tooltip {
    visibility: hidden;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
    background-color: gray;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;

    > img {
      object-fit: contain !important;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: gray transparent transparent transparent;
    }
  }

  &:hover > .tooltip {
    visibility: visible;
  }
`
