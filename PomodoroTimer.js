import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {vibrate} from './utils';


const workTime = 5;
const breakTime = 3;

export default class PomodoroTimer extends React.Component {
  constructor() {
		super()

		this.state = {
			timer: workTime,
			workTimer: true,
			paused: true
		}
  }

	hideNavigation = () => {
    hideNavigationBar();
  };

	componentDidMount() {
		setInterval(this.decreaseTimer, 1000)
	}

	componentDidUpdate() {
		if (this.state.timer === -1) {
			this.flipTimer()
		}
	}

	decreaseTimer = () => {
		if (this.state.paused === false) {
			this.setState(prevState => ({
				timer: prevState.timer - 1,
			}))
		}
	}

	flipTimer = () => {
		this.setState(prevState => ({
			timer: prevState.workTimer ? breakTime : workTime,
			workTimer: !prevState.workTimer
		}))
		//vibrate()
	}

	startOrPause = () => {
		this.setState(prevState => ({
			paused: !prevState.paused
		}))
	}

	reset = () => {
		this.setState(prevState => ({
			timer: prevState.workTimer ? workTime : breakTime,
			paused: true
		}))
	}

  render() {
    return (
      <View style={[styles.container, {	backgroundColor: this.state.workTimer ? "#ADD8E6" : "#90EE90"}]}>
				<Text style={styles.text}>
					{this.state.workTimer ? "Work Time" : "Break Time"}
				</Text>
        <Text style={styles.text}>
					{secondsToMinutesAndSeconds(this.state.timer)}
				</Text>
				<View style={styles.button}>
					<View  style={styles.button}>
						<Button title={this.state.paused ? "Start" : "Pause"} onPress={this.startOrPause} />
					</View>
					<View  style={styles.button}>
						<Button title="Reset" onPress={this.reset} />
					</View>
				</View>
      </View>
    )
  }
}

/**
 * turns seconds into the format {minutes:seconds}
 * @param  {Number} s number of seconds to convert
 * @return {String} "minutes:seconds"
 */
function secondsToMinutesAndSeconds(s) {
    const minutes = "" + Math.floor(s / 60);
    let seconds = "" + s % 60;
    if (seconds.length === 1) {seconds = `0${seconds}`}

    return `${minutes}:${seconds}`
}

const styles = StyleSheet.create({
	text: {
		fontSize: 70,
		textAlign: "center",
		marginBottom: 20,
	},

	button: {
		flexDirection: "row",
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
	},

	container: {
		flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})