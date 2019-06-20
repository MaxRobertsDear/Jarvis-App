import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
<<<<<<< HEAD
  Button,
<<<<<<< HEAD
  TextInput
=======
  Button
>>>>>>> cf2440a... pass traveltime to parent app.js
=======
  TextInput,
  Picker
>>>>>>> 4208eea... Separated into Home and Settings Screens
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as Speech from "expo-speech";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LinearGradient } from "expo";
import { Weather } from "./app/components/Weather";
import weatherScript from "./app/utils/WeatherScript";
import { APP_ID } from "react-native-dotenv";
import { homeBackground } from "./app/utils/Colours";
import TravelTime from "./app/components/TravelTime.js";
import { journeyTime } from "./app/components/TravelTime.js";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.storeTravelTime = this.storeTravelTime.bind(this);
    this.state = {
      isLoading: true,
      dataSource: null,
      weatherReport: null,
      latitude: null,
<<<<<<< HEAD
      longitude: null,
      text: "Enter Postcode",
<<<<<<< HEAD
      postcode: ""
=======
      longitude: null
>>>>>>> cf2440a... pass traveltime to parent app.js
=======
      postcode: "",
<<<<<<< HEAD
      speechRate: 1,
>>>>>>> b2e83d3... Added picker to settings to choose speech rate
=======
      speechRate: 1.0,
>>>>>>> 3682286... Basic styling for settings page
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("DENIED");
    }
    let location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    this.setState({ latitude, longitude });
  };

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.list.slice(0, 4)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  storeTravelTime(travelTime) {
    this.setState({
      travelTime
    });
  }

  componentDidMount() {
    this._getLocationAsync().then(() => {
      this.fetchWeather(this.state.latitude, this.state.longitude);
    });
  }

  generateWeatherReport = () => {
    weatherReport = "";
    allWeather = [];
    allTemp = [];
    this.state.dataSource.map(i => {
      allWeather.push(i.weather[0].main.toLowerCase());
      allTemp.push(Math.round(i.main.temp));
    });
    uniqWeather = new Set(allWeather);
    if (uniqWeather.length === 1) {
      weatherReport += `It is ${
        weatherScript[allWeather[0]].current
      } and will continue to be for a while. ${
        weatherScript[allWeather[0]].advice
      }.`;
    } else {
      if (allWeather[1].includes(allWeather[0])) {
        weatherReport += `It is mainly ${
          weatherScript[allWeather[0]].current
        }.,`;
      } else {
        weatherReport += `It is ${weatherScript[allWeather[0]].current}, and ${
<<<<<<< HEAD
          weatherScript[allWeather[1]].soon
=======
          allWeather[1].soon
>>>>>>> cf2440a... pass traveltime to parent app.js
        }.,`;
      }
      if (allWeather[3].includes(allWeather[2])) {
        weatherReport += `It will also be mostly ${
          weatherScript[allWeather[2]].later
        }.`;
      } else {
        weatherReport += `It will also be ${allWeather[2]
        }, and ${allWeather[3]} later.`;
      }
      weatherReport += `${weatherScript[allWeather[3]].advice}.,`;
    }
    weatherReport += `The temperature is currently ${[
      allTemp[0]
<<<<<<< HEAD
    ]} degrees and will later be around ${[allTemp[3]]} degrees.,`;
    weatherReport += `Today it will take you ${
      this.state.travelTime
    } minutes to get to work.,`;
    return weatherReport;
  };

  onSubmitEdit = e => {
    let input = e.nativeEvent.text;
    this.setState({ postcode: input });
  };

=======
    ]} degrees and will later be around ${[allTemp[3]]} degrees.`;
    weatherReport += `Today it will take you ${
      this.state.travelTime
    } minutes to get to work.`;
    return weatherReport;
  };

>>>>>>> cf2440a... pass traveltime to parent app.js
  render() {
    let date = Date(Date.now().toString()).substring(0, 16);
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const weatherSummary = this.generateWeatherReport();
      return (
        <LinearGradient
          colors={["#2980B9", "#6DD5FA", "#FFFFFF"]}
          style={styles.backgroundContainer}
        >
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => _speak(weatherSummary, this.state.speechRate)}
                title="Tell Me"
                color="#0B3954"
              />
              <Button
                onPress={() => this.props.navigation.navigate('Settings')}
                title="Settings"
              />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
            <View style={styles.weatherContainer}>
              <Weather weatherData={this.state.dataSource} />
            </View>
            <View style={styles.dateContainer}>
<<<<<<< HEAD
              <TravelTime
                postcode={this.state.postcode}
                storeTravelTime={this.storeTravelTime}
              />
            </View>

            <View>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                onSubmitEditing={this.onSubmitEdit}
                autoCompleteType={"postal-code"}
                returnKeyType={"done"}
                clearTextOnFocus={true}
              />
=======
              <Text>Today's commute: </Text>
              <TravelTime storeTravelTime={this.storeTravelTime} />
>>>>>>> cf2440a... pass traveltime to parent app.js
            </View>
          </View>
        </LinearGradient>
      );
=======
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen'
import SettingsScreen from './app/screens/SettingsScreen'
=======
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./app/screens/HomeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
>>>>>>> 2a9e15a... add calendar

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
<<<<<<< HEAD
<<<<<<< HEAD
      headerTitle: 'Jarvis'
>>>>>>> 44f3cb4... Separated home and settings screen and added destination form to settings page
=======
      headerTitle: "Jarvis"
>>>>>>> 2a9e15a... add calendar
=======
      headerTitle: "JARVIS",
      headerStyle: {
        marginTop: 15,
        backgroundColor: "#2980B9",
        borderBottomWidth: 0,
        borderColor: "#2980B9",
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28,
        letterSpacing: 8,
      },
>>>>>>> 3b65d7c... Added styling to home and settings pages
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTitle: "SETTINGS",
      headerStyle: {
        marginTop: 15,
        backgroundColor: "#2980B9",
        borderBottomWidth: 0,
        borderColor: "#2980B9",
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 4,
      },
    }
  }
});

export default createAppContainer(AppNavigator);
