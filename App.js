import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ChooseTheWork from "./Pages/ChooseTheWork";
import MovingPage from "./Pages/MovingPage";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomePage from "./Pages/HomePage";
import AllJobs from "./Pages/AllJobs";
import ShowEachWork from "./Pages/ShowEachWork";
import AddWorker from "./Pages/AddWorker";
import AddWorkerSecond from "./Pages/AddWorkerSecond";
import AddWorkerThird from "./Pages/AddWorkerThird";
import CleaningPage from "./Pages/CleaningPage";
import ComputersPage from "./Pages/ComputersPage";
import ElectricPage from "./Pages/ElectricPage";
import HandiManPage from "./Pages/HandiManPage";
import ShowEachWorker from "./Pages/ShowEachWorker";
function MyTabss() {
  const Tab = createMaterialBottomTabNavigator();
  const TabTop = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      activeColor="#e91e63"
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: "מסך הבית",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={AllJobs}
        options={{
          tabBarLabel: "עבודות",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Tabs" component={MyTabss} />
        <Stack.Screen name="Choose" component={ChooseTheWork} />
        <Stack.Screen name="MovingPage" component={MovingPage} />
        <Stack.Screen name="CleaningPage" component={CleaningPage} />
        <Stack.Screen name="ComputersPage" component={ComputersPage} />
        <Stack.Screen name="HandiManPage" component={HandiManPage} />
        <Stack.Screen name="ElectricPage" component={ElectricPage} />
        <Stack.Screen name="ShowEachWork" component={ShowEachWork} />
        <Stack.Screen name="AddWorker" component={AddWorker} />
        <Stack.Screen name="AddWorkerSecond" component={AddWorkerSecond} />
        <Stack.Screen name="AddWorkerThird" component={AddWorkerThird} />
        <Stack.Screen name="ShowEachWorker" component={ShowEachWorker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
