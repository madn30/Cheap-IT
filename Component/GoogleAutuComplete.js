import React, { Component, createRef } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const apikey = "AIzaSyAaU7HltXzkCjnhlhMB1FC_aEa4qcpjvDg";
class GoogleAutuComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: "",
      predictions: [],
      temp: "",
      place_id: "",
      predicationHeight: 0,
    };
  }
  async play(val, placeid) {
    await this.setState({
      place_id: placeid,
    });
    const placeapi = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.state.place_id}&fields=name,geometry,formatted_address&key=${apikey}`;
    const resultplace = await fetch(placeapi);
    const jsonplace = await resultplace.json();
    this.setState(
      {
        latitude: jsonplace.result.geometry.location.lat,
        longitude: jsonplace.result.geometry.location.lng,
        temp: val,
      },
      () => {
        if (this.props.name.name == "AddWorkerSecond") {
          this.props.senddataa(val);
          this.props.SentLatLong(this.state.latitude, this.state.longitude);
        } else {
          this.props.senddata(val);
          this.props.SentLatLong(this.state.latitude, this.state.longitude);
        }
      }
    );
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }
  async onChangeDestination(destination) {
    this.setState({ destination });

    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apikey}&input=${destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;

    try {
      const result = await fetch(apiUrl);
      const json = await result.json();

      this.setState({
        predictions: json.predictions,
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const predictions = this.state.predictions.map((predication) => (
      <TouchableOpacity
        key={predication.place_id}
        onPress={() => {
          this.play(predication.description, predication.place_id);
        }}
      >
        <Text style={styles.suggestion}>{predication.description}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        {this.props.name.name != "AddWorkerSecond" && (
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation={true}
          />
        )}
        <View
          style={{
            marginBottom: 0,
            width: Dimensions.get("window").width - 40,
            marginLeft: 20,
            //position: "relative",
            flex: 0.8,
          }}
        >
          <TextInput
            value={`${this.state.temp}`}
            placeholder="בחר מיקום"
            style={styles.destinationInput}
            onChangeText={(destination) => {
              this.onChangeDestination(destination),
                this.setState({ temp: destination });
            }}
          />
          <View
            onLayout={(e) =>
              this.props.sendtofatherprediction(e.nativeEvent.layout.height)
            }
          >
            {predictions}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  suggestion: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 15,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  container: {
    flex: 0.7,
  },
  map: {
    width: Dimensions.get("window").width - 40,

    height: 200,
    marginTop: 50,
    marginLeft: 20,
  },
  destinationInput: {
    height: 40,
    borderWidth: 1,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white",
  },
});

export default GoogleAutuComplete;
