import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  background-color: #f8f8f8;

  thead {
    tr {
      th {
        padding: 2px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        color: #767776;
      }

      td {
      }
    }
  }

  tbody {
    tr {
      background-color: #f8f8f8;

      td {
        transition: padding 0.2s;
        padding: 35px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        background-color: white;
        overflow: unset;
        background-color: #f8f8f8;
      }

      td:last-child {
        padding: 10px;

        button {
          border-radius: 50%;
          height: 3rem;
          aspect-ratio: 1/1;
          width: 3rem;
          border: 1px solid #767776;
          transition: 0.2s;
        }
      }
    }
  }
`

export const StyledSubTableRow = styled.tr`
  td {
    max-width: 120px;
  }
`

export const TDImages = styled.td`
  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2rem;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;
    }
  }
`
