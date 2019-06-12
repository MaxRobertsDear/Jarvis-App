import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Button } from 'react-native';
import weather from './assets/images'
import * as Speech from 'expo-speech';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: null,
      }
  }

  componentDidMount() {
    return fetch('https://samples.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=b6907d289e10d714a6e88b30761fae22')
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
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let temp = this.state.dataSource.slice(0, 24).map(i => {
        if (i.dt_txt.includes("08:00") || i.dt_txt.includes("12:00") || i.dt_txt.includes("16:00") || i.dt_txt.includes("20:00")) {
          let imageName = i.weather[0].main.toLowerCase()
          let url = weather[imageName].url
          let weatherInfo = `At ${i.dt_txt.substring(11,16)} it ${weather[imageName].advice}`
          return (
            <View item={i} key={i.id} style={styles.container}>
              <Text>{Math.round(i.main.temp - 273.15) }°C </Text>
              <Image style={styles.weatherIcon} source={url} />
              <Text>{i.dt_txt.substring(11,16)}</Text>
              <Button
                onPress={() => _speak(weatherInfo)}
                title="Tell Me"
                color="#841584"
              />
            </View>
          )
        }
      })
      return (
        <View style={styles.weatherContainer}>
          {temp}
        </View>
      )
    }
  }
}

_speak = (props) => {
  Speech.speak(props)
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
