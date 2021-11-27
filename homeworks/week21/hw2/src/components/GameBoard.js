import styled from "styled-components";

const Board = styled.div`
  margin: 0 20px;
  padding: 0 25px;
  display: grid;
  height: var(--board-size);
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(19, var(--square-size));
  grid-template-rows: repeat(19, var(--square-size));
  background: #73a5a1;
  border-radius: 10px;
`;

const Square = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: #ffffff;
  border: 2px solid #73a5a1;
  border-right: none;
  border-bottom: none;

  span {
    position: absolute;
    width: var(--square-content-size);
    height: var(--square-content-size);
    background: transparent;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.1s;

    &:hover {
      cursor: pointer;
      background: ${(props) => (props.$isBlack ? "#475251" : "#bbd7d4")};
    }
  }
`;

const Piece = styled.div`
  position: absolute;
  width: var(--square-content-size);
  height: var(--square-content-size);
  color: ${(props) => (props.$manual ? "#ffffff" : "transparent")};
  background: ${(props) => (props.$piece === "Black" ? "#475251" : "#bbd7d4")};
  border-radius: 50%;
  z-index: 2;
`;

export default function GameBoard({ onClick, board, nextPlayer, manual }) {
  return (
    <Board>
      {board.map((row, y) => {
        return row.map((col, x) => {
          return (
            <Square
              key={`y${y}x${x}`}
              onClick={() => onClick(x, y)}
              $isBlack={nextPlayer}
            >
              <span></span>
              {col ? (
                <Piece $piece={col.piece[0]} $manual={manual}>
                  {col.piece[1]}
                </Piece>
              ) : (
                ""
              )}
            </Square>
          );
        });
      })}
    </Board>
  );
}
