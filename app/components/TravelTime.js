import React, { Component } from "react";
import * as Expo from "expo";
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native";

export default class TravelTime extends Component {
  constructor() {
    super();
    this.getLocationAsync = this.getLocationAsync.bind(this);
    this.getDestinationAsync = this.getDestinationAsync.bind(this);
    this.getTravelTimeAsync = this.getTravelTimeAsync.bind(this);
    this.state = {
      currentLocation: null,
      destination: null,
      errorMessage: null,
      dataSource: null,
      postcode: ""
    };
  }

  _getPostcode = async () => {
    var postcode = await AsyncStorage.getItem("destination");
    this.setState({ postcode });
  };

  getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let currentLocation = await Expo.Location.getCurrentPositionAsync({});

    let currentCoords = {
      lat: currentLocation.coords.latitude,
      long: currentLocation.coords.longitude
    };
    this.setState({ currentLocation, currentCoords });
  };

  getDestinationAsync = async () => {
    let destination = await Expo.Location.geocodeAsync(this.state.postcode);

    let destinationCoords = {
      lat: destination[0].latitude,
      long: destination[0].longitude
    };
    this.setState({ destination, destinationCoords });
  };

  getTravelTimeAsync(currentLat, currentLong, destLat, destLong) {
    fetch(
      `https://developer.citymapper.com/api/1/traveltime/?startcoord=${currentLat}%2C${currentLong}&endcoord=${destLat}%2C${destLong}&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=3ee8f8245289eb41dc76fed89788eea2`
    )
      .then(response => response.json())
      .then(responseJson => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf2440a... pass traveltime to parent app.js
        this.setState(
          {
            dataSource: responseJson.travel_time_minutes
          },
          () => {
            this.props.storeTravelTime(responseJson.travel_time_minutes);
          }
        );
<<<<<<< HEAD
=======
        this.setState({
          dataSource: responseJson.travel_time_minutes
        });
>>>>>>> 102785f... commit 1
=======
>>>>>>> cf2440a... pass traveltime to parent app.js
      })
      .catch(error => {});
  }

<<<<<<< HEAD
  updateDestination = () => {
=======
  componentDidMount() {
    // NB below async = gamble! fix if possible.
>>>>>>> 102785f... commit 1
    this.getDestinationAsync().then(() => {
      this.getLocationAsync().then(() => {
        this.getTravelTimeAsync(
          this.state.currentCoords.lat,
          this.state.currentCoords.long,
          this.state.destinationCoords.lat,
          this.state.destinationCoords.long
        );
      });
    });
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
  componentDidMount() {
    this._getPostcode();
  }

>>>>>>> a03f84c... Async storage saves destination, speechRate, and name
  componentDidUpdate(prevProps, prevState) {
    if (prevState.postcode !== this.state.postcode) {
      this.updateDestination();
    }
  }

  render() {
    var journeyTime = this.state.dataSource;
    if (this.state.postcode != '' && journeyTime != null) {
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Today's commute:
          </Text>
          <Text style={{ color: '#FFFFFF', lineHeight: 24 }}>
            {journeyTime} minutes to {this.state.postcode}.
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={{ color: '#FFFFFF' }}>Update your Travel destination in settings.</Text>
      );
    }
=======
  render() {
    var journeyTime = this.state.dataSource;
    return <Text>{journeyTime}</Text>;
>>>>>>> 102785f... commit 1
  }
}
