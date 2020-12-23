import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
function AllJobs({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [refresh, setrefresh] = useState(true);
  const [routes] = React.useState([
    { key: "Moving", title: "Moving" },
    { key: "Cleaning", title: "Cleaning" },
    { key: "Electric", title: "Electric" },
    { key: "Computer", title: "Computer" },
    { key: "HandiMan", title: "HandiMan" },
  ]);
  const [IdWorker, setIdWorker] = useState(null);
  const [IdUser, setIdWUser] = useState(null);
  const [obj, setobj] = useState(null);
  const initialLayout = { width: Dimensions.get("window").width };

  useEffect(() => {
    GetAsyncData().then(console.log(IdWorker));

    GetTheData(routes[index].title);
  }, [index]);

  const GetAsyncData = async () => {
    const IdUser = await AsyncStorage.getItem("@storage_Key");
    const IdWorker = await AsyncStorage.getItem("@WorkerID");
    setIdWorker(JSON.parse(IdWorker).IDUser);
    setIdWUser(JSON.parse(IdUser).ID);
  };

  const MovingRoute = () => {
    if (routes[index].key === "Moving") {
      return <ShowTheData />;
    } else {
      return null;
    }
  };
  const CleaningRoute = () => {
    if (routes[index].key === "Cleaning") {
      return <ShowTheData />;
    } else {
      return null;
    }
  };
  const ElectricRoute = () => {
    if (routes[index].key === "Electric") {
      return <ShowTheData />;
    } else {
      return null;
    }
  };

  const ComputerRoute = () => {
    if (routes[index].key === "Computer") {
      return <ShowTheData />;
    } else {
      return null;
    }
  };
  const HandiManRoute = () => {
    if (routes[index].key === "HandiMan") {
      return <ShowTheData />;
    } else {
      return null;
    }
  };

  const renderScene = SceneMap({
    Moving: MovingRoute,
    Cleaning: CleaningRoute,
    Electric: ElectricRoute,
    Computer: ComputerRoute,
    HandiMan: HandiManRoute,
  });

  const GetTheData = async (data) => {
    await fetch(
      `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Jobs/${data}`,

      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    )
      .then((resp) => resp.json())
      .then(function (data) {
        setobj(data);
        setrefresh(false);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const EachWorker = async (data) => {
    if (IdUser === IdWorker) {
      navigation.navigate("ShowEachWork", {
        data: data.item,
        Name: routes[index].title,
      });
    } else Alert.alert("לא הצטרפת כנותן שירות...");
  };
  const getTabBarIcon = (props) => {
    const { route } = props;

    if (route.key === "Moving") {
      return (
        <View>
          <FontAwesome5 name="truck-moving" size={24} color="black" />
          <Text style={{ fontSize: 10 }}>Moving</Text>
        </View>
      );
    }
    if (route.key === "Cleaning") {
      return (
        <View>
          <MaterialCommunityIcons
            name="silverware-clean"
            size={24}
            color="black"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontSize: 9 }}>Cleaning</Text>
        </View>
      );
    }
    if (route.key === "Electric") {
      return (
        <View>
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="electric-switch"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 10 }}>Electric</Text>
        </View>
      );
    }
    if (route.key === "Computer") {
      return (
        <View>
          <MaterialIcons
            name="computer"
            size={24}
            color="black"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontSize: 7.5 }}>Computer</Text>
        </View>
      );
    }
    if (route.key === "HandiMan") {
      return (
        <View>
          <FontAwesome5
            name="hand-holding"
            size={24}
            color="black"
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontSize: 10 }}>HandiMan</Text>
        </View>
      );
    }
  };
  const ShowTheData = () => {
    const renderItem = (data) => {
      return (
        <TouchableHighlight onPress={() => EachWorker(data)}>
          <View
            key={`${data.index}`}
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
                uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${data.item["ID"]}/${routes[index].title}0.jpg`,
              }}
              style={{
                flex: 0.4,
              }}
            />
            <View style={{ flex: 0.5, marginTop: 50 }}>
              <Text style={{ marginLeft: 100 }}>{data.item["AboutJob"]}</Text>

              <Text>{data.item["WhenJob"]}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    };
    return (
      <View style={{ marginTop: 50 }}>
        <FlatList
          refreshing={refresh}
          data={obj}
          keyExtractor={(data, index) => index.toString()}
          renderItem={(data) => renderItem(data)}
          sZonRefresh={() => GetTheData(routes[index].title)}
        ></FlatList>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        style={{ backgroundColor: "white" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy={true}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            style={{ backgroundColor: "white" }}
            {...props}
            indicatorStyle={{
              backgroundColor: "red",
              height: 5,
            }}
            renderIcon={(props) => getTabBarIcon(props)}
            tabStyle={styles.bubble}
            labelStyle={styles.noLabel}
          />
        )}
      />
      {refresh && <ActivityIndicator style={{ color: "#FFFFFF" }} />}
      <View style={styles.bottomView}>
        {IdWorker !== IdUser && (
          <MaterialCommunityIcons
            backgroundColor="#3b5998"
            name="worker"
            size={35}
            color="green"
            onPress={() => {
              navigation.navigate("AddWorker");
            }}
          />
        )}
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
  noLabel: {
    display: "none",
    height: 0,
  },
  bubble: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 60,
    marginBottom: 5,
    height: 60,
  },
});
export default React.memo(AllJobs);
