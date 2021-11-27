import Form from "./Form.js";
import styled from "styled-components";
import { Wrapper, Info } from "./Components/Common.js";

const Footer = styled.footer`
  padding: 15px 0;
  font-size: 0.9em;
  text-align: center;
  color: #999999;
  background: #000;
`;

const Notice = styled.p`
  color: red;
`;

function App() {
  return (
    <div>
      <Wrapper>
        <h1>新拖延症運動報名表單</h1>
        <Info $my32>
          <p>活動日期：2020/12/10 ~ 2020/12/11</p>
          <p>活動地點：台北市大安區新生南路二段1號</p>
        </Info>
        <Notice>* 必填</Notice>
        <Form />
      </Wrapper>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </div>
  );
}

export default App;
