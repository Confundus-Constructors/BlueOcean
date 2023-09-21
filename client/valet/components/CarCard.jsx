import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



const CarCard = ({info,  buttonText, navigation}) => {
  console.log('carcard log',  navigation)
  const [imageSource, setImageSource] = useState(null);

  const formatCustomDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${month}/${day}/${year}, ${hours % 12 || 12}:${minutes} ${ampm}`;
    return formattedDate;
  };

  const date1 = new Date(info.reservation_start_time);
  const date2 = new Date(info.reservation_end_time);


  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };



    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Camera cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
  };

  const capitalizeString = (string) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1,string.length).toLowerCase();
    }
    else {
      return null;
    }
  };

  const handleCheckCar = () => {
    if (buttonText) {
      navigation.navigate('CheckIn', {qr_code: info.confirmation_id, carInfo: info, list: true})
    } else {
      navigation.navigate('CheckOut', {qr_code: info.confirmation_id, carInfo: info, list: true})
    }
  }

  return (
    <SafeAreaView className="text-lg" style={styles.container}>

      <View style={styles.row}>
        <View style={styles.row}>
          <View>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Reservation ID: </Text>
              <Text>{info.confirmation_id}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Owner: </Text>
              <Text style={styles.user}>{info.user}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Make: </Text>
              <Text style={styles.carInfo}>{info.make_model}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>Color: </Text>
              <Text>{capitalizeString(info.color)}</Text>
            </Text>
            <Text style={styles.row}>
              <Text style={styles.boldText}>License Plate: </Text>
              <Text>{info.license_plate}</Text>
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.box} onPress={selectImage}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <FontAwesomeIcon icon={faCamera} style={{color: "#a9927d"}} size={80} fade-size={'lg'}/>

            )}
          </TouchableOpacity>
      </View>

      {/* <View style={styles.row}>
        <View>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Arrival: </Text>
          <Text style={styles.user}>{formatCustomDate(date1)}</Text>        </Text>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Depart: </Text>
          <Text style={styles.user}>{formatCustomDate(date2)}</Text>        </Text>
        </View>
        <View>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Garage: </Text>
          <Text style={styles.user}>{}</Text>
        </Text>
        <Text style={styles.row}>
          <Text style={styles.boldText}>Spot ID: </Text>
          <Text>{info.parking_spot_number}</Text>
        </Text>
      </View>
    </View> */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleCheckCar}>
      <Text style={styles.buttonText}>{buttonText ? buttonText : 'Check Out'}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6D6D6',
    padding: 10,
    borderRadius: 0,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginLeft: 1,
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',

  },
  box: {
    width: 180,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#49111c',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '98%',
    marginBottom: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,

    // Android shadow style
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
},
  user: {
    marginTop: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
  }
});

export default CarCard;