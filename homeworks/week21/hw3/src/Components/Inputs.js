import styled from "styled-components";
import { Info } from "./Common.js";

const QuestionWrapper = styled.div`
  margin-top: 50px;

  & > p {
    display: ${(props) => !props.$isEmpty && "none"};
    margin-top: 10px;
    color: red;
  }
`;

const QuestionTitle = styled.label`
  display: block;
  font-size: 1.17em;

  ${(props) =>
    props.$required &&
    ` 
    &::after {
      color: red;
      content: " *"
    }
  `}
`;

const QuestionInput = styled.input`
  margin-top: 15px;
  font-size: 1em;
  padding: 3px;
  border: solid 1px #d0d0d0;
`;

const Option = styled.label`
  padding: 8px;
`;

const Input = ({
  inputTitle,
  inputType,
  inputId,
  inputValue,
  isEmpty,
  inputPlaceholder,
  inputInfo,
  isRequired,
  onChange,
}) => {
  return (
    <QuestionWrapper $isEmpty={isEmpty}>
      <QuestionTitle htmlFor={inputId} $required={isRequired}>
        {inputTitle}
      </QuestionTitle>
      {inputInfo ? <Info $mt10>{inputInfo}</Info> : ""}
      <QuestionInput
        type={inputType}
        id={inputId}
        name={inputValue}
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={onChange}
        required
      />
      {isRequired ? <p>此欄為不得為空！</p> : ""}
    </QuestionWrapper>
  );
};

const Radio = ({ typeInfo, inputTitle, isEmpty, isRequired, onChange }) => {
  return (
    <QuestionWrapper $isEmpty={isEmpty}>
      <QuestionTitle $required={isRequired}>{inputTitle}</QuestionTitle>
      {typeInfo.map((option, index) => {
        return (
          <div key={`opt${option.id}`}>
            <input
              type="radio"
              id={`opt${option.id}`}
              name="option"
              checked={option.isChecked}
              onChange={() => onChange(index)}
            />
            <Option htmlFor={`opt${option.id}`}>{option.value}</Option>
          </div>
        );
      })}
      {isRequired ? <p>此欄為不得為空！</p> : ""}
    </QuestionWrapper>
  );
};

export { Input, Radio };
