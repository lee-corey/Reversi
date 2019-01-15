import PropTypes from 'prop-types'
import React,{Component} from 'react'
import Button from './Button'
import isEndOfGame from '../lib/isEndOfGame'
import { Stack } from 'immutable'
import { View,TouchableHighlight,TouchableOpacity,Text} from 'react-native'
import component from './style/component';
const styles = {
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop: 30
}
export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    //console.warn(props.score);
    
  }

  render = () => {
    const props = this.props;
    this.gameOver = isEndOfGame(props.score.player1, props.score.player2)
    this.hasMoves = props.boardHistory.size > 1
    return (
      <View style={styles}>
        <Button  id="pass" 
          action={props.actions.switchPlayer}
          removeHint = {props.actions.removeHint}
          checkAction={props.actions.checkOverlayHint}
          disabled={this.gameOver}
          GameMode={props.GameMode}
          LobbyName={props.LobbyName}
          playerName={props.playerName}
          currentPlayer={props.currentPlayer}
          onlineMode={props.onlineMode}
          clickCount={props.clickCount}
          actions={props.actions}
        >
          Pass
        </Button>
        <Button  id="undo" 
          action={props.actions.undo}
          removeHint = {props.actions.removeHint} 
          checkAction={props.actions.checkOverlayHint} 
          disabled={!this.hasMoves || this.gameOver}
          GameMode={props.GameMode}
          LobbyName={props.LobbyName}
          playerName={props.playerName}
          currentPlayer={props.currentPlayer}
          onlineMode={props.onlineMode}
          clickCount={props.clickCount}
          actions={props.actions}
        >
          Undo
        </Button>
        <Button  id="reset" 
          action={props.actions.reset}  
          removeHint = {props.actions.removeHint} 
          checkAction={props.actions.checkOverlayHint} 
          disabled={!this.hasMoves}
          GameMode={props.GameMode}
          LobbyName={props.LobbyName}
          playerName={props.playerName}
          currentPlayer={props.currentPlayer}
          onlineMode={props.onlineMode}
          clickCount={props.clickCount}
          actions={props.actions}
        >
          Reset
        </Button>
      </View>
    )
  }
}

ButtonGroup.propTypes = {
  score: PropTypes.shape({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired
  }).isRequired,
  boardHistory: PropTypes.instanceOf(Stack).isRequired,
  actions: PropTypes.object.isRequired
}
