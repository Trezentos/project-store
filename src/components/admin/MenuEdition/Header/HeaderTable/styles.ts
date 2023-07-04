import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  border: 1px solid lightgray;
  width: 70%;
  height: calc(100% - 270px);
  overflow-y: scroll;
  border-radius: 10px;
  margin-top: 270px;
  position: relative;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  > thead {
    background-color: #f8f8f8;

    tr {
      th {
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        color: #767776;
      }
    }
  }
  > tbody {
    > tr {
      > td {
        transition: padding 0.2s;
        padding: 35px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        background-color: white;
        overflow: hidden;
        background-color: white;

        strong {
          cursor: pointer;
        }

        ul {
          padding: 1rem;
          li {
            list-style: none;
          }
        }

        svg {
          cursor: pointer;
          width: 20px;
          height: 20px;
        }

        > div {
          width: 100%;
          padding-left: 2rem;
          background-color: #f8f8f8;
        }
      }
    }
  }
`

export const SuspendedImage = styled(Image)`
  object-fit: contain !important;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
`
