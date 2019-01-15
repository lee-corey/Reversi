import React, {Component} from 'react'; 
import GameComponent from '../components/GameComponent'
import PropTypes from 'prop-types'
import { Stack, Map, List } from 'immutable'
import BackArray from '../lib/Back'
import {View, ImageBackground, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
const { width, height } = Dimensions.get("window");
var Background = ""
export default class Game extends Component{
//export default function Game(props) {
    static navigationOptions = {
      title: 'Game',
      header: null
    }
    //{console.error(props.screenProps.navigation.state.params.prop)}
      //{console.error(props.navigation.state.params.prop)}
    constructor(props){
      super(props);
      this.paramProps = props.navigation.state.params.prop
      this.generateBack()
    }


    generateBack(){
      const rand = 1 + Math.floor(Math.random() * 10);
      Background = BackArray[3]
    }


    render(){
      return (
        <ImageBackground style={Styles.background} source={{uri:Background}}>
          <GameComponent screenProps={this.paramProps}>
          </GameComponent>
        </ImageBackground>
      );
    }
  }

  const Styles = StyleSheet.create({
    background: {
		width,
        height,
    },
  })