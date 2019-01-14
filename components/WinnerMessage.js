import PropTypes from 'prop-types'
import React from 'react'
import {Text,Alert} from 'react-native'
const styles = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 19,
  height: 22,
  color: 'white'
}

const WinnerMessage = props => (
  <Text style={styles}>{getWinnerMessage(props.score)}</Text>
)

export default WinnerMessage

WinnerMessage.propTypes = {
  score: PropTypes.shape({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired
  }).isRequired
}

function getWinnerMessage(score) {
  
  if (score.player1 === 0) {
    Alert.alert(
      'Win',
      'Player 2 wins!',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    )
    return 'Player 2 wins!'
  } else if (score.player2 === 0) {
    Alert.alert(
      'Win',
      'Player 1 wins!',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    )
    return 'Player 1 wins!'
  } else if (score.player1 + score.player2 === 64) {
    if (score.player1 === score.player2) {
      return 'Tie!'
    } else if (score.player1 > score.player2) {
      return 'Player 1 wins!'
    } else {
      return 'Player 2 wins!'
    }
  }
  return ''
}
