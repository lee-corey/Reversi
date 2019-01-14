import React, {Component} from 'react'; 
import { Provider } from 'react-redux'
import store from '../store'
import  {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/gameActions'
import {View,Alert, ImageBackground, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
import InputField from '../components/input'
import { getGame } from '../reducers/game'
import Button from 'apsl-react-native-button'
import BackArray from '../lib/Back'
import { Stack, Map, List } from 'immutable'
import PropTypes from 'prop-types'
const { width, height } = Dimensions.get("window");
var Background = ""
class Login extends Component{
    static navigationOptions = {
        title: 'Login',
		header: null
    }
    constructor(props){
        super(props);
        this.state = {
            firstVar : '',
            secondVar : '',
            appIsReady : true
        }
        this.generateBack()
    }
   /* async componentWillMount(){
        this.generateBack()
    }*/
    generateBack(){
        const rand = Math.floor(Math.random() * 10);
        Background = BackArray[(rand - 1)]
       // await Asset.fromModule(Background).downloadAsync();
        //this.setState({appIsReady: true});
    }
    static propTypes = {
        boardHistory: PropTypes.instanceOf(Stack).isRequired,
        playerHint: PropTypes.instanceOf(Map).isRequired,
        board: PropTypes.instanceOf(List).isRequired,
        currentPlayer: PropTypes.number.isRequired,
        actions: PropTypes.object.isRequired,
      //  first: PropTypes.string.isRequired,
       // second: PropTypes.string.isRequired
      }

    login() {
        if(this.state.firstVar == "" || this.state.secondVar == ""){
            Alert.alert(
                'Error',
                'Please enter the name',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
              )
              return
        }
        this.props.actions.reset()
        this.props.actions.setUser(this.state.firstVar,this.state.secondVar)
        this.props.actions.checkOverlayHint()
        this.props.navigation.navigate('Game',{prop:this.props});
    }
    
    find() {
        if(this.state.firstVar == ""){
            Alert.alert(
                'Error',
                'Please enter the First Player',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
              )
              return
        }
        this.props.actions.reset()
        this.props.actions.setUser(this.state.firstVar,"Player 2")
        this.props.navigation.navigate('Find',{prop:this.props});
    }

    render() {
    if (this.state.appIsReady) {
      return (
        <View>
            <ImageBackground style={Styles.background} source={{uri:Background}}>
                <View style = {Styles.backView}>
                    <View style = {Styles.titleView}>
                        <Text style={Styles.titleFont}>REVERSE</Text>
                    </View>
                    <View style = {[Styles.centreItems]}>
                            <TextInput value={this.state.firstVar} onChangeText={(text) => this.setState({firstVar: text})} placeholder="First Player" placeholderTextColor="#AAAAAA" style={[Styles.inputField, Styles.shadow]}></TextInput>
                            <TextInput value={this.state.secondVar} onChangeText={(text) => this.setState({secondVar: text})} placeholder="Second Player"  placeholderTextColor="#AAAAAA" style={[Styles.inputField, Styles.shadow]}
                                        ></TextInput>
                            <Button style={Styles.loginBut} onPress={ () => this.login()} textStyle = {{fontSize: 18,color : '#FC8231'}}>Play</Button>
                            <Button style={Styles.findBut} onPress={ () => this.find()} textStyle = {{fontSize: 18,color : '#FC8231'}}>Find Match</Button>
                        </View>
                </View>
            </ImageBackground>
        </View>
      );
    }
    else {
        return (
            <View></View>
        );
    }
  }
}

  export default connect(getGame, dispatch => {
    return {actions:bindActionCreators(actions, dispatch)};
  })(Login)
  const Styles = StyleSheet.create({
    background: {
		width,
        height,
    },
    inputField: {
        backgroundColor: 'rgba(255,255,255,255.1)',
        color: '#000000',
        height: 50,
        width: 270,
        marginTop: 20,
        padding: 4,
        fontSize: 18,
        borderRadius: 40,
        alignSelf: 'center',
        textAlign: 'center'
      },
      shadow: {
        shadowColor: '#444',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 1,
      },
    titleView: {
        marginBottom:100
    },
    titleFont: {
        color:'#FFFFFF',
        fontSize:50
    },
    backView: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    loginBut: {
        height: 45,
        width: 170,
        backgroundColor: 'white',
        marginTop: 150,
        padding: 4,
        borderRadius: 40,
        alignSelf: 'center',
    },
    findBut: {
        height: 45,
        width: 170,
        backgroundColor: 'white',
        marginTop: 10,
        padding: 4,
        borderRadius: 40,
        alignSelf: 'center',
    },
    centreItems: {
        alignItems: 'center',
    }
  })