import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Input, Button, Text, Divider, CheckBox } from "react-native-elements";
import Camera from "../Component/Camera";
import ImagesList from "../Component/ImagesList";
import AsyncStorage from "@react-native-community/async-storage";
import { HandelImageWorker } from "../HandelImageWorker";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import Constants from "expo-constants";
const config = {
  gcmSenderId: "114152557440",
};
export default class AddWorkerThird extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Detail: "",
      PC: "",
      Phone: "",
      Mail: "",
      images: [],
      Token: "",
    };
  }
  GetTheTokenForPushNotification = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const expotoken = (await Notifications.getExpoPushTokenAsync()).data;
      this.setState({
        Token: expotoken,
      });
    }
  };
  UploadToDB = async (data) => {
    await this.GetTheTokenForPushNotification();
    const dataa = this.state;
    const Id = await AsyncStorage.getItem("@storage_Key");
    data = {
      ...data,
      DetailWorker: this.state.Detail,
      PrivateCompany: this.state.PC,
      PhoneNumber: this.state.Phone,
      Mail: this.state.Mail,
      NumberOfImage: this.state.images.length,
      IDUser: JSON.parse(Id).ID,
      Token: this.state.Token,
    };
    await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Worker",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then(async function (data) {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("@WorkerID", jsonValue);

          await HandelImageWorker(dataa.images, data);
        } catch (e) {
          console.log(e);
        }
      })

      .catch((err) => {});

    this.props.navigation.push("Tabs");
  };
  render() {
    const params = this.props.route.params;

    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Input
          multiline={true}
          placeholder={"ספר קצת על עצמך\n\n\n"}
          onChangeText={(text) => {
            this.setState({ Detail: text });
          }}
        ></Input>
        <Text>ח.פ</Text>
        <Input
          placeholder={"הזן ח.פ חוקי"}
          onChangeText={(text) => {
            this.setState({ PC: text });
          }}
        ></Input>
        <Input
          placeholder={"הזן מספר פלאפון"}
          onChangeText={(text) => {
            this.setState({ Phone: text });
          }}
        ></Input>
        <Input
          placeholder={"הזן כתובת מייל"}
          onChangeText={(text) => {
            this.setState({ Mail: text });
          }}
        ></Input>

        <View style={{ flexDirection: "row", flex: 1 }}>
          <Camera
            imagesforshow={this.state.images}
            name={{ name: "MovingPage" }}
            getindexfordelete={(index) => {
              const images = this.state.images;
              images.splice(index, 1);
              this.setState({ images });
            }}
            setImage={(image) => {
              const imageId = Math.floor(Math.random() * 999999);
              const images = [
                ...this.state.images,
                {
                  id: imageId,
                  uri: image,
                },
              ];

              this.setState({
                images: images,
              });
            }}
          />
        </View>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          בלחיצה על המשך הנך מאשר את התקנון
        </Text>
        <Button
          title="המשך"
          onPress={() => {
            this.UploadToDB(params);
          }}
        ></Button>
      </View>
    );
  }
}
