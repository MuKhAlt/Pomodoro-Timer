import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {vibrate} from './utils';

const workTime = 5;
const breakTime = 3;

export default class PomodoroTimer extends React.Component {
  constructor() {
		super()

		this.state = {
			timer: workTime,
			workTimer: true
		}
  }

	componentDidMount() {
		setInterval(this.decreaseTimer, 1000)
	}

	componentDidUpdate() {
		if (this.state.timer === 0) {
			this.flipTimer()
		}
	}

	decreaseTimer = () => {
		this.setState(prevState => ({
			timer: prevState.timer - 1,
		}))
	}

	flipTimer = () => {
		this.setState(prevState => ({
			timer: prevState.workTimer ? breakTime : workTime,
			workTimer: !prevState.workTimer
		}))
		//vibrate()
	}

  render() {
    return (
      <View>
        <Text style={styles.timer}>
					{secondsToMinutesAndSeconds(this.state.timer)}
				</Text>
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
    timer: {
        fontSize: 70
    }
})