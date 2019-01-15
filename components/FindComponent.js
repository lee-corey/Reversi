import React, {Component} from 'react'; 
import BackArray from '../lib/Back'
import  {connect} from 'react-redux';
import {View, ImageBackground, Dimensions,Text, StyleSheet, TextInput} from 'react-native'
const { width, height } = Dimensions.get("window");
import Progress from './Progress';
import * as firebase from "firebase";
import RectText from './RectText';
import AButton from 'apsl-react-native-button'
import GameComponent from './GameComponent';

const db = firebase.database();
var Background = ""
let calledOnce = false;
let statusOnce = false;
const max_lobby_players = 2;
var showText = "Waiting For..."
function addPlayerToLobby(user, lobby) {
    db.ref("GamesLobby/" + lobby).child("players").child(user.userId).set(user);
}

function addStatusToLobby(status, lobby){
  db.ref("GamesLobby/" + lobby).child("status").set(status)
}

function addLobbyNameToLobby(lobby){
  db.ref("GamesLobby/" + lobby).child("lobbyName").set(lobby)
}

function childAddedAction(lobby,pProps){
  let total_players_count = 0;
  db.ref("GamesLobby/" + lobby).child("players").on("child_added", snap => {
    total_players_count += 1
    if(total_players_count === max_lobby_players){
      var child = snap.val()
      showText = "Ready to start"
      
      pProps.screenProps.actions.setOnlineStatus(2)
      pProps.screenProps.actions.setUser(pProps.game.temp,child.username)
    }
  });
}

function statusChangedAction(lobby,pProps){
  db.ref("GamesLobby/" + lobby).child("status").on("value", snap => {
    if(snap.val() == 3)
      pProps.screenProps.actions.setOnlineStatus(3)
  });
}

let createNewLobby = (user, pProps) => {
    let lobbyName = "Game:" + Date.now();
    addLobbyNameToLobby(lobbyName);
    addPlayerToLobby(user, lobbyName);
    addStatusToLobby(1, lobbyName);
    pProps.screenProps.actions.setUser(pProps.game.temp,"")
    pProps.screenProps.actions.changeLobbyName(lobbyName)
    pProps.screenProps.actions.setOnlineMode(1)
    pProps.screenProps.actions.setOnlineStatus(1)
    pProps.screenProps.actions.checkOverlayHint()
    if (calledOnce === false) {
      childAddedAction(lobbyName,pProps)
      calledOnce = true;
    }

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
                    let values = Object.values(eachlobby.players)
                    // if all lobbies are full this creates a new lobby and adds this player;
                    addPlayerToLobby(user, key);
                    //dispatch the lobby name
                    addStatusToLobby(2, eachlobby.lobbyName);
                    paramProps.screenProps.actions.setUser(values[0].username,paramProps.game.temp)
                    paramProps.screenProps.actions.changeLobbyName(key)
                    paramProps.screenProps.actions.setOnlineMode(2)
                    paramProps.screenProps.actions.setOnlineStatus(2)
                    lobbyFound = true;
                    
                    if (statusOnce === false) {
                      statusChangedAction(eachlobby.lobbyName,paramProps)
                      statusOnce = true;
                    }
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
      let username = this.props.game.temp
        let userId = username + Date.now();
        let user = {
            username,
            userId: userId
        };
        findGameLobby(user, this.props).then(val => {
            //Store.dispatch({ type: "LOBBY_FOUND" });
        });
      showText = "Waiting For..."
    }
    generateBack(){
      const rand = 1 + Math.floor(Math.random() * 10);
      Background = BackArray[4]
    }
    onButtonPress(pProps) {
      if(pProps.game.onlineStatus == 2){
        pProps.screenProps.actions.setOnlineStatus(3)
        addStatusToLobby(3, pProps.game.LobbyName);
      }
    }
    render(){
      if(this.props.game.onlineStatus == 3) {
        return (
          <ImageBackground style={Styles.background} source={{uri:Background}}>
            <GameComponent screenProps={this.props.screenProps}>
            </GameComponent>
          </ImageBackground>
        )
      }
      else{
        return (
          <ImageBackground style={Styles.background} source={{uri:Background}}>
              <View style = {Styles.waitPlayers}>
                  <View>
                      <Progress width = {width * 0.9} finish = {this.props.game.onlineStatus === 2 && this.props.game.onlineMode === 1}/>
                      <Text style = {Styles.textFont}>{showText}</Text>
                      <View style = {Styles.rectView}>
                        <View style={Styles.rect}>
                          <RectText text = {this.props.game.first} ></RectText>
                        </View>
                        
                        <View style={Styles.rect}>
                          <RectText text = {this.props.game.second} ></RectText>
                        </View>
                      </View>
                      { this.props.game.onlineStatus === 2 && this.props.game.onlineMode === 1 &&
                        <View >
                          <AButton onPressOut={() => this.onButtonPress(this.props)} style={Styles.startButtonStyle}>
                            Start Game
                          </AButton>
                        </View>
                      }
                  </View>
              </View>
          </ImageBackground>
        );
      }
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
    startButtonStyle: {
      width: '100%',
      height: 30,
      alignItems: 'center',
      backgroundColor: '#20c2ff',
      marginTop: 50,
      borderRadius: 40,
      alignSelf: 'center',
      marginLeft:5,
      marginRight:5
    },
    rectView: {
      flexDirection: 'row',
      marginTop:20
    },
    rect: {
      flex: 1,
      marginLeft:5,
      marginRight:5
    },
    progress: {
      marginTop: 15
    },
    textFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        height: 22,
        color: 'white',
        marginTop: 15
    },
    waitPlayers: {
        marginTop: 300,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        height: 200,
        width: '90%',
        marginLeft: '5%'
      },
    card: {
        padding: 1.2,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#6200E0',
        margin: 10
    }
  })