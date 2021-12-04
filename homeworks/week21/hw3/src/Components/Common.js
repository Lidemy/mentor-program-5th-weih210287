import styled from "styled-components";

const Wrapper = styled.div`
  margin: 80px auto 150px;
  padding: 40px 30px;
  width: 645px;
  text-align: left;
  background: #ffffff;
  border-top: 10px solid #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const Info = styled.div`
  margin: ${(props) =>
    props.$mt10
      ? "10px 0 0 0"
      : props.$mt20
      ? "20px 0 0 0"
      : props.$my32 && "30px 0 20px"};
  font-size: 1em;

  & p + p {
    margin-top: 10px;
  }
`;

export { Wrapper, Info };
