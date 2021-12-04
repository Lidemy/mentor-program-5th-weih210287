import { createGlobalStyle } from "styled-components";
import {
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_XS,
} from "./breakpoints.js";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    --wrapper-size: 1700px;
    --board-size: 1000px;
    --square-size: 50px;
    --game-info-block-size: 250px;
    --square-content-size: calc(var(--square-size) * 0.8);
    --square-footer-size: calc(var(--square-size) * 0.3);
    --black-text-color: #404040;
    --black-piece: #475251;
    --white-piece: #bbd7d4;
    --piece-shadow: 1px 1px 4px #4752518c;
  }

  body {
    text-align: center;
    background: #fffdec;;
  }

  ol {
    padding-left: 1em;
  }

  footer {
    padding: 10px 0;
    font-weight: bold;
    font-size: var(--square-footer-size);
    color: #73a5a1;
    background: #5f8985;
    box-shadow: 0px -3px 3px 0px rgb(56 56 56 / 24%);
  }

  ${MEDIA_QUERY_MD} {
    :root {
      --board-size: 810px;
      --square-size: 40px;
    }
  }

  ${MEDIA_QUERY_SM} {
    :root {
      --board-size: 620px;
      --square-size: 30px;
      --game-info-block-size: 200px;
    }
  }

  ${MEDIA_QUERY_XS} {
    :root {
      --board-size: 430px;
      --square-size: 20px;
      --game-info-block-size: 100px;
    }
  }
`;

export default GlobalStyle;
