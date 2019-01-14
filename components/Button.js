import PropTypes from 'prop-types'
import React,{Component} from 'react'
import {Text,TouchableOpacity,View} from 'react-native'
import AButton from 'apsl-react-native-button'
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      //cursor: props.disabled ? 'default' : 'pointer',
      width: 100,
      height: 45,
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 40,
      alignSelf: 'center'
    }
  }
  onButtonPress = () => {
    this.props.action()
    this.props.removeHint()
    this.props.checkAction()
    
  }

  render = () => {
    const props = this.props; 
    return props.disabled
      ? <AButton style={this.styles} isDisabled = {true} >
          {props.children}
          </AButton>
      : <AButton onPress={this.onButtonPress} style={this.styles}>
          {props.children}
        </AButton>
  }
}
//<Button style={Styles.loginBut} onPress={ () => this.login()} textStyle = {{fontSize: 18,color : '#FC8231'}}>Log In</Button>
Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  checkAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}
