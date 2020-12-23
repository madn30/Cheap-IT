import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Input, Button, Text, Divider, CheckBox } from "react-native-elements";
import Buttons from "../Component/Buttons";
import GoogleAutuComplete from "../Component/GoogleAutuComplete";
import { ScrollView } from "react-native-gesture-handler";
import Camera from "../Component/Camera";
import Checks from "../Component/Checks";
import AsyncStorage from "@react-native-community/async-storage";
import { PushNotification } from "../Component/PushNotification";
// import { calender } from "react--calendars";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
let url =
  "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Jobs/Moving/PostToDB";

export default class moving extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      datechosen: "",
      locationchosen: "",
      images: [],
      How: "",
      Detail: "",
      From: "",
      To: "",
      idjob: "",
      Latitude: 0,
      longitude: 0,
    };
  }
  GetLatLon = (lat, lon) => {
    this.setState({
      Latitude: lat,
      longitude: lon,
    });
  };
  getData = (data) => {
    this.setState({ locationchosen: data });
  };
  getDataDate = (data) => {
    this.setState({ datechosen: data });
  };
  gethowyouwannadoit = (data) => {
    this.setState({ How: data });
  };
  checkvalidation = async () => {
    if (
      !(
        this.state.Detail &&
        this.state.How &&
        this.state.datechosen &&
        this.state.locationchosen &&
        this.state.To &&
        this.state.From &&
        this.state.images.length
      )
    ) {
      Alert.alert("אחד או יותר מהשדות ריק או לא תקין ");
    } else {
      this.uploadproduct();
    }
  };

  uploadproduct = async () => {
    const Id = await AsyncStorage.getItem("@storage_Key");
    let obj2Send = {
      AboutJob: this.state.Detail,
      How: this.state.How,
      WhenJob: this.state.datechosen,
      Place: this.state.locationchosen,
      To: this.state.To,
      From: this.state.From,
      IdUser: JSON.parse(Id).ID,
      NumberOfImage: this.state.images.length,
    };

    this.UploatToDB(obj2Send);
  };
  HandelImage = async (images) => {
    const Id = await AsyncStorage.getItem("@storage_Key");

    for (let i = 0; i <= images.length; i++) {
      try {
        let obj = {
          base64String: images[i]["uri"],
          name: "Moving" + i,
          path: this.state.idjob,
        };
        await fetch(
          "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Upload",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(obj),
          }
        )
          .then((response) => response.json())
          .then(function (data) {})

          .catch((err) => {
            console.error(err);
          });
      } catch (e) {
        console.log("Error");
      }
    }
  };

  UploatToDB = async (obj) => {
    const { navigation } = this.props;
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        this.setState({ idjob: data["ID"].toString() });
        if (data != null) {
          navigation.navigate("Tabs");
          //idjob = data["ID"].toString();
          await this.HandelImage(this.state.images);
          await PushNotification(
            this.state.longitude,
            this.state.Latitude,
            this.props.route.params
          );
        } else {
          console.log("didnt inserted!");
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  render() {
    return (
      <ScrollView style={styles.containerMain}>
        <View style={{ marginTop: "10%" }}>
          <Input
            multiline={true}
            placeholder={"ספר קצת על העבודה\n\n\n"}
            onChangeText={(text) => {
              this.setState({ Detail: text });
            }}
          ></Input>
          <Buttons
            sendhowyouwannadoit={(data) => this.gethowyouwannadoit(data)}
          />

          <View style={styles.iput}>
            <View
              style={{
                height: 50,
                width: 100,
                color: "white",
              }}
            >
              <Input
                placeholder="מהיכן"
                onChangeText={(text) => {
                  this.setState({ From: text });
                }}
              ></Input>
            </View>
            <View style={{ height: 50, width: 100 }}>
              <Input
                placeholder="להיכן"
                onChangeText={(text) => {
                  this.setState({ To: text });
                }}
              ></Input>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#08427b" }}>
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 10 }}
          >
            למתי תרצה את העבודה?
          </Text>
          <Checks senddataa={(data) => this.getDataDate(data)} />
          <Text style={{ textAlign: "center", color: "white", marginTop: 10 }}>
            בוא נהיה קצת יותר מדוייקים .. לאן זה ?
          </Text>
          <GoogleAutuComplete
            name={{ name: "MovingPage" }}
            sendtofatherprediction={(data) =>
              this.setState({
                sendtofatherprediction: data,
              })
            }
            senddata={(data) => this.getData(data)}
            SentLatLong={(lat, lon) => this.GetLatLon(lat, lon)}
          />
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
            {/* <ImagesList images={this.state.images} /> */}
          </View>

          <View style={{ marginTop: 30 }}>
            <Button
              onPress={this.checkvalidation}
              title="העלה מוצר"
              backgroundColor="red"
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: "#4e4a41",
    flex: 1,

    // justifyContent: 'center',
    //alignItems: 'center'
  },

  iput: {
    marginBottom: 40,
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    fontSize: 18,
    height: 40,
    width: 40,
    flexDirection: "row",
    paddingRight: 200,
  },
  bottom: {
    width: Dimensions.get("window").width,
    height: 0,

    justifyContent: "center",
    // alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0,
    backgroundColor: "white",
    //Here is the trick
  },
  scroll: {
    backgroundColor: "pink",
    flexGrow: 1,
    height: Dimensions.get("window").height + 500,
  },
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
  },
  button: {
    width: Dimensions.get("window").width,
    position: "absolute", //Here is the trick
    marginTop: 715,
    right: 10,
  },
  containersecond: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  button3: {
    width: 250,
    height: 50,
    borderColor: "#330066",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 15,
  },
  text4: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  image: {
    // flexDirection: "row",
    width: 60,
    height: 60,
    display: "flex",
    marginLeft: 10,
  },
});
