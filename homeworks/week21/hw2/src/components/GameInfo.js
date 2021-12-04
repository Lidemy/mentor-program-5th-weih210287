import styled from "styled-components";

const Info = styled.div`
  max-width: 180px;
  text-align: center;
  flex: 1;
`;

const Status = styled.h3`
  padding-left: 5px;
  color: #ffffff;
  background: ${(props) => (props.$winner ? "#ff8d00" : "#5f8985")};
  border: 3px solid #5f8985;
  transition: all 0.1s;
`;

const Dropdown = styled.input`
  display: none;

  &:checked ~ div {
    opacity: 1;
  }

  &:checked ~ div > ul {
    display: block;
  }

  &:checked + label > span {
    transform: rotate(225deg);
  }
`;

const MovesTitle = styled.label`
  display: block;
  padding-left: 5px;
  font-weight: bold;
  color: #ff8d00;
  background: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const Pointer = styled.span`
  display: inline-block;
  margin-left: 10px;
  width: 0.5em;
  height: 0.5em;
  border-width: 3px 0 0 3px;
  border-style: solid;
  transform: rotate(45deg);
  transition: all 0.4s;
`;

const Steps = styled.ul`
  display: none;
  margin: 5px 0 0;
  padding: 0;
  height: calc(var(--board-size) * 0.8);
  overflow: scroll;
  background: #ffffff;
`;

const StepsCover = styled.div`
  opacity: 0;
  transition: all 0.4s;
`;

const Step = styled.li`
  margin-bottom: 3px;
  padding-left: 3px;
  list-style: none;
  list-style-type: none;
  color: #5f8985;
  background: #deeae9;
  border-left: 3px solid #ff8d00;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 5px 0px rgb(56 56 56 / 24%),
      0px -3px 5px 0px rgb(56 56 56 / 24%);
  }
`;

export default function GameInfo({ nextPlayer, winner, history, onClick }) {
  const status = nextPlayer ? "Black" : "White";
  const moves = history.map((step, index) => {
    const desc = index
      ? `Go to step ${index % 2 ? "Black" : "White"} #${index}`
      : "Game Start";
    return (
      <Step key={index} onClick={() => onClick(index)}>
        {desc}
      </Step>
    );
  });

  return (
    <Info>
      <Status $winner={winner}>
        {winner ? "Winner" : "Next Player:"}
        <br />
        {winner ? winner : status}
      </Status>
      <div>
        <Dropdown type="checkbox" id="dropdown" />
        <MovesTitle htmlFor="dropdown">
          My Moves
          <Pointer />
        </MovesTitle>
        <StepsCover>
          <Steps className="dropdown-items">{moves}</Steps>
        </StepsCover>
      </div>
    </Info>
  );
}
