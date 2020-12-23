import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { clockRunning } from "react-native-reanimated";
import {
  Directions,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalImage: [],
    };
  }
  delete = (number) => {};
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      let imageUri = result ? `${result.base64}` : null;

      const image = result.uri;

      this.props.setImage(imageUri);
    }
  };
  DeleteImage = (index) => {
    this.props.getindexfordelete(index);
  };
  ImagesList = (image) => {
    //const renderImage = (image) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.DeleteImage(image.index);
        }}
      >
        <Image
          key={`${image.id}`}
          source={{ uri: `data:image/jpg;base64,` + image.item.uri }}
          style={styles.image}
        />
        <AntDesign
          name="delete"
          size={24}
          color="red"
          style={{ position: "absolute", marginTop: 10 }}
        />
      </TouchableOpacity>
    );
  };
  render() {
    const value = this.props.name.name;

    return (
      <ScrollView
        style={{
          flex: 1,
          marginRight: 20,
          marginLeft: 30,
          //alignItems: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <FlatList
            inverted={true}
            horizontal
            data={this.props.imagesforshow}
            keyExtractor={(image) => `${image.id}`}
            renderItem={(image) => this.ImagesList(image)}
          ></FlatList>
          <FontAwesome
            onPress={this.pickImage}
            name="image"
            size={111}
            color="black"
            style={{ marginLeft: 10, marginTop: 5 }}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
});
