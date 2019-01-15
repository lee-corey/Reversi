import PropTypes from 'prop-types'
import React from 'react'
import Player from '../lib/Player'
import cellStyle from '../styles/cell'
import extend from 'object-assign'
import { List, Map } from 'immutable'
import * as Board from '../lib/Board.js'
import * as firebase from 'firebase';
import {View, TouchableWithoutFeedback, Button,Image} from 'react-native'
import { ActionSystemUpdateAlt } from 'material-ui/svg-icons';
const player1 = require("../img/red.png");
const player2 = require("../img/blue.png");
const db = firebase.database();
var clickCount = 1;
var once = false;
function clickAction(pProps){
  if(pProps.GameMode == 1){
    return
  }
  var date = pProps.playerName + clickCount;
  
  var actionData = {};
  actionData.row = pProps.row;
  actionData.cell = pProps.col;
  actionData.game = pProps.playerName;
  actionData.count = clickCount;
  clickCount = clickCount + 1;
  pProps.actions.setClickCount(clickCount);
  db.ref("GamesLobby/" + pProps.LobbyName).child("actions").child(date).set(actionData)
}

function changedAction(pProps){
  db.ref("GamesLobby/" + pProps.LobbyName).child("actions").on("value", snap => {
      if(snap.val() === null){
       return
      }
      const value = snap.val(); 
      Object.keys(value).map(function(keyName, keyIndex) {
        //console.warn(clickCount,value[keyName].count,keyName, value[keyName].cell,value[keyName].row,value[keyName].game,value[keyName].count);
        if(value[keyName].cell == -1 && value[keyName].row == -1 && pProps.playerName === value[keyName].game && clickCount == value[keyName].count )
          clickCount = clickCount + 1
        if(pProps.playerName !== value[keyName].game && clickCount == value[keyName].count){
          clickCount = clickCount + 1
          pProps.actions.setClickCount(clickCount);
          pProps.actions.removeHint()
          Board.setCell(pProps.board, value[keyName].row, value[keyName].cell, clickCount%2)
          pProps.actions.makeMove(value[keyName].row, value[keyName].cell)
          pProps.actions.checkOverlayHint()
        }
      })
  });
}

export default function Cell(props) {
  const styles = buildStyles(
    props.owner,
    props.playerHint,
    props.row,
    props.col
  )
  
  if (once === false) {
    changedAction(props)
    once = true;
  }
  if (props.owner == 1){
    return (
      <View style={{paddingTop:2,paddingBottom:2,paddingLeft:2,paddingRight:2}}>
        <TouchableWithoutFeedback 
         // onPress={() => props.actions.makeMove(props.row, props.col)}
        >
          <Image source = {player1}  style = {styles}></Image>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  else if(props.owner == 2){
    return (
      <View style={{paddingTop:2,paddingBottom:2,paddingLeft:2,paddingRight:2}}>
      
        <TouchableWithoutFeedback
        //  onPress={() => props.actions.makeMove(props.row, props.col)}
        >
          <Image source = {player2}  style = {styles}></Image>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  else if(props.owner == 3){
    return (
      <View style={{paddingTop:2,paddingBottom:2,paddingLeft:2,paddingRight:2, opacity:0.5}}>
          <TouchableWithoutFeedback
            onPress={() => {props.actions.removeHint(),clickAction(props), Board.setCell(props.board, props.row, props.col, props.owner - 2), props.actions.makeMove(props.row, props.col),  props.GameMode == 1 ? props.actions.checkOverlayHint() : null}}
          >
            <Image source = {player1}  style = {styles}></Image>
          </TouchableWithoutFeedback>
        </View>
    )
  }
  else if(props.owner == 4){
    return(
      <View style={{paddingTop:2,paddingBottom:2,paddingLeft:2,paddingRight:2, opacity:0.5}}>
          <TouchableWithoutFeedback
            onPress={() => {props.actions.removeHint(),clickAction(props), Board.setCell(props.board, props.row, props.col, props.owner - 2), props.actions.makeMove(props.row, props.col), props.GameMode == 1 ? props.actions.checkOverlayHint() : null}}
          >
            <Image source = {player2}  style = {styles}></Image>
          </TouchableWithoutFeedback>
        </View>
    )
  }
  else {
    return (
      <View style={{paddingTop:2,paddingBottom:2,paddingLeft:2,paddingRight:2}}>
        <TouchableWithoutFeedback
          //onPress={() => {props.actions.makeMove(props.row, props.col), props.actions.checkOverlayHint()}}
        >
          <Image style = {styles}></Image>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
/*
<Button
        title=""
        style={styles}
        onPress={() => props.actions.makeMove(props.row, props.col)}
        onPressIn={() => props.actions.checkOverlayHint(props.row, props.col)}
        onPressOut={() => props.actions.removeHint()}
      />
      */
Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  owner: PropTypes.number.isRequired,
  board: PropTypes.instanceOf(List).isRequired,
  playerHint: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired
}

function buildStyles(owner, playerHint, row, col) {
  const isHint = playerHint.get('row') === row && playerHint.get('col') === col
  
  let cellAppearance
  let opacity
  if (owner !== Player.None) {
    cellAppearance = owner
    opacity = 1
  } else if (isHint) {
    cellAppearance = playerHint.get('player')
    opacity = 0.6
  } else {
    cellAppearance = Player.None
    opacity = 1
  }
  
  return extend(
    {
      borderWidth: 1,
      borderColor: 'black',
      opacity: opacity
    },
    cellStyle(cellAppearance)
  )
}
