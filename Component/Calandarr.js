import React, { useState, Component } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
export default class Calenderr extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
            chosenDate: "",
        };
    }
    handlePicker = (datatime) => {
        this.setState({
            isVisible: false,
            chosenDate: moment(datatime).format("MMM, do YYYY HH:mm"),
        });
    };
    showpicker = () => {
        this.setState({
            isVisible: true,
        });
    };
    hiddePicker = () => {
        this.setState({
            isVisible: false,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: "red", fontSize: 20 }}>
                    {this.state.chosenDate}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.showpicker}
                >
                    <Text style={styles.button}>show calender</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hiddePicker}
                    mode={"datetime"}
                    is24Hour={false}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
    },
    button: {
        width: 250,
        height: 50,
        borderColor: "#330066",
        borderRadius: 30,
        justifyContent: "center",
        marginTop: 15,
    },
    text: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
});
