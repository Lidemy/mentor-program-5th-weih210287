import styled from "styled-components";

const Button = styled.button`
  color: ${(props) => props.theme.main.btnFont};
  background: ${(props) =>
    props.$theme === `salmon` && props.theme.main.second};
  border: 1px solid #767676;
  border-radius: ${(props) => (props.$br15 ? `15px` : `3px`)};

  & + & {
    margin-left: 5px;
  }

  &:hover {
    cursor: pointer;
    filter: opacity(80%);
  }

  ${(props) =>
    props.$flex &&
    `
    flex: 1;
  `}
`;

const TodoButton = styled(Button)`
  margin-left: 15px;
  color: ${(props) => props.theme.main.btnFont};
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: space-between;

  & h3 {
    width: 15%;
  }
`;

export { Button, TodoButton, FilterButtons };
