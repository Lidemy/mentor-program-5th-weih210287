import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.main.font};
    background: ${(props) => props.theme.main.rgba};
    background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.3) 1px,
        transparent 0
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0);
    background-size: 15px 15px, 15px 15px;
  }
`;

export default GlobalStyle;
