import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, TouchableOpacity } from "react-native";

class LocationItem extends Component {
    _handlePress = async () => {
        const res = await this.props.fetch;
        alert(JSON.stringify(res));
    };
    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={this._handlePress}>
                <Text>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
    },
});

export default LocationItem;
