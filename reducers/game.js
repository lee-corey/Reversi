import Player from '../lib/Player'
import * as Board from '../lib/Board'
import isEndOfGame from '../lib/isEndOfGame'
import { Stack, Map } from 'immutable'
import * as actions from '../constants/ActionTypes'

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
      changeLobbyName: changeLobbyName,
      setGameMode: setGameMode,
      setClickCount: setClickCount
    },
    temp: '',
    GameMode: 1, // 1: offline 2: online
    onlineMode: 1, // 1: create Lobby 2: join to Lobby
    onlineStatus: 1, // 1: create 2: joined 3: start
    LobbyName: '',
    clickCount: 1
  }
}

function resetGame(state) {
  return {
    currentPlayer: Player.One,
    board: Board.newGameBoard,
    boardHistory: Stack().push(Board.newGameBoard),
    playerHint: Map(),
    first: state.first,
    second: state.second,
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
      changeLobbyName: changeLobbyName,
      setClickCount: setClickCount
    },
    temp: state.temp,
    GameMode: state.GameMode, // 1: offline 2: online
    onlineMode: state.onlineMode, // 1: create Lobby 2: join to Lobby
    onlineStatus: state.onlineStatus, // 1: create 2: joined 3: start
    LobbyName: state.LobbyName,
    clickCount: 1
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

function reset(state) {
  return resetGame (state)
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

function setGameMode(state, action){
  return {
    ...state,
    GameMode: action.GameMode
  }
}

function setOnlineMode(state, action){
  return {
    ...state,
    onlineMode: action.onlineMode
  }
}

function setTemp(state, action){
  return {
    ...state,
    temp: action.temp
  }
}

function setOnlineStatus(state, action){
  return {
    ...state,
    onlineStatus: action.onlineStatus
  }
}

function setClickCount(state, action){
  return {
    ...state,
    clickCount: action.clickCount
  }
}

export default function game(state = newGame(), action) {
  const handlers = {
    [actions.SWITCH_PLAYER]: switchPlayer,
    [actions.MAKE_MOVE]: makeMove,
    [actions.CHECK_OVERLAY_HINT]: checkOverlayHint,
    [actions.REMOVE_HINT]: removeHint,
    [actions.UNDO]: undo,
    [actions.RESET]: reset,
    [actions.SETUSER]: setUser,
    [actions.CHANGE_LOBBY_NAME]: changeLobbyName,
    [actions.SET_GAME_MODE]: setGameMode,
    [actions.SET_ONLINE_MODE]: setOnlineMode,
    [actions.SET_ONLINE_STATUS]: setOnlineStatus,
    [actions.SET_TEMP]: setTemp,
    [actions.SET_CLICK_COUNT]: setClickCount
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
