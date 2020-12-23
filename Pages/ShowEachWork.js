import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, Button, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";

let url = `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Quoration`;

export default function ShowEachWork({ route, navigation }) {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const [image, setimage] = useState(0);
  const [price, setprice] = useState(0);
  const [alltheprice, setalltheprice] = useState([]);
  const { data } = route.params;
  const { Name } = route.params;
  useEffect(() => {
    let isCanceled = false;
    fetch(
      `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Quoration?id=${data.ID}`,

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
        if (!isCanceled) {
          setalltheprice(data);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
    return () => {
      isCanceled = true;
    };
  }, [alltheprice]);

  const Showimages = () => {
    setArray(array.concat(count));
    setCount(count + 1);
  };
  const SendPriceToDB = async () => {
    let result = 0;
    const IdUser = await AsyncStorage.getItem("@storage_Key");

    const IdWorker = await AsyncStorage.getItem("@WorkerID");
    for (let i = 0; i < alltheprice.length; i++) {
      if (JSON.parse(IdWorker).ID == alltheprice[i].IDWorker) result = 1;
    }
    console.log(result);
    if (result == 0 || alltheprice == []) {
      console.log(result);

      let obj = {
        Quoratin_Price: price,
        IDUser: JSON.parse(IdUser).ID,
        IDWorker: JSON.parse(IdWorker).ID,
        IDJob: data.ID,
      };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      Alert.alert("מצטערים אך קיים הצעת מחיר");
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#00BFFF",
          flex: 1,
        }}
      >
        <Image
          source={{
            uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${data.ID}/${Name}${image}.jpg`,
          }}
          style={{
            height: 300,
            width: 300,
            alignSelf: "center",

            marginTop: 50,
          }}
        />
        <View>
          <ScrollView style={{ alignSelf: "center" }} horizontal={true}>
            {array.map((i, index) => (
              <TouchableOpacity key={index} onPress={() => setimage(index)}>
                <View style={{}}>
                  <Image
                    source={{
                      uri: `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/Images/${data.ID}/${Name}${index}.jpg`,
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

        {count <= data.NumberOfImage && Showimages()}
        <View
          style={{
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>
            העבודה תתבצע בתאריך: {data.WhenJob}
          </Text>
          <Text style={{ color: "blue", fontSize: 20 }}>
            תיאור העבודה :{data.AboutJob}
          </Text>
          {Name == "Moving" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "blue", fontSize: 20 }}>
                  מסלול העבודה הוא : מ{data.From}
                </Text>
                <Text style={{ color: "blue", fontSize: 20, marginLeft: 20 }}>
                  ל{data.To}
                </Text>
              </View>
              <Text style={{ color: "blue", fontSize: 20 }}>{data.How}</Text>
              <Text style={{ color: "blue", fontSize: 20 }}>{data.Place}</Text>
            </View>
          )}
          {Name == "Cleaning" && (
            <View>
              <Text style={{ color: "blue", fontSize: 20 }}>
                תשלום: {data.Pay}
              </Text>
              <Text style={{ color: "blue", fontSize: 20 }}>
                גודל היחידה: {data.SizeRoom} מטר
              </Text>
              <Text style={{ color: "blue", fontSize: 20 }}>
                נמצא ב: {data.Location}
              </Text>
            </View>
          )}

          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 30,
              color: "red",
            }}
          >
            הצעות מחיר קיימות
          </Text>
          {alltheprice ? (
            alltheprice.map((item, index) => (
              <TouchableOpacity
                key={item.Quoration_ID.toString()}
                onPress={() => {
                  navigation.navigate("ShowEachWorker", {
                    item: item,
                    data: data,
                    Name: Name,
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    backgroundColor: "grey",
                  }}
                >
                  {item.Quoratin_Price}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>אין הצעות מחיר קיימות</Text>
          )}
          <TextInput
            onChangeText={(text) => setprice(text)}
            style={{
              marginTop: 30,
              textAlign: "center",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
            }}
          ></TextInput>

          <View style={{ marginTop: 20 }}>
            <Button
              title="הגש הצעת מחיר "
              onPress={() => {
                SendPriceToDB();
              }}
            ></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
