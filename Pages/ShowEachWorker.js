import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

export default function ShowEachWorker({ navigation, route }) {
  const [Data, setData] = useState(null);
  const [array, setArray] = useState([]);
  const [count, setCount] = useState(0);

  const Route = route.params;
  useEffect(() => {
    fetch(
      `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Worker?id=${Route.item.IDWorker}`,

      {
        method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    ) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        setData(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);
  const Showimages = () => {
    setArray(array.concat(count));
    setCount(count + 1);
  };
  const HandleImage = async () => {
    return (
      <Image
        source={{
          uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${Data.ID}/${count}.jpg`,
        }}
        style={{
          //   justifyContent: "space-between",
          //   flexDirection: "row",
          //   flex: 0.3,
          height: 50,
          width: 50,
          //  alignSelf: "center",

          marginTop: 50,
        }}
      />
    );
  };
  const AcceptOffer = async () => {
    const IdUser = await AsyncStorage.getItem("@storage_Key");

    if (JSON.parse(IdUser).ID == Route.data.IdUser) {
      fetch(
        `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/HandleWork?id=${Route.data.ID}&Name=${Route.Name}`,

        {
          method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
        }
      ) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => {
          console.error(err);

          resp.json();
        }) // Transform the data into json
        .then(function (data) {})
        .catch(function (err) {});
      navigation.push("Tabs");
    } else {
      Alert.alert("אין אפשרות לאשר מאחר והעבודה לא רשומה תחתיך");
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {Data && (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${Data.ID}/0.jpg`,
              }}
              style={{
                //   justifyContent: "space-between",
                //   flexDirection: "row",
                //   flex: 0.3,
                height: 300,
                width: 300,
                alignSelf: "center",

                marginTop: 50,
              }}
            />

            <View>
              <ScrollView style={{ alignSelf: "center" }} horizontal={true}>
                {array.map((i, index) => (
                  <TouchableOpacity
                    key={index}
                    // onPress={() => setimage(index)}
                  >
                    <View>
                      <Image
                        source={{
                          uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${Data.ID}/${index}.jpg`,
                        }}
                        style={{
                          height: 100,
                          width: 100,
                          marginLeft: 30,
                          marginTop: 50,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {count <= Data.NumberOfImage - 1 && Showimages()}
            <Text style={{ fontSize: 30, color: "blue" }}>
              {Data.DetailWorker}
            </Text>

            <Text>{Data.PhoneNumber}</Text>
            <Text>{Data.PrivateCompany}</Text>
            <Text>{Data.Mail}</Text>
            <Text>{Data.Location}</Text>
            <View
              style={{
                marginTop: 50,
              }}
            >
              <Button
                title="אשר"
                onPress={() => {
                  AcceptOffer();
                }}
              ></Button>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
