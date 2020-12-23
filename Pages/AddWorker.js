import { NavigationHelpersContext } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { CheckBox } from "react-native-elements";

export default class AddWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Moving: false,
            Cleanning: false,
            Handiman: false,
            Computers: false,
            ElectricHome: false,
            WorkArray: [],
        };
    }
    AddToArray = async (val) => {
        var joined = this.state.WorkArray.concat(val);
        this.setState({ WorkArray: joined });
        // console.log(this.state.WorkArray);
    };
    ContiuePressed = async () => {
        if (
            (this.state.Moving && (await this.AddToArray("Moving"))) ||
            (this.state.Cleanning && (await this.AddToArray("Cleaning"))) ||
            (this.state.Handiman && (await this.AddToArray("Handiman"))) ||
            (this.state.Computers && (await this.AddToArray("Computer"))) ||
            (this.state.ElectricHome && (await this.AddToArray("Electric")))
        ) {
            // console.log("atleast on true");
        } else {
            console.log("all false");
        }
        this.props.navigation.navigate("AddWorkerSecond", {
            Jobs: this.state.WorkArray,
        });
    };
    render() {
        return (
            <View style={{ justifyContent: "center", marginTop: 50 }}>
                <Text style={{ textAlign: "center", fontSize: 40 }}>
                    במה אתה מתמחה?
                </Text>
                <Text
                    style={{
                        marginLeft: 20,
                        marginTop: 10,
                        color: "red",
                    }}
                >
                    בחר רק שלושה מהתחומים
                </Text>
                <CheckBox
                    containerStyle={{ marginTop: 50, borderColor: "red" }}
                    size={30}
                    title="הובלות"
                    //// checkedIcon={<Image source={require("../checked.png")} />}
                    //  uncheckedIcon={<Image source={require("../unchecked.png")} />}
                    checked={this.state.Moving}
                    onPress={() =>
                        this.setState({ Moving: !this.state.Moving })
                    }
                />
                <CheckBox
                    containerStyle={{ borderColor: "red" }}
                    size={30}
                    title="ניקיון"
                    //// checkedIcon={<Image source={require("../checked.png")} />}
                    //  uncheckedIcon={<Image source={require("../unchecked.png")} />}
                    checked={this.state.Cleanning}
                    onPress={() =>
                        this.setState({ Cleanning: !this.state.Cleanning })
                    }
                />
                <CheckBox
                    containerStyle={{ borderColor: "red" }}
                    size={30}
                    title="הנדימן"
                    //// checkedIcon={<Image source={require("../checked.png")} />}
                    //  uncheckedIcon={<Image source={require("../unchecked.png")} />}
                    checked={this.state.Handiman}
                    onPress={() =>
                        this.setState({ Handiman: !this.state.Handiman })
                    }
                />
                <CheckBox
                    containerStyle={{ borderColor: "red" }}
                    size={30}
                    title="טכנאי מחשבים"
                    //// checkedIcon={<Image source={require("../checked.png")} />}
                    //  uncheckedIcon={<Image source={require("../unchecked.png")} />}
                    checked={this.state.Computers}
                    onPress={() =>
                        this.setState({ Computers: !this.state.Computers })
                    }
                />
                <CheckBox
                    containerStyle={{ borderColor: "red" }}
                    size={30}
                    title="מוצרי חשמל"
                    //// checkedIcon={<Image source={require("../checked.png")} />}
                    //  uncheckedIcon={<Image source={require("../unchecked.png")} />}
                    checked={this.state.ElectricHome}
                    onPress={() =>
                        this.setState({
                            ElectricHome: !this.state.ElectricHome,
                        })
                    }
                />
                <View
                    style={{ marginTop: 30, width: 100, alignSelf: "center" }}
                >
                    <Button
                        title="המשך"
                        onPress={() => {
                            this.ContiuePressed();
                        }}
                    ></Button>
                </View>
            </View>
        );
    }
}
