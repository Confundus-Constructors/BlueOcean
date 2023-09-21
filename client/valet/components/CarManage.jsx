import React from 'react';
import CarCard from './CarCard.jsx'
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Reserved from './Reserved.jsx';
import Parked from './Parked.jsx';
import Pickups from './Pickups.jsx';

const Tab = createMaterialTopTabNavigator();

function ResTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CarCard />
    </SafeAreaView>
  )
}

function ParkedTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Parked</Text>
    </SafeAreaView>
  )
}

function PickTab() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Pickups</Text>
    </SafeAreaView>
  )
}

const CarManage = ({navigation}) => {
  console.log('carmanage navigation log', navigation)
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#a9927d',
        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: 'black',
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
      }}>
        <Tab.Screen name="Reserved" component={Reserved} />
        <Tab.Screen name="Parked" component={Parked} />
        <Tab.Screen name="Pickups" component={Pickups} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}

export default CarManage;