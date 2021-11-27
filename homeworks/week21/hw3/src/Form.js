import styled from "styled-components";
import { useState } from "react";
import { Info } from "./Components/Common.js";
import { Input, Radio } from "./Components/Inputs.js";

const Submit = styled.input`
  margin-top: 100px;
  padding: 15px 30px;
  background: #fad312;
  border: none;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

let id = 1;

export default function Form() {
  const [formInfo, setFormInfo] = useState("");
  const [nicknameInput, setNicknameInput] = useState({
    value: "",
    isEmpty: false,
  });
  const [emailInput, setEmailInput] = useState({
    value: "",
    isEmpty: false,
  });
  const [phoneInput, setPhoneInput] = useState({
    value: "",
    isEmpty: false,
  });
  const [typeInput, setTypeInput] = useState({
    options: [
      { id: 1, value: "躺在床上用想像力實作", isChecked: false },
      { id: 2, value: "趴在地上滑手機找現成的", isChecked: false },
    ],
    isEmpty: false,
  });
  const [motivationInput, setMotivationInput] = useState({
    value: "",
    isEmpty: false,
  });
  const [otherInput, setOtherInput] = useState({
    value: "",
    isEmpty: false,
  });

  const handleNicknameInput = (e) => {
    setNicknameInput({
      value: e.target.value,
      isEmpty: false,
    });
  };

  const handleEmailInput = (e) => {
    setEmailInput({
      value: e.target.value,
      isEmpty: false,
    });
  };

  const handlePhoneInput = (e) => {
    setPhoneInput({
      value: e.target.value,
      isEmpty: false,
    });
  };

  const handleTypeInput = (index) => {
    const newOptions = JSON.parse(JSON.stringify(typeInput.options));
    newOptions.map((option, optionIndex) => {
      if (optionIndex === index) {
        option.isChecked = true;
      } else {
        option.isChecked = false;
      }
      return option;
    });
    setTypeInput({
      ...typeInput,
      options: newOptions,
    });
  };

  const handleMotivationInput = (e) => {
    setMotivationInput({
      value: e.target.value,
      isEmpty: false,
    });
  };

  const handleOtherInput = (e) => {
    setOtherInput({
      value: e.target.value,
    });
  };

  const checkEmpty = () => {
    alert("Please fill in all required!");

    if (!nicknameInput.value) {
      setNicknameInput({ ...nicknameInput, isEmpty: true });
    }
    if (!emailInput.value) {
      setEmailInput({ ...emailInput, isEmpty: true });
    }
    if (!phoneInput.value) {
      setPhoneInput({ ...phoneInput, isEmpty: true });
    }
    if (typeInput.options.every((option) => option.isChecked === false)) {
      setTypeInput({ ...typeInput, isEmpty: true });
    }
    if (!motivationInput.value) {
      setMotivationInput({ ...motivationInput, isEmpty: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 檢查必填是否為空值
    if (
      !nicknameInput.value ||
      !emailInput.value ||
      !phoneInput.value ||
      !motivationInput.value ||
      typeInput.options.every((option) => option.isChecked === false)
    )
      return checkEmpty();

    // 處理勾選的 type
    const typeChecked = typeInput.options.filter(
      (option) => option.isChecked === true
    );

    setFormInfo([
      ...formInfo,
      {
        id: id++,
        nickname: nicknameInput.value,
        email: emailInput.value,
        phoneNumber: phoneInput.value,
        type: typeChecked[0].value,
        motivation: motivationInput.value,
        other: otherInput.value,
      },
    ]);

    setNicknameInput({
      value: "",
      isEmpty: false,
    });
    setEmailInput({
      value: "",
      isEmpty: false,
    });
    setPhoneInput({
      value: "",
      isEmpty: false,
    });
    setTypeInput({
      options: typeInput.options.map((option) => {
        option.isChecked = false;
        return option;
      }),
      isEmpty: false,
    });
    setMotivationInput({
      value: "",
      isEmpty: false,
    });
    setOtherInput({
      value: "",
    });
  };

  return (
    <form>
      <Input
        inputTitle="暱稱"
        inputType="text"
        inputId="nickname"
        inputValue={nicknameInput.value}
        isEmpty={nicknameInput.isEmpty}
        inputPlaceholder="您的暱稱"
        isRequired={true}
        onChange={handleNicknameInput}
      />
      <Input
        inputTitle="電子郵件"
        inputType="email"
        inputId="email"
        inputValue={emailInput.value}
        isEmpty={emailInput.isEmpty}
        inputPlaceholder="您的信箱"
        isRequired={true}
        onChange={handleEmailInput}
      />
      <Input
        inputTitle="手機號碼"
        inputType="text"
        inputId="phone"
        inputValue={phoneInput.value}
        isEmpty={phoneInput.isEmpty}
        inputPlaceholder="您的手機號碼"
        isRequired={true}
        onChange={handlePhoneInput}
      />
      <Radio
        typeInfo={typeInput.options}
        inputTitle="報名類型"
        isEmpty={typeInput.isEmpty}
        isRequired={true}
        onChange={(index) => handleTypeInput(index)}
      />
      <Input
        inputTitle="怎麼知道這個活動的？"
        inputType="text"
        inputId="motivation"
        inputValue={motivationInput.value}
        isEmpty={motivationInput.isEmpty}
        inputPlaceholder="您的回答"
        isRequired={true}
        onChange={handleMotivationInput}
      />
      <Input
        inputTitle="其他"
        inputType="text"
        inputId="suggestion"
        inputValue={otherInput.value}
        inputPlaceholder="您的回答"
        inputInfo="對活動的一些建議"
        isRequired={false}
        onChange={handleOtherInput}
      />
      <Submit type="submit" value="提交" onClick={handleSubmit} />
      <Info $mt20>請勿透過表單送出您的密碼。</Info>
    </form>
  );
}
