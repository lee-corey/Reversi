import PropTypes from 'prop-types'
import React,{Component} from 'react'
import Player from '../lib/Player'
import extend from 'object-assign'
import cellStyle from '../styles/cell'
import globals from '../styles/globals'
import { Text, View, ImageBackground} from 'react-native';
const player1 = require("../img/red.png");
const player2 = require("../img/blue.png");
//export default function PlayerInfo(props) {
export default class PlayerInfo extends Component {
  
  constructor(props) {
    super(props);
  }

  render = () => {
    const props = this.props;

    styles = buildStyles(props.currentPlayer);

    return (
      <View style={styles.playerTable}>
        <View style={{flexDirection:'row'}}>
          <View style={styles.player1.label}>
            <Text style={styles.player1.font}>{props.first}</Text>
          </View>
          <ImageBackground source = {player1} style={styles.player1.score} resizeMode = 'cover'>
            <Text style={styles.player1.scorefont}>{props.score.player1}</Text>
          </ImageBackground>
        </View>
        <View style={{flexDirection:'row', marginTop:5}}>
          <View style={styles.player2.label}>
            <Text style={styles.player2.font}>{props.second}</Text>
          </View>
          <ImageBackground source = {player2} style={styles.player2.score} resizeMode = 'cover'>
            <Text style={styles.player2.scorefont}>{props.score.player2}</Text>
          </ImageBackground>
        </View>
      </View>
    )
  }
}
/*
<table style={styles.playerTable}>
      <tbody>
        <tr>
          <td ></td>
          <td style={styles.player1.score}>{props.score.player1}</td>
        </tr>
        <tr>
          <td style={styles.player2.label}>Player 2</td>
          <td style={styles.player2.score}>{props.score.player2}</td>
        </tr>
      </tbody>
    </table>
*/
PlayerInfo.propTypes = {
  currentPlayer: PropTypes.number.isRequired,
  score: PropTypes.shape({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired,
  }).isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired
}

function buildStyles(currentPlayer) {
  return {
    playerTable: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 30
    },
    player1: {
      font: {
        fontWeight: currentPlayer === Player.One ? 'bold' : 'normal',
        width: 200,
        fontSize: globals.fontSize,
        color: 'white'
      },
      score: extend(
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
        cellStyle(Player.One)
      ),
      scorefont: {
        color: 'white',
        fontSize: globals.fontSize,
        textAlign: 'center'
      }
    },
    player2: {
      label: {
        justifyContent: 'center',
      },
      font: {
        fontWeight: currentPlayer === Player.Two ? 'bold' : 'normal',
        width: 200,
        fontSize: globals.fontSize,
        color: 'white'
      },
      score: extend(
        {
          alignItems: 'center',
          justifyContent: 'center'
          
        },
        cellStyle(Player.Two)
      ),
      scorefont: {
        color: 'white',
        fontSize: globals.fontSize,
        textAlign: 'center'
      }
    }
  }
}
