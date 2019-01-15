import React, {Component} from 'react'; 
import {View, ImageBackground, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
import FindComponent from '../components/FindComponent';

export default class Find extends Component{
    static navigationOptions = {
      title: 'Find',
      header: null
    }
    constructor(props){
      super(props);
      this.paramProps = props.navigation.state.params.prop
    }

    render(){
      return (
        <FindComponent screenProps={this.paramProps}></FindComponent>
      );
    }
}