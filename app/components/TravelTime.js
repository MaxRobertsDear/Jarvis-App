import React, { Component } from "react";
import * as Expo from "expo";
import { StyleSheet, Text, View } from "react-native";

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
      dataSource: null
    };
  }

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
    console.log(this.props.postcode);
    let destination = await Expo.Location.geocodeAsync(this.props.postcode);

    let destinationCoords = {
      lat: destination[0].latitude,
      long: destination[0].longitude
    };
    this.setState({ destination, destinationCoords });
  };

  getTravelTimeAsync(currentLat, currentLong, destLat, destLong) {
    // let travelTime = await fetch ('https://developer.citymapper.com/api/1/traveltime/?startcoord=+51.558079%2C-0.120810&endcoord=51.558823%2C-0.121487&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=e2567df81c88213608d82487879b3f96')
    // fetch (`https://developer.citymapper.com/api/1/traveltime/?startcoord=51.51727169201791%2C-0.07331195425420282&endcoord=51.5583838%2C-0.123121&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=e2567df81c88213608d82487879b3f96`)
    fetch(
      `https://developer.citymapper.com/api/1/traveltime/?startcoord=${currentLat}%2C${currentLong}&endcoord=${destLat}%2C${destLong}&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=e2567df81c88213608d82487879b3f96`
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
      .catch(error => {
        console.log(error);
      });
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
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.postcode !== this.props.postcode) {
      this.updateDestination();
    }
  }

  render() {
    var journeyTime = this.state.dataSource;
    if (this.props.postcode != "" && journeyTime != null) {
      return (
        <Text>
          Today's commute: {journeyTime} minutes to {this.props.postcode}
        </Text>
      );
    } else {
      return <Text>Please enter your postcode</Text>;
    }
=======
  render() {
    var journeyTime = this.state.dataSource;
    return <Text>{journeyTime}</Text>;
>>>>>>> 102785f... commit 1
  }
}
