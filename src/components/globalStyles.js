import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .changediv{
  background: ${({ theme }) => theme.body};
  }

  .rdtPicker{
    background: ${({ theme }) => theme.body};
    }
  .popup{
    color: #000000
  }
  .svg-line-chart-label{
    fill: ${({ theme }) => theme.text};
  }

  .tick text{
    fill: ${({ theme }) => theme.text};
  }

  `