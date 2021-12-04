import styled from "styled-components";
import { TodoButton } from "./Button.js";

const Todo = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.main.fade};

  & + & {
    margin-top: 10px;
  }

  & .todo-content {
    ${(props) =>
      props.$isDone &&
      `
      text-decoration: line-through;
      color: ${props.theme.main.fade};
    `}
  }

  ${(props) =>
    props.$filter === `Done` &&
    !props.$isDone &&
    ` 
    display: none;
  `}

  ${(props) =>
    props.$filter === `Todo` &&
    props.$isDone &&
    ` 
    display: none;
  `}
`;

const TodoContent = styled.span`
  text-align: left;
  color: ${(props) => props.theme.main.font};
`;

export default function TodoItem({
  todo,
  deleteTodo,
  editTodo,
  toggleIsDone,
  listFilter,
  theme,
}) {
  return (
    <Todo
      data-todo-id={todo.id}
      $theme={theme}
      $filter={listFilter}
      $isDone={todo.isDone}
    >
      <div>
        <input
          type="checkbox"
          onClick={() => toggleIsDone(todo.id)}
          defaultChecked={todo.isDone}
        />
        <TodoContent $theme={theme} className="todo-content">
          {todo.content}
        </TodoContent>
      </div>
      <div>
        <TodoButton $theme={theme} onClick={() => deleteTodo(todo.id)}>
          刪除
        </TodoButton>
      </div>
    </Todo>
  );
}
