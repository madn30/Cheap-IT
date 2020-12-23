import React, { Component } from "react";
import { View } from "react-native";
import {
  Input,
  Button,
  Text,
  Divider,
  ButtonGroup,
} from "react-native-elements";
import Checks from "../Component/Checks";
import GoogleAutuComplete from "../Component/GoogleAutuComplete";
import Camera from "../Component/Camera";
import ImagesList from "../Component/ImagesList";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
let url =
  "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Jobs/HandiMan/PostToDB";

const buttons = ["כן", "לא"];

export default class HandiManPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Detail: "",
      selectedIndex: -1,
      ValueSelecteIndex: "",
      SizeHome: 1,
      images: [],
      WhichWork: "",
      datechosen: "",
      locationchosen: "",
      idjob: "",
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({
      selectedIndex,
      ValueSelecteIndex: buttons[selectedIndex],
    });
  }
  getData = (data) => {
    this.setState({ locationchosen: data });
  };
  getDataDate = (data) => {
    this.setState({ datechosen: data });
  };
  uploadproduct = async () => {
    const Id = await AsyncStorage.getItem("@storage_Key");

    let obj2Send = {
      AboutJob: this.state.Detail,
      TypeJob: this.state.WhichWork,
      IncludeProducts: this.state.ValueSelecteIndex,
      WhenJob: this.state.datechosen,
      Location: this.state.locationchosen,
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
          name: "HandiMan" + i,
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
    //  const idjob=''

    const { navigation } = this.props;

    return await fetch(url, {
      method: "POST", // 'GET', 'POST', 'PUT', 'DELETE', etc.
      body: JSON.stringify(obj),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    }) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        this.setState({ idjob: data["ID"].toString() });
        if (data != null) {
          navigation.navigate("Tabs");
          //idjob = data["ID"].toString();
          this.HandelImage(this.state.images);
        } else {
          console.log("didnt inserted!");
        }
      })

      .catch(function (err) {
        console.error(err);
      });
  };

  render() {
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Input
          multiline={true}
          placeholder={"ספר קצת על העבודה\n\n\n"}
          onChangeText={(text) => {
            this.setState({ Detail: text });
          }}
        ></Input>
        <Input
          placeholder={"קיר גבס 6 מר ,גג 30 מר,מדף ,וכדומה"}
          onChangeText={(text) => {
            this.setState({ WhichWork: text });
          }}
        ></Input>

        <Text>הצעת המחיר כוללת חומרים?</Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 50 }}
        />
        <Text style={{}}>למתי העבודה?</Text>
        <Checks senddataa={(data) => this.getDataDate(data)} />
        <GoogleAutuComplete
          name={{ name: "HandiManPage" }}
          sendtofatherprediction={(data) =>
            this.setState({
              sendtofatherprediction: data,
            })
          }
          senddata={(data) => this.getData(data)}
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
        </View>
        <View style={{ marginTop: 50 }}>
          <Button
            title="בוצע"
            onPress={() => {
              this.uploadproduct();
            }}
          ></Button>
        </View>
      </ScrollView>
    );
  }
}
