import PropTypes from 'prop-types'
import React from 'react'
import Player from '../lib/Player'
import cellStyle from '../styles/cell'
import extend from 'object-assign'
import { List, Map } from 'immutable'
import * as Board from '../lib/Board.js'
import {View, TouchableWithoutFeedback, Button,Image} from 'react-native'
const player1 = require("../img/red.png");
const player2 = require("../img/blue.png");
export default function Cell(props) {
  const styles = buildStyles(
    props.owner,
    props.playerHint,
    props.row,
    props.col
  )
  
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
            onPress={() => {props.actions.removeHint(), Board.setCell(props.board, props.row, props.cell, props.owner - 2), props.actions.makeMove(props.row, props.col), props.actions.checkOverlayHint()}}
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
            onPress={() => {props.actions.removeHint(), Board.setCell(props.board, props.row, props.cell, props.owner - 2), props.actions.makeMove(props.row, props.col), props.actions.checkOverlayHint()}}
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
