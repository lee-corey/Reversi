import React from "react";
import LinearProgress from "material-ui/LinearProgress";
import * as Progress from 'react-native-progress';
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.initialCount = 20;
    this.state = {
      timerCount: this.initialCount,
      qid: 1
    };
  } //constructor
  cleanUp() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState((prevState, props) => {
      // on every tick we reduce the counter value
      if(props.finish){
        return {
          timerCount: 0
        }
      }

      if(prevState.timerCount <= -1){
        return {
          timerCount: this.initialCount +2
        }
      }
      return {
        timerCount: prevState.timerCount - 1
      };
    });
  } //tick

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    this.cleanUp();
  }
  render() {
    return (
      <Progress.Bar progress={(this.initialCount-this.state.timerCount)*0.05} width={this.props.width} />
      );
  } //render
} //Timer
//<LinearProgress className="Timer" mode="determinate" color="#6200EA" min={0} max={this.initialCount} value={this.initialCount-this.state.timerCount}/>
      
 {/*<div className="Timer">
        {" "}Time Remaining: {this.state.timerCount} s
      </div>*/}

export default Timer;
