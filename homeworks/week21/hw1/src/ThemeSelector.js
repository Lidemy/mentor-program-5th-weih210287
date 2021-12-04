import styled from "styled-components";
import { Button } from "./Button.js";

const SelectorWrapper = styled.div`
  padding-bottom: 10px;
  text-align: right;
`;

const Selector = styled(Button)`
  background: ${(props) => props.$color};
  width: 25px;
  height: 25px;
  border: 2px solid
    ${(props) => (props.$theme === props.$color ? "black" : "gray")};
  border-radius: 50%;

  &:active {
    border: 2px inset black;
  }
`;

export default function ThemeSelector({ theme, themeChange }) {
  return (
    <SelectorWrapper>
      <Selector
        $color="salmon"
        $theme={theme}
        onClick={() => themeChange("salmon")}
      ></Selector>
      <Selector
        $color="darkcyan"
        $theme={theme}
        onClick={() => themeChange("darkcyan")}
      ></Selector>
    </SelectorWrapper>
  );
}
