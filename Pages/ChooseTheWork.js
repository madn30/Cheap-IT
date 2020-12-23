import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
export default class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  moving = () => {
    this.props.navigation.navigate("MovingPage", (Name = "moving"));
  };
  cleanning = () => {
    this.props.navigation.navigate("CleaningPage", (Name = "cleanning"));

    alert(this.state.choise);
  };
  Electronic = () => {
    this.props.navigation.navigate("ElectricPage", (Name = "Electronic"));
  };
  HandiMan = () => {
    this.props.navigation.navigate("HandiManPage", (Name = "HandiMan"));
  };
  Coumputers = () => {
    this.props.navigation.navigate("ComputersPage", (Name = "Coumputers"));
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#4e4a41" }}>

        <TouchableOpacity onPress={this.moving}>
          <Image
            style={styles.cardImage}
            source={require("../assets/images.png")}
          />
          <Text style={styles.cardText}>הובלות </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.cleanning}>
          <Image
            style={styles.cardImage}
            source={require("../assets/cleanning.jpg")}
          />
          <Text style={styles.cardText}>ניקיון </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.Coumputers}>
          <Image
            style={styles.cardImage}
            source={require("../assets/Computer.jpg")}
          />
          <Text style={styles.cardText}>מחשבים </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.Electronic}>
          <Image
            style={styles.cardImage}
            source={require("../assets/Electronic.jpg")}
          />
          <Text style={styles.cardText}>אלקטרוניקה </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.HandiMan}>
          <Image
            style={styles.cardImage}
            source={require("../assets/HandiMan.png")}
          />
          <Text style={styles.cardText}>הנדי-מן </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#F5FCFF",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 30,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red",
    alignSelf: "center",
  },
  cardText: {
    color: "white",
    padding: 10,
    fontSize: 16,
    alignSelf: "center",
  },
});
