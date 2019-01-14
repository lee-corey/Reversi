import Player from '../lib/Player'
import * as Board from '../lib/Board'
import isEndOfGame from '../lib/isEndOfGame'
import { Stack, Map } from 'immutable'
import {
  SWITCH_PLAYER,
  MAKE_MOVE,
  CHECK_OVERLAY_HINT,
  REMOVE_HINT,
  UNDO,
  RESET,
  SETUSER,
  CHANGE_LOBBY_NAME
} from '../constants/ActionTypes'

function switchPlayer(state) {

  const nextPlayer = state.currentPlayer === Player.One
    ? Player.Two
    : Player.One

  return {
    ...state,
    currentPlayer: nextPlayer,
    boardHistory: state.boardHistory.push(state.board)
  }
}

function newGame() {
  return {
    currentPlayer: Player.One,
    board: Board.newGameBoard,
    boardHistory: Stack().push(Board.newGameBoard),
    playerHint: Map(),
    first: 'Player 1',
    second: 'Player 2',
    score: {
      player1: 2,
      player2: 2
    },
    actions: {
      switchPlayer: switchPlayer,
      makeMove: makeMove,
      undo: undo,
      reset: reset,
      setUser: setUser,
      changeLobbyName: changeLobbyName
    },
    GameMode: 1, // 1: offline 2: online
    LobbyName: ''
  }
}

function makeMove(state, action) {
  const newBoard = Board.makeMove(
    state.board,
    action.row,
    action.col,
    state.currentPlayer
  )

  if (newBoard !== state.board) {
    const newHistory = state.boardHistory.push(newBoard)
    const score = Board.getScore(newBoard)

    if (!isEndOfGame(score.player1, score.player2)) {
      const nextPlayer = state.currentPlayer === Player.One
        ? Player.Two
        : Player.One

      return {
        ...state,
        boardHistory: newHistory,
        board: newBoard,
        currentPlayer: nextPlayer
      }
    }

    return {
      ...state,
      boardHistory: newHistory,
      board: newBoard
    }
  }

  return state
}

function checkOverlayHint(state) {
  return {
    ...state,
    board: Board.setOverlayHint(state.board, state.currentPlayer)
  }
}

function removeHint(state) {
  return {
    ...state,
    board: Board.clearHint(state.board)
  }
}

function undo(state) {
  
  const previousBoardHistory = state.boardHistory.pop()
  const nextPlayer = state.currentPlayer === Player.One
    ? Player.Two
    : Player.One

  return {
    ...state,
    board: previousBoardHistory.peek(),
    boardHistory: previousBoardHistory,
    currentPlayer: nextPlayer
  }
}

function reset() {
  return newGame()
}

function setUser(state, action){
   // console.error(action.first)
    return {
      ...state,
      first: action.first,
      second: action.second
    }
}

function changeLobbyName(state, action){
  return {
    ...state,
    LobbyName: action.LobbyName
  }
}

export default function game(state = newGame(), action) {
  const handlers = {
    [SWITCH_PLAYER]: switchPlayer,
    [MAKE_MOVE]: makeMove,
    [CHECK_OVERLAY_HINT]: checkOverlayHint,
    [REMOVE_HINT]: removeHint,
    [UNDO]: undo,
    [RESET]: reset,
    [SETUSER]: setUser,
    [CHANGE_LOBBY_NAME]: changeLobbyName
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state
}


export function getGame(state) {
  const slice = state.game
  const score = Board.getScore(slice.board)
  slice.score = score
  return {
    score,
    ...slice
  }
}
