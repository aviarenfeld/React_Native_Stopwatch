//import react and react-native along with
var formatTime = require('minutes-seconds-milliseconds');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
//var React = require('react');
// var ReactNative = require('react-native');
// var AppRegistry = ReactNative.AppRegistry;
// var Text = ReactNative.Text;
// var View = ReactNative.View;
// var StyleSheet = ReactNative.StyleSheet;
// var TouchableHighlight = ReactNative.TouchableHighlight;

var StopWatch = React.createClass({
  //default state by declairing getInitialState === null
  //when the app starts the timer is not running. This is its default state.
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function() {
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Image
            source={require('./images/myIcon.png')}
            style={styles.logo}
            >
          </Image>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>
    </View>
  },
  laps: function() {
    return this.state.laps.map(function(time, index){
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}
      >
      <Text style={styles.buttonText}>
        {this.state.running ? 'STOP' : 'START'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function() {
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleLapPress}
      style={[styles.button, styles.lapButton]}
      >
      <Text style={styles.buttonText}>
        LAP
      </Text>
    </TouchableHighlight>
  },
  //State is an obect used to tract and respond to user input
  //State represent where the user is in the usage of the app
  //when state is updated it causes the component to re render
  handleStartPress: function() {
    //is the timer running?
    //change the state to false
    //then we return to stop the program from continuing and restarting
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    var startTime = new Date();
    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 25);
  },
  //when you hit lap update start time to curent time
  //since you dont want to modify directly
  //use laps: this.state.laps.concat([lap]) to update the new array
  handleLapPress: function() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  /*This is a helper function for the border color styles*/
  /**/
  border: function(color){
    return {
      borderColor: color,
      borderWidth: 5
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //To Fill the entire screen
    alignItems: 'stretch',
    backgroundColor: 'gray'
  },
  header: { //blue these elemets are siblings so flex 1 divides the space equaly
    flex: 1
  },
  footer: { //yellow
    flex: 1,
  },
  //use flexbox as often as possible when building mobile apps.
  //Try to not set fixed hights and widths except for certain elements like a button
  timerWrapper: {
    flex: 5, //takes 5/8 of avaibale space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3, //takes 3/8 of availabel space
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60,
    fontFamily: 'helvetica',
    letterSpacing: 7,
    fontWeight: '100'
  },
  button: {
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'helvetica',
  },
  startButton: {
    borderColor: 'lime',
  },
  stopButton: {
    borderColor: 'red',
  },
  lapButton: {
   borderColor: 'black',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  },
  logo: {
    //flex: 2,
    backgroundColor: 'gray',
    height: 100,
    width: 120,
    padding: 40,
    marginBottom: 20,
    marginTop: 40,
  },
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);