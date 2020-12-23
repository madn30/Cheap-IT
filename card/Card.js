import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default class Card extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            choise: "",
        };
    }

    render() {
        return (
            <View key={this.state.choise}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => alert(this.state.choise)}
                >
                    <Image
                        style={styles.cardImage}
                        source={require("../assets/images.png")}
                    />
                    <Text style={styles.cardText}>הובלות </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginBottom: 10,
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
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    cardText: {
        padding: 10,
        fontSize: 16,
        alignSelf: "center",
    },
});
