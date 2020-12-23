import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Input } from "react-native-elements";
import { checkStudentDetils } from "../check";
import AsyncStorage from "@react-native-community/async-storage";

let url =
    "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/login";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",
            passText: "",
        };
    }

    txtchgEmail = (emailText) => {
        this.setState({ emailText });
    };

    txtchgPass = (passText) => {
        this.setState({ passText });
    };
    btnSignUp = () => {
        this.props.navigation.navigate("SignUp");
    };
    btnLogin = async () => {
        let s = await checkStudentDetils(
            this.state.emailText,
            this.state.passText
        );

        if (s != null) {
            try {
                const jsonValue = JSON.stringify(s);
                await AsyncStorage.setItem("@storage_Key", jsonValue);
            } catch (e) {
                console.log(e);
            }

            this.props.navigation.navigate("Tabs");
        } else {
            console.log("err login!");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/cheapit.png")}
                ></Image>
                <View style={styles.viewCss}>
                    <View style={styles.viewCss}>
                        <Text>Email:</Text>
                        <View
                            style={{
                                width: 200,
                            }}
                        >
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email"
                                keyboardType="email-address"
                                placeholder="Email"
                                textContentType="emailAddress"
                                value={this.state.emailText}
                                onChangeText={(text) => {
                                    this.txtchgEmail(text);
                                }}
                                placeholder="enter email"
                            ></Input>
                        </View>
                    </View>

                    <View style={styles.viewCss}>
                        <Text>Pass:</Text>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            placeholder="password"
                            secureTextEntry
                            textContentType="password"
                            keyboardType="visible-password"
                            value={this.state.passText}
                            onChangeText={(text) => {
                                this.txtchgPass(text);
                            }}
                            placeholder="enter password"
                        ></Input>
                    </View>
                </View>
                <View style={[{ width: "70%", margin: 10 }]}>
                    <View>
                        <Button title="Login" onPress={this.btnLogin} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button title="SignUp" onPress={this.btnSignUp} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginBottom: 60,
        justifyContent: "center",
        padding: 10,
    },
    viewCss: {
        padding: 10,
    },
    buttons: {
        alignSelf: "center",
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",

        marginBottom: 60,
    },
});
