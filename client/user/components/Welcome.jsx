import { SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import UserTabs from './UserTabs.jsx';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

const Welcome = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const { control, handleSubmit, formState: {errors}, } = useForm();

  const navigation = useNavigation();




  const onSignInPressed = (data) => {
    console.log(data);

    navigation.navigate('UHP');
  };

  const onSignInGooglePressed = () => {
    console.warn('Sign In Google Pressed');
  };

  const onSignInFacebookPressed = () => {
    console.warn('Sign In FacebookPressed');
  };

  const onForgotPassPressed = () => {

    navigation.navigate('ForgotPasswordScreen');
  };

  const onCreatePressed = () => {

    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.mainContent}>
        <Image style = {styles.image} source={require('../../../assets/app-logo.png')} />
        <Text style = {styles.text}>Create an account to reserve your parking spot.</Text>

        <CustomInput
          name="Email"
          placeholder="Email"
          control={control}
          rules={{required: 'Email is required', pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
        />
        <CustomInput
          name="Password"
          placeholder="Password"
          control={control}
          rules={{required: 'Password is required', minLength: {value: 8, message: 'Password must be at least 8 characters long'}}}
          secureTextEntry={true}
        />

        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#A9927D' }}
          title="Sign In"
          onPress={handleSubmit(onSignInPressed)}
          color="#171412"
        />

        <TouchableOpacity >
          <Text onPress={onForgotPassPressed} style={styles.clickableText}>Forgot password?</Text>
        </TouchableOpacity>

        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#171412' }}
          title="Continue With Google"
          onPress={onSignInGooglePressed}
          color="#A9927D"
        />
        <CustomButton
          style={styles.button}
          textStyle={{ ...styles.commonFont, color: '#D0D3D2' }}
          title="Continue With Facebook"
          onPress={onSignInFacebookPressed}
          color="#49111C"
        />
        <TouchableOpacity>
          <Text style={styles.clickableText}>Continue as Guest</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity>
        <Text onPress={onCreatePressed} style={styles.clickableText}>Do not have an account? CREATE ONE</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center'
  },

  image: {
    marginLeft: 30,
    width: "60%",
    height: 100,
  },

  container:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#D0D3D2',
    paddingBottom: 20,
  },

  button: {
    marginTop: 15,
    width: 350,
    alignSelf: 'center',
  },

  clickableText: {
    marginTop: 30,
    color: '#171412',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Oswald-Medium',
  },

  text: {
    marginLeft: 20,
    marginRight: 33,
    marginBottom: 30,
    fontSize: 23,
    color: '#171412',
    alignSelf: 'center',
    fontFamily: 'Oswald-Bold',
  }
})
export default Welcome;