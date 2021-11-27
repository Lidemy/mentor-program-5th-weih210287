import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: var(--wrapper-size);
`;

const TitleWrapper = styled(Wrapper)`
  font-size: 16px;
  background: #5f8985;
  box-shadow: 0px 3px 3px 0px rgb(56 56 56 / 24%);
`;

const GameBoardWrapper = styled(Wrapper)`
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-evenly;
`;

export { TitleWrapper, GameBoardWrapper };
