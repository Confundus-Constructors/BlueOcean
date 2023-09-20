import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../components/Welcome";
import SignUpScreen from "../components/SignUpScreen";
import ConfirmEmailScreen from "../components/ConfirmEmailScreen";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import NewPasswordScreen from "../components/NewPasswordScreen";
import UHP from "../components/UserHomePage";
import Reserve from "../components/UserReserve";
import Select from "../components/UserCarSelect";
import Checkout from "../components/Checkout";
import ValetTabs from "../../valet/components/ValetTabs";
import VHP from '../../valet/components/ValetTabs';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="ConfirmEmailScreen"
          component={ConfirmEmailScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="UHP" component={UHP} />
        <Stack.Screen name="VHP" component={VHP} />
        <Stack.Screen name="Reserve" component={Reserve} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="VHP" component={ValetTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
