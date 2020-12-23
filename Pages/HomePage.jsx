import React, { Component, useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,StatusBar,SafeAreaView,ActivityIndicator
} from "react-native";

import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap } from "react-native-tab-view";
let url =
  "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Jobs/GetAll";



export default function HomePage({ navigation }) {
 // const [obj, setobj] = useState(null);
 const [obj, setobj] = useState([]);


  const [routes] = React.useState([
    { key: "Before", title: "לפני עבודה" },
    { key: "After", title: "אחרי עבודה" },
  ]);
  const [index, setIndex] = React.useState(0);
  const [FetchComplete , setFetchComplete]=React .useState(false)
  const initialLayout = { width: Dimensions.get('window').width };
  useEffect(() => {
    // Update the document title using the browser AP
    GetTheData(index);
    
  },[index]);

  // useEffect(() => {
  //   ShowTheData();
  // }, [obj,index]);
  
  const BeforeWorkRoute = () => {
    return <ShowTheData />;
  };
  const AfterWorkRoute = () => {
    return <ShowTheData />;
  };

  const _renderScene = SceneMap({
    Before: BeforeWorkRoute,
    After: AfterWorkRoute,
  });
  const _renderPage = (props) =><View> {FetchComplete==false &&
    <View style={{
      width: '100%',
      height: '100%',
      marginTop:500
    }}><ActivityIndicator style={{ color: '#FFFFFF' }} /></View>
  } <TabViewPage {...props} renderScene={_renderScene} /></View>;

 const  GetTheData = async (index) => {
   
  
    const Id = await AsyncStorage.getItem("@storage_Key");

    // let returnedObj = null;
 return  await fetch(
      url + `?IsAccept=${index}&IDUser=${JSON.parse(Id).ID}`,

      {
        method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    )
      .then((resp) => resp.json())
      .then(function (data) {
       
        setobj(data);
        setFetchComplete(true)
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  const ShowTheData = () => {
    
    const renderItem = (data) => {
      return (
        
        <TouchableOpacity>
          <View
            key={data.index}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "black",
              backgroundColor: "white",
              padding: 3,
              marginTop: 5,
              height: 140,
              flexDirection: "row",
              flex: 0.5,
            }}
          >
            <Image
              source={{
                uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${data.item["ID"]}/${data.item.Type}0.jpg`,
              }}
              style={{
                flex: 0.4,
              }}
            />
            <View style={{ flex: 0.5, marginTop: 50 }}>
              <Text style={{ marginLeft: 100 }}>{data.item["AboutJob"]}</Text>

              <Text style={{}}>{data.item["WhenJob"]}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
      
    };
    return (
    
      <View style={{ flex: 1, flexDirection: "row" }}>
       
        <FlatList
          data={obj}
          keyExtractor={(data, index) => index.toString()}
          renderItem={(data) => renderItem(data)}
        ></FlatList>
      </View>
    );
    
  };


  return (
    
   <View   style={{ flex: 1 }}>
       
  <TabView
  navigationState={{index, routes }}
  renderScene={_renderScene}
  renderHeader={_renderPage}

  onIndexChange={setIndex}
  initialLayout={initialLayout}/>

      <View style={styles.bottomView}>
      <Icon
        raised
        name="plus"
        type="font-awesome"
        color="green"
        backgroundColor="green"
        onPress={() => {
          navigation.navigate("Choose");
        }}
      />
    </View>
    </View>

    

  );
}

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 7,

    flexDirection: "row",

    alignItems: "flex-start",
  },
  item: {
    flexDirection: "row",
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: 50,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 6, //Here is the trick
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
  },
  scene: {
    flex: 1,
  },

});
