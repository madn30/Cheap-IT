import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { checkStudentDetils } from "../check";
let url =
    "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/SignUp";

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
        };
    }
    txtEmail = (email) => {
        this.setState({ email: email });
    };
    txtpass = (pass) => {
        this.setState({ pass });
    };

    btnsignUp = async () => {
        let s = await this.AddUser(this.state.email, this.state.pass);

        if (s == null) {
            console.log("didnt inserted into db!");
        } else {
            this.props.navigation.navigate("Login");
        }
    };

    AddUser = async (email, pass) => {
        let w = await checkStudentDetils(this.state.email, this.state.pass);
        let returnedObj = null;

        let obj2Send = {
            ID: 0,
            Email: email,
            Password: pass,
        };
        try {
            if (w == null) {
                return await fetch(url, {
                    method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
                    body: JSON.stringify(obj2Send),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }),
                }) // Call the fetch function passing the url of the API as a parameter
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (data) {
                        if (data != null) {
                            returnedObj = data;
                        } else {
                            console.log("didnt inserted!");
                            returnedObj = null;
                        }

                        return returnedObj;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            } else {
                alert("username already exist ");
            }
        } catch (error) {
            console.log(console.error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                        this.txtpass(text);
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    onChangeText={(email) => this.txtEmail(email)}
                />

                <Button title="Sign Up" onPress={this.btnsignUp} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: "#42A5F5",
        margin: 10,
        padding: 8,
        color: "white",
        borderRadius: 14,
        fontSize: 18,
        fontWeight: "500",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
