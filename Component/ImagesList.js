import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "react-native-paper";
export default class ImagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalImage: [],
    };
  }
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

  ImagesList = ({ images }) => {
    const renderImage = (image) => {
      return (
        <TouchableOpacity>
          <Image
            key={`${images.id}`}
            source={{ uri: `data:image/jpg;base64,` + image.item.uri }}
            style={styles.image}
          />
        </TouchableOpacity>
      );
    };
  };
  render() {
    return (
      <View>
        <FontAwesome
          onPress={this.pickImage}
          name="image"
          size={100}
          color="black"
        />

        <FlatList
          horizontal
          data={images}
          keyExtractor={(image) => `${image.id}`}
          renderItem={(image) => renderImage(image)}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagesList: {},
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
});
