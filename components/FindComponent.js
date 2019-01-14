import React, {Component} from 'react'; 
import GameComponent from '../components/GameComponent'
import PropTypes from 'prop-types'
import { Stack, Map, List } from 'immutable'
import BackArray from '../lib/Back'
import  {connect} from 'react-redux';
import {View, ImageBackground, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
const { width, height } = Dimensions.get("window");
import * as Progress from 'react-native-progress';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDGhfT9SaIE-HkhmVh7EPiGX3yYv1aKERA",
    authDomain: "reversi-6e2f1.firebaseapp.com",
    databaseURL: "https://reversi-6e2f1.firebaseio.com",
    projectId: "reversi-6e2f1",
    storageBucket: "reversi-6e2f1.appspot.com",
    messagingSenderId: "983595005400"
  };
  
firebase.initializeApp(config);

const db = firebase.database();
var Background = ""

const max_lobby_players = 2;

function addPlayerToLobby(user, lobby) {
    db.ref("GamesLobby/" + lobby).child("players").child(user.userId).set(user);
}

let createNewLobby = (user, pProps) => {
    let lobbyName = "Game:" + Date.now();
    addPlayerToLobby(user, lobbyName);
    //console.error(pProps.screenProps.actions.changeLobbyName)
    pProps.screenProps.actions.changeLobbyName(lobbyName)
}

let findGameLobby = (user, paramProps) => {
    let prom = new Promise((resolve, reject) => {
        let lobbyFound = false;
        db.ref("GamesLobby").once("value", snap => {
            let lobies = snap.val();
            if (lobies == null) {
                createNewLobby(user,paramProps);
                lobbyFound = true;
            }
            else {
                //find a lobby for our player
                let allLobbies = Object.keys(lobies);
                allLobbies.forEach(key => {
                  let eachlobby = lobies[key];
        
                  if (eachlobby.players === undefined) return;
        
                  let noOfPlayers = Object.keys(eachlobby.players).length;
                  // add player to lobby if not full
                  if (noOfPlayers <= max_lobby_players) {
                    if (noOfPlayers === max_lobby_players) {
                      //this lobby is full so check next lobby
                      return;
                    }
        
                    // if all lobbies are full this creates a new lobby and adds this player;
                    addPlayerToLobby(user, key);
                    
                    //dispatch the lobby name
                    //Store.dispatch({ type: "CHANGE_LOBBY", key: key });
                    paramProps.screenProps.actions.changeLobbyName(key)
                    lobbyFound = true;
                  }
                }); //allLobies.loop
              } //else
        
              if (!lobbyFound) {
                createNewLobby(user, paramProps);
                lobbyFound = true;
              }
              resolve(lobbyFound);
        });
    });
    return prom;
}

class FindComponent extends Component{
    static navigationOptions = {
      title: 'Find',
      header: null
    }
    constructor(props){
      super(props);
      this.generateBack()
      let username = this.props.game.first
        let userId = username + Date.now();
        let user = {
            username,
            userId: userId
        };
        findGameLobby(user, this.props).then(val => {
            //Store.dispatch({ type: "LOBBY_FOUND" });
        });
    }


    generateBack(){
      const rand = 1 + Math.floor(Math.random() * 10);
      Background = BackArray[4]
    }


    render(){
      return (
          
        <ImageBackground style={Styles.background} source={{uri:Background}}>
            <View style = {Styles.waitPlayers}>
                <View>
                    <Progress.Bar progress={0.3} width={200} />
                    <Text style = {Styles.textFont}>Waiting For...</Text>
                </View>
            </View>
        </ImageBackground>
      );
    }
}
  const mapStateToProps = (state) => {
    return { game: state.game }
  };
  
  export default connect(mapStateToProps)(FindComponent);

  const Styles = StyleSheet.create({
    background: {
		width,
        height,
    },
    textFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        height: 22,
        color: 'white'
    },
    waitPlayers: {
        marginTop: 300,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
       // backgroundColor: '#EEEEEE'
      },
    card: {
        padding: 1.2,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#6200E0',
        margin: 10
    }
  })