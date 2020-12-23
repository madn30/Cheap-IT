import React, { useState, Component } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox, ThemeConsumer } from "react-native-elements";
import moment from "moment";
import "moment/locale/he";

export default class Checks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: "",
            isVisible: false,
            checkerfirst: false,
            checkersecond: false,
            checkerthird: false,
        };
    }

    firstpress = () => {
        //   const today = moment().locale("he");
        let today = moment(today).format("MMMM Do, YYYY ");
        console.log(today);
        this.setState(
            {
                checkerfirst: true,
                checkersecond: false,
                checkerthird: false,
            },
            () => {
                this.props.senddataa(today);
            }
        );
    };

    secondpress = () => {
        let tomorrow = moment(tomorrow).add(1, "day").format("MMMM Do, YYYY "); // for specific format
        console.log(tomorrow);

        this.setState(
            {
                checkerfirst: false,
                checkersecond: true,
                checkerthird: false,
            },
            () => {
                this.props.senddataa(tomorrow);
            }
        );
    };
    handlePicker = (datatime) => {
        this.setState(
            {
                isVisible: false,
                chosenDate: moment(datatime).format("MMMM Do, YYYY "),
            },
            () => {
                this.props.senddataa(this.state.chosenDate);
            }
        );
        console.log(this.state.chosenDate);
    };
    showpicker = () => {
        this.setState({
            isVisible: true,
            checkerfirst: false,
            checkersecond: false,
            checkerthird: true,
        });
    };
    hiddePicker = () => {
        this.setState({
            isVisible: false,
        });
    };
    render() {
        return (
            <View
                style={{
                    alignItems: "stretch",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <View>
                    <CheckBox
                        title="    היום"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={this.firstpress}
                        checked={this.state.checkerfirst}
                    />
                </View>
                <View>
                    <CheckBox
                        left
                        title="    למחר"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={this.secondpress}
                        checked={this.state.checkersecond}
                    />
                    <CheckBox
                        left
                        title="    בחר תאריך"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={this.showpicker}
                        checked={this.state.checkerthird}
                    />
                    <DateTimePickerModal
                        locale={"he"}
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hiddePicker}
                        // mode={"datetime"}
                        is24Hour={false}
                    />
                </View>
            </View>
        );
    }
}
