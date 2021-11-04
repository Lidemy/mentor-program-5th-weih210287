import styled from "styled-components";
import TodoItem from "./TodoItem.js";
import ThemeSelector from "./ThemeSelector.js";
import { useState } from "react";
import { Button, FilterButtons } from "./Button.js";

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  color: ${(props) =>
    props.$theme === `darkcyan`
      ? props.theme.darkcyan.font
      : props.theme.salmon.font};
  background: ${(props) =>
    props.$theme === `darkcyan`
      ? props.theme.darkcyan.rgba
      : props.theme.salmon.rgba};
  background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3) 1px,
      transparent 0
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0);
  background-size: 15px 15px, 15px 15px;
`;

const Wrapper = styled.div`
  margin: 50px auto 0;
  max-width: 500px;
`;

const TodoListWrapper = styled.div`
  padding: 30px;
  background: #ffffff;
  border-radius: 3px;
  box-sizing: border-box;
`;

const AddTodo = styled.div`
  margin: 30px 0 20px;
  display: flex;
  text-align: left;
`;

const AddTodoInput = styled.input`
  margin-right: 5px;
  width: 80%;

  &::placeholder {
    color: ${(props) =>
      props.$theme === `darkcyan`
        ? props.theme.darkcyan.fade
        : props.theme.salmon.fade};
  }
`;

const TodoWrapper = styled.div`
  margin-bottom: 20px;
  min-height: 250px;
`;

let id = 4;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: "abc", isDone: true },
    { id: 2, content: "def", isDone: true },
    { id: 3, content: "ghi", isDone: false },
  ]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState("darkcyan");

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddButtonClick = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      alert("Where's your todo??????");
      return setValue("");
    }
    setTodos([
      {
        id,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    setValue("");
    id++;
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoEdit = () => {
    console.log(document.getElementsByClassName("todo-content"));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleTodoFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleTodoClear = (e) => {
    e.preventDefault();
    alert("This will clear all of the todos, are you sure?");
    setTodos([]);
    setFilter("All");
  };

  return (
    <Background $theme={theme}>
      <Wrapper>
        <ThemeSelector theme={theme} themeChange={handleThemeChange} />
        <TodoListWrapper>
          <h1>Todo List</h1>
          <AddTodo>
            <AddTodoInput
              $theme={theme}
              className="add-input-todo"
              type="text"
              value={value}
              placeholder="Add here"
              onChange={handleInputChange}
            />
            <Button $theme={theme} $br15 $flex onClick={handleAddButtonClick}>
              Add!
            </Button>
          </AddTodo>
          <TodoWrapper>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={handleTodoDelete}
                editTodo={handleTodoEdit}
                toggleIsDone={handleToggleIsDone}
                listFilter={filter}
                theme={theme}
              />
            ))}
          </TodoWrapper>
          <FilterButtons>
            <h3>{filter}</h3>
            <div>
              <Button
                $theme={theme}
                $br15
                onClick={() => handleTodoFilterChange("All")}
              >
                &nbsp;&nbsp;All&nbsp;&nbsp;
              </Button>
              <Button
                $theme={theme}
                $br15
                onClick={() => handleTodoFilterChange("Done")}
              >
                Done
              </Button>
              <Button
                $theme={theme}
                $br15
                onClick={() => handleTodoFilterChange("Todo")}
              >
                Todo
              </Button>
            </div>
            <Button $theme={theme} $br15 onClick={handleTodoClear}>
              Clear all
            </Button>
          </FilterButtons>
        </TodoListWrapper>
      </Wrapper>
    </Background>
  );
}

export default App;

// 待辦
// theme 變換
// 要怎麼樣才能更直接的判斷 theme 然後套進 styled？
// 如：統一在 styled 一開始就判斷好，然後底下就只需要用到 props.theme.xxx
// 把常用的元素包成 component:
// text center, color series, margin, padding
// 一定要把所有東西都包成 Component 嗎？
