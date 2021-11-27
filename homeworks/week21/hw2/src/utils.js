export const calculateWinner = (board, x, y) => {
  if (!x || !y) return;

  if (
    count(board, x, y, -1, 0) + count(board, x, y, 1, 0) >= 4 ||
    count(board, x, y, 0, -1) + count(board, x, y, 0, 1) >= 4 ||
    count(board, x, y, -1, -1) + count(board, x, y, 1, 1) >= 4 ||
    count(board, x, y, 1, -1) + count(board, x, y, -1, 1) >= 4
  ) {
    return board[y][x].piece[0];
  }
  return board.every((y) => y.every((x) => x)) ? "DRAW" : null;
};

function count(board, x, y, dirX, dirY) {
  const piece = board[y][x].piece[0];
  let tempX = x;
  let tempY = y;
  let consecutiveCount = 0;

  do {
    tempX += dirX;
    tempY += dirY;

    if (tempX < 0 || tempY < 0 || tempX > 18 || tempY > 18) break;
    if (!board[tempY][tempX]) break;
    if (board[tempY][tempX].piece[0] !== piece) break;
    consecutiveCount++;
  } while (consecutiveCount < 5);
  return consecutiveCount;
}
