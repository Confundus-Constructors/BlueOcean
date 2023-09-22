import { Alert, LayoutAnimation, SafeAreaView, Touchable, Pressable, TouchableOpacity, View, ScrollView, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import { Dimensions } from 'react-native'
import {host, port} from "../../../env.js";

async function loadFonts() {
  await Font.loadAsync({
    'Oswald-Medium': require('../../../assets/fonts/Oswald-Medium.ttf'),  // adjust the path accordingly
  });
};

export default CheckOut = ({navigation,  route}) => {

  const [carInfo, setCarInfo] = useState({});
  const [downloading, setDownloading] = useState(true);
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [big, setBig] = useState(false);

  const onPressCheck = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBig(!big);
  }

  const handleReturn = () => {
    // setWaitingVisible(true);
    axios.put(`http://${host}:${port}/transactions/${route.params.qr_code}`)
      .then(() => {
        // setWaitingVisible(false);
        setConfirmationVisible(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleExit = () => {
    setConfirmationVisible(false);
    if (route.params.list) {
      navigation.navigate('CarManage');
    } else {
      navigation.navigate('QRScanner');
    }
  };

  const capitalizeString = (string) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1,string.length).toLowerCase();
    }
    else {
      return null;
    }
  };

  useEffect(() => {
    axios(`http://${host}:${port}/image/${route.params.qr_code}`)
    .then((result) => {
      var base64 = result.data.rows[0].photo;
      var base64Pic = 'data:image/png;base64,' + base64;
      setImageSource(base64Pic);
      setDownloading(false);
    })
    .catch((err) => {
      console.log(err);
    })
    setCarInfo(route.params.carInfo);
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        { !big ?
        <View>
          <Text style={styles.text}>Please bring out the following vehicle and press the 'Vehicle Returned' button after returning vehicle</Text>
          <Text style={styles.text}>Reservation ID: </Text>
          <Text style={styles.text}>{'Spot: ' + carInfo.parking_spot_number} </Text>
          <Text style={styles.text}>{'Owner: ' + carInfo.user}</Text>
          <Text style={styles.text}>{'Make: ' + carInfo.make_model}</Text>
          <Text style={styles.text}>{'Color: ' + capitalizeString(carInfo.color)}</Text>
          <Text style={styles.text}>{'License Plate: ' + carInfo.license_plate}</Text>
        </View>
          :null}
        <TouchableOpacity onPress={onPressCheck}>
          <Image src={imageSource} style={
              {height: !big ? 100 : Dimensions.get('window').height,
              width: !big ? 100 : Dimensions.get('window').width,
              borderWidth: 1,
              alignSelf: 'center',
              resizeMode: "contain",
              borderRadius: 10,
              resizeMode: "cover"}
              }>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} onPress={handleReturn}>Vehicle Returned</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={waitingVisible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.waitingText}>Waiting For Confirmation From Owner</Text>
          <Image style={styles.loadingGif} source={require('./../../../assets/loading.gif')} ></Image>
        </View>
      </Modal>
      <Modal visible={confirmationVisible} style={styles.confirmedContainer}>
        <View style={styles.modalView}>
          <Text style={styles.confirmed}>Confirmed!</Text>
          <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
              <Text style={styles.exitText}> Exit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={downloading} >
        <View style={styles.confirmingView}>
          <Text style={styles.waitingText}>Downloading Image</Text>
          <Image style={styles.loadingGif} source={require('./../../../assets/loading.gif')} ></Image>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9927D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    height: 'auto',
    width: '90%',
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    padding: 20
  },
  button: {
    backgroundColor: '#49111C',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonTitle: {
    color: 'white',
    borderRadius: 20,
    fontSize: 25,
    fontFamily: 'Oswald-Medium',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Oswald-Medium',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Oswald-Medium',
  },
  carPic: {
    height: 100,
    width: 100,
    borderWidth: 1,
    alignSelf: 'center',
    resizeMode: "contain",
    borderRadius: 10,
    resizeMode: "cover",
  },
  modalContainer: {
    alignItems:'center',
    justifyContent:'center'
  },
  lottie: {
    width: 100,
    height: 30,
  },
  modalView: {
    height: 'auto',
    alignItems:'center',
    justifyContent:'center',
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  waitingText: {
    fontSize: 20,
    fontFamily: 'Oswald-Medium',
  },
  loadingGif: {
    height: 50
  },
  exitButton: {
    marginTop: 20,
    backgroundColor: '#49111C',
    width: 200,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmed: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  },
  exitText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Oswald-Medium',
  },
  confirmedContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmingView: {
    height: 'auto',
    alignItems:'center',
    justifyContent:'center',
    padding: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center'
  },
})