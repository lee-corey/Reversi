import PropTypes from 'prop-types'
import React,{Component} from 'react'
import {Text,TouchableOpacity,View} from 'react-native'
import AButton from 'apsl-react-native-button'
import * as firebase from 'firebase';
import Player from '../lib/Player'
const db = firebase.database();
var once = false
function changedAction(pProps){
  db.ref("GamesLobby/" + pProps.LobbyName).child("buttons").on("value", snap => {
      if(snap.val() === null){
       return
      }
      const value = snap.val(); 
      Object.keys(value).map(function(keyName, keyIndex) {
        if(value[keyName].playerName == pProps.playerName){
         // console.warn(keyName, value[keyName].name, value[keyName].clickCount);
          var date = pProps.playerName + value[keyName].clickCount;
          var actionData = {};
          actionData.row = -1;
          actionData.cell = -1;
          actionData.game = pProps.playerName;
          actionData.count = value[keyName].clickCount;
          pProps.actions.setClickCount(value[keyName].clickCount + 1);
          db.ref("GamesLobby/" + pProps.LobbyName).child("actions").child(date).set(actionData)
        }
      })
  });
}

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
    this.clickCount = 1;
    /*if(!once){
      changedAction(props)
      once = true
    }*/
  }
  onButtonPress = () => {
    this.props.action()
    this.props.removeHint()
    if(this.props.GameMode == 1){
      console.warn("check")
      this.props.checkAction()
    }
    //console.warn(this.props.playerName, this.clickCount)
    var data = this.props.playerName + this.clickCount;
    this.clickCount = this.clickCount +1;
    var actionData = {};
    actionData.name = this.props.id;
    actionData.clickCount = this.props.clickCount;
    actionData.playerName = this.props.playerName
    db.ref("GamesLobby/" + this.props.LobbyName).child("buttons").child(data).set(actionData)
  }

  render = () => {
    const props = this.props;
    var disabled = props.disabled
    if(props.GameMode != 1){
      /*if(props.id === "pass"){
        if (props.currentPlayer != props.onlineMode){
          disabled = true
        }
      }
      if(props.id === "undo"){
        if (props.currentPlayer == props.onlineMode){
          disabled = true
        }
      }*/
      disabled = true
    }
    return disabled
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
