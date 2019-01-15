import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from './Board'
import PlayerInfo from './PlayerInfo'
import WinnerMessage from './WinnerMessage'
import ButtonGroup from './ButtonGroup'
import Player from '../lib/Player'
import { Stack, Map, List } from 'immutable'
import { getGame } from '../reducers/game'
import {View} from 'react-native'

class GameComponent extends Component {
//  export default function GameComponent(props) {
  /*static propTypes = {
    boardHistory: PropTypes.instanceOf(Stack).isRequired,
    playerHint: PropTypes.instanceOf(Map).isRequired,
    board: PropTypes.instanceOf(List).isRequired,
    currentPlayer: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    first: PropTypes.string.isRequired,
    second: PropTypes.string.isRequired
  }*/

    constructor(props) {
      super(props);

    }
    render = () => {
      return (
        <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
          <PlayerInfo
            currentPlayer={this.props.game.currentPlayer}
            score={this.props.game.score}
            first = {this.props.game.first}
            second = {this.props.game.second}
          />
          <WinnerMessage score={this.props.game.score} />
          <Board
            actions={this.props.screenProps.actions}
            board={this.props.game.board}
            playerHint={this.props.game.playerHint}
            LobbyName={this.props.game.LobbyName}
            GameMode={this.props.game.GameMode}
            playerName={this.props.game.temp}
            clickCount={this.props.game.clickCount}
          />
          <ButtonGroup
            actions={this.props.screenProps.actions}
            score={this.props.game.score}
            boardHistory={this.props.game.boardHistory}
            GameMode={this.props.game.GameMode}
            LobbyName={this.props.game.LobbyName}
            playerName={this.props.game.temp}
            currentPlayer={this.props.game.currentPlayer}
            onlineMode={this.props.game.onlineMode}
            clickCount={this.props.game.clickCount}
          />
        </View>
      )
    }
}


const mapStateToProps = (state) => {
  return { game: state.game }
};

export default connect(mapStateToProps)(GameComponent);


/*
export default connect(getGame, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(GameComponent)
*/