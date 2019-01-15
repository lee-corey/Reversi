import PropTypes from 'prop-types'
import React from 'react'
import Row from './Row'
import { List, Map } from 'immutable'
import {View} from 'react-native'
const styles = {
  backgroundColor: '#EEEEEE',
  
}

const Board = props => (
  <View style={styles}>
    <View style = {{flexDirection: 'row',justifyContent:'center'}}>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(r => (
        <Row
          row={r}
          board={props.board}
          actions={props.actions}
          playerHint={props.playerHint}
          LobbyName={props.LobbyName}
          GameMode={props.GameMode}
          playerName={props.playerName}
          clickCount={props.clickCount}
          key={r}
        />
      ))}
    </View>
  </View>
)
/*
<table style={styles}>
    <tbody>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(r => (
        <Row
          row={r}
          board={props.board}
          actions={props.actions}
          playerHint={props.playerHint}
          key={r}
        />
      ))}
    </tbody>
  </table>
  */
export default Board

Board.propTypes = {
  board: PropTypes.instanceOf(List).isRequired,
  playerHint: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired
}
