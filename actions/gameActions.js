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

export function setUser(first,second) {
  return {
    type: SETUSER,
    first,
    second
  }
}
export function changeLobbyName(LobbyName){
  return {
    type: CHANGE_LOBBY_NAME,
    LobbyName
  }
}
export function switchPlayer() {
  return {
    type: SWITCH_PLAYER
  }
}

export function makeMove(row, col) {
  return {
    type: MAKE_MOVE,
    row,
    col
  }
}

export function checkOverlayHint() {
  return {
    type: CHECK_OVERLAY_HINT
 //   row,
 //   col
  }
}

export function removeHint() {
  return {
    type: REMOVE_HINT
  }
}

export function undo() {
  return {
    type: UNDO
  }
}

export function reset() {
  return {
    type: RESET
  }
}
