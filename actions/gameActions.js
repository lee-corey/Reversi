import * as actions from '../constants/ActionTypes'

export function setUser(first,second) {
  return {
    type: actions.SETUSER,
    first,
    second
  }
}
export function changeLobbyName(LobbyName){
  return {
    type: actions.CHANGE_LOBBY_NAME,
    LobbyName
  }
}
export function setOnlineMode(onlineMode){
  return {
    type: actions.SET_ONLINE_MODE,
    onlineMode
  }
}
export function setTemp(temp){
  return {
    type: actions.SET_TEMP,
    temp
  }
}
export function setGameMode(gameMode){
  return {
    type: actions.SET_GAME_MODE,
    gameMode
  }
}
export function setOnlineStatus(onlineStatus){
  return {
    type: actions.SET_ONLINE_STATUS,
    onlineStatus
  }
}
export function setClickCount(clickCount){
  return {
    type: actions.SET_CLICK_COUNT,
    clickCount
  }
}

export function switchPlayer() {
  return {
    type: actions.SWITCH_PLAYER
  }
}

export function makeMove(row, col) {
  return {
    type: actions.MAKE_MOVE,
    row,
    col
  }
}

export function checkOverlayHint() {
  return {
    type: actions.CHECK_OVERLAY_HINT
 //   row,
 //   col
  }
}

export function removeHint() {
  return {
    type: actions.REMOVE_HINT
  }
}

export function undo() {
  return {
    type: actions.UNDO
  }
}

export function reset() {
  return {
    type: actions.RESET
  }
}
