import { useState } from "react";
import styled from "styled-components";
import { calculateWinner } from "./utils.js";
import GlobalStyle from "./constants/GlobalStyle.js";
import { TitleWrapper, GameBoardWrapper } from "./constants/Wrappers.js";
import Menu from "./components/Menu.js";
import GameBoard from "./components/GameBoard.js";
import GameInfo from "./components/GameInfo.js";
import Footer from "./components/Footer.js";

const Title = styled.h1`
  text-align: center;
  font-style: italic;
  font-size: 2.5em;
  letter-spacing: 3px;
  color: #ff8d00;
`;

function App() {
  const [game, setGame] = useState({
    history: [
      {
        board: Array(19).fill(Array(19).fill(null)),
        coordinate: [null, null],
      },
    ],
    stepNumber: 0,
    blackIsNext: true,
    showManual: false,
  });

  const handleClick = (x, y) => {
    const history = game.history.slice(0, game.stepNumber + 1);
    const current = history[history.length - 1];
    const newBoard = JSON.parse(JSON.stringify(current.board));

    if (newBoard[y][x] || winner) return;

    newBoard[y][x] = game.blackIsNext
      ? { piece: ["Black", game.stepNumber + 1] }
      : { piece: ["White", game.stepNumber + 1] };

    setGame({
      ...game,
      history: [
        ...history,
        {
          board: newBoard,
          coordinate: [x, y],
        },
      ],
      stepNumber: history.length,
      blackIsNext: !game.blackIsNext,
    });
  };

  const jumpTo = (move) => {
    setGame({
      ...game,
      stepNumber: move,
      blackIsNext: move % 2 === 0,
    });
  };

  const show = () => {
    setGame({
      ...game,
      showManual: !game.showManual,
    });
  };

  // for render
  const history = game.history;
  const current = history[game.stepNumber];
  const x = current.coordinate[0];
  const y = current.coordinate[1];
  const winner = calculateWinner(current.board, x, y);

  return (
    <div>
      <GlobalStyle />
      <TitleWrapper className="title-wrapper">
        <Title className="title">Gomoku</Title>
      </TitleWrapper>
      <GameBoardWrapper className="gameboard-wrapper">
        <Menu showManual={game.showManual} onClick={() => show()} />
        <GameBoard
          className="gameboard"
          onClick={(x, y) => handleClick(x, y)}
          board={current.board}
          nextPlayer={game.blackIsNext}
          manual={game.showManual}
        />
        <GameInfo
          className="game-info"
          nextPlayer={game.blackIsNext}
          winner={winner}
          history={history}
          onClick={(move) => jumpTo(move)}
        />
      </GameBoardWrapper>
      <Footer copyright="Copyright © 2021" author="gzzzz" />
    </div>
  );
}

export default App;
