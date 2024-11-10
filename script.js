/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}
const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  board.forEach((turn, index) => {
    squareEls[index].textContent = turn
  })
}
const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${turn} turn now`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie`
  } else {
    messageEl.textContent = `Congrats ${turn} wins`
  }
}
const handleClick = (event) => {
  for (let i = 0; i < squareEls.length; i++) {
    if (squareEls[i] === event.target) {
      index = i
      break
    }
  }

  placePiece(index)
  checkForWinner()
  checkForTie()

  if (!winner && !tie) {
    switchPlayerTurn()
  }
  render()
}
const placePiece = (index) => {
  board[index] = turn
}
const checkForWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i]
    const firstValue = board[combo[0]]
    const secondValue = board[combo[1]]
    const thirdValue = board[combo[2]]
    if (
      firstValue !== '' &&
      firstValue === secondValue &&
      firstValue === thirdValue
    ) {
      winner = true
      break
    }
  }
}
const checkForTie = () => {
  if (winner === true) {
    return
  }
  tie = true
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      tie = false
      break
    }
  }
}
const switchPlayerTurn = () => {
  if (!winner) {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
}
/*----------------------------- Event Listeners -----------------------------*/
window.onload = () => {
  init()
}

squareEls.forEach((sqr) => {
  sqr.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)
