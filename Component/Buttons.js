import React, { Component } from "react";
import { View } from "react-native";
import { ButtonGroup, Text } from "react-native-elements";
const buttons = ["קרקע", "מדרגות", "מעלית"];

export default class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: -1,
      Name: "",
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex, Name: buttons[selectedIndex] }, () => {
      this.props.sendhowyouwannadoit(this.state.Name);

      // temp: "",
    });
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <View>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
            top: 20,
          }}
        >
          <Text style={{ color: "white" }}>ציין את דרך הגישה</Text>
        </View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            height: 30,
            marginBottom: 40,
            marginTop: 40,
          }}
        />
      </View>
    );
  }
}
