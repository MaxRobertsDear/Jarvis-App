import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Button } from 'react-native';
import weather from './assets/images'
import * as Speech from 'expo-speech';
import { APP_ID } from 'react-native-dotenv'

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: null,
        weatherReport: null,
      }
  }

  componentDidMount() {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?id=2643743&units=metric&APPID=${APP_ID}`)
      .then ( (response) => response.json() )
      .then( (responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.list,
        })
      })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    let weatherReport = ''
    let date = Date(Date.now().toString()).substring(0,16)
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let temp = this.state.dataSource.slice(0, 4).map(i => {
        let imageName = i.weather[0].main.toLowerCase()
        let url = weather[imageName].url
        weatherReport += `At ${i.dt_txt.substring(11,16)} it ${weather[imageName].advice}. `
        return (
          <View item={i} key={i.id} style={styles.container}>
            <Text>{Math.round(i.main.temp)}°C </Text>
            <Image style={styles.weatherIcon} source={url} />
            <Text>{i.dt_txt.substring(11,16)}</Text>
          </View>
        )
      })
      return (
        <View style={styles.tellMeButton}>
          <Button
            onPress={() => _speak(weatherReport)}
            title="Tell Me"
            color="#841584"
          />
          <Text>{date}</Text>
          <View style={styles.weatherContainer}>
            {temp}
          </View>
        </View>
      )
    }
  }
}

_speak = (props) => {
  Speech.speak(`Good morning, this is your daily report: ${props}`)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Verdana',
    fontSize: 20,
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
  },
  tellMeButton: {
    flex: 1,
  },
  weatherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  weatherIcon: {
    height: 34,
    width: 34
  }
});
