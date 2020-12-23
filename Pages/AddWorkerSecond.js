import React, { Component, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import { Input, Slider } from "react-native-elements";
import GoogleAutuComplete from "../Component/GoogleAutuComplete";
export default class AddWorkerSecond extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null, locationchosen: "", longitude: 0, latitude: 0 };
  }
  getData = (data) => {
    this.setState({
      locationchosen: data,
      sendtofatherprediction: "",
    });
  };
  GetLatLon = (lat, lon) => {
    this.setState({ longitude: lon, latitude: lat });
  };
  render() {
    const params = this.props.route.params;
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <Text style={{ alignSelf: "center", marginTop: 60 }}>
          מה הכתובת שלך ?
        </Text>
        <View style={{ flex: 0.3 }}>
          <GoogleAutuComplete
            name={{ name: "AddWorkerSecond" }}
            senddataa={(data) => this.getData(data)}
            SentLatLong={(lat, lon) => this.GetLatLon(lat, lon)}
            sendtofatherprediction={(data) =>
              this.setState({
                sendtofatherprediction: data,
              })
            }
          />
        </View>

        <HideWithKeyboard
          style={{
            flex: 1,
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <Text style={{}}>הצעות ברדיוס של ?</Text>
          <Slider
            step={1}
            trackStyle={{
              alignSelf: "flex-end",
              shadowColor: "red",
            }}
            maximumValue={100}
            value={this.state.value}
            onValueChange={(value) => this.setState({ value })}
            thumbStyle={{
              alignSelf: "flex-end",
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              Component: Animated.Image,
              source: {
                uri:
                  "https://image.shutterstock.com/image-illustration/small-yellow-compact-car-260nw-394558741.jpg",
              },
            }}
          />

          <Text>{this.state.value}:ק"מ</Text>
          <Button
            p
            title="המשך"
            onPress={() => {
              this.props.navigation.navigate("AddWorkerThird", {
                Jobs: params.Jobs,
                Location: this.state.locationchosen,
                Distance: this.state.value,
                Latidude: this.state.latitude,
                Longitude: this.state.longitude,
              });
            }}
          ></Button>
        </HideWithKeyboard>
      </View>
    );
  }
}
