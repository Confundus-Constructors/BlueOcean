import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import ValetInfo from './ValetInfo';
import SignOut from '../SignOut';
import { BlurView } from '@react-native-community/blur';
import { Button, View, Modal } from 'react-native';
import Why from './Why';
import UploadID from './UploadID';
import Payment from './Payment';
import Summary from './Summary';
import LocTab from './LocTab';
import TabContentWrapper from './TabContentWrapper';
import { UserContext } from './UserContext'
export const MyContext = React.createContext();

const Tab = createMaterialTopTabNavigator();

function HomeContent() {
  const navigation = useNavigation();
  const { setDefaultCityState } = useContext(MyContext);
  const [seeModal, setSeeModal] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);


  const handleEdit = () => {
    setSeeModal(!seeModal);
    setShowBlur(!showBlur);
  };

  const blur = () => {
    setShowBlur(!showBlur);
  };

  const handleEditButtonPress = () => {
  // Toggle the state variable to show/hide the modal
  setIsModalVisible(!isModalVisible);
  blur(); // Call blur function if needed.
  };

  const { userId } = useContext(UserContext)
  console.log('logger', userId)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ValetInfo setDefaultCityState={setDefaultCityState} blur={blur} />
        <View style={styles.signout}>
          <SignOut variant={'home'} />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
      <View style={styles.summary}>
      <Text style={styles.subtitle}>You currently have:</Text>
        <Summary />
        </View>
        </View>
      <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 17, fontSize: 16}}>Complete these steps to get started</Text>
      <Text style={[styles.title, {marginTop: 10, marginBottom: -10} ]}>1. Verify accuracy of your personal info</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>2. Upload driver's documentation - </Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editText}>Why?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: -17 }}>
        <UploadID setIsUploaded={setIsUploaded} isUploaded={isUploaded}/>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Payment />
        <View style={styles.uploads}>
        <TouchableOpacity style={[styles.box, isUploaded ? null : {backgroundColor: '#d3d3d3'}]} onPress={() => {
          if(isUploaded) {
            console.log('submitted')
          } else {
            alert('Please Upload Documentation')
          }
        }}>
            <View>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, alignText: 'center'}}>
                Submit for Approval
              </Text>
            </View>
        </TouchableOpacity>
        </View>
      </View>
      {showBlur && (
        <BlurView
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={seeModal}
        onRequestClose={() => {
          setSeeModal(!seeModal);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 110,
          }}
        >
          <View
            style={{
              width: '95%',
              height: 540,
              backgroundColor: '#F7F7F7',
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Why />
            <Button title="OK" onPress={handleEdit} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const DynamicTabs = () => {
  const navigation = useNavigation();
  const { defaultCityState } = useContext(MyContext);
  const [userTabs, setUserTabs] = useState([]);

  const addNewTab = () => {
    const newTabIndex = userTabs.length + 1;
    const newTab = {
      name: `Location ${newTabIndex}`,
      component: LocTab,
    };
    setUserTabs([...userTabs, newTab]);
  };

  const deleteTab = (tabName) => {
    const updatedTabs = userTabs.filter((tab) => tab.name !== tabName);
    setUserTabs(updatedTabs);
  };

  useEffect(() => {
    if (userTabs.length > 0) {
      const latestTab = userTabs[userTabs.length - 1];
      navigation.navigate(latestTab.name);
    }
  }, [userTabs, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#a9927d',
          inactiveTintColor: 'white',
          labelStyle: { fontSize: 16 },
          style: { backgroundColor: 'black', marginBottom: 3 },
          indicatorStyle: { backgroundColor: 'white' },
          scrollEnabled: true,
        }}
      >
        <Tab.Screen
          name="Account"
          component={HomeContent}
          options={{
            tabBarLabel: ({ focused, color, position }) => (
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: color }}>
                ACCOUNT
              </Text>
            ),
          }}
        />
        {userTabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            children={(props) => (
              <TabContentWrapper
                defaultCity={defaultCityState}
                Component={LocTab}
                tabName={tab.name}
                onRename={(oldName, newName) => {
                  const updatedTabs = userTabs.map(t =>
                    t.name === oldName ? { ...t, name: newName } : t
                  );
                  setUserTabs(updatedTabs);
                  navigation.navigate(newName);
                }}
                 onDelete={() => deleteTab(tab.name)}
                {...props}
              />
            )}
          />
        ))}
        <Tab.Screen
          name="+ Add Location"
          listeners={{
            tabPress: (e) => {
              addNewTab();
              e.preventDefault();
            },
          }}
        >
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export const AppWrapper = () => {
  const [defaultCityState, setDefaultCityState] = useState('USA');

  return (
    <MyContext.Provider value={{ defaultCityState, setDefaultCityState }}>
      <DynamicTabs />
    </MyContext.Provider>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  signout: {
    alignItems: 'flex-start',
    height: 35
  },
  editText: {
    fontWeight: 'bold',
    color: '#a9927d',
    fontSize: 15,
    marginTop: 25,
  },
  title: {
    marginTop: 25,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: '#485460'
  },
  subtitle: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  box: {
    width: 300,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#49111c',
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    padding: 1,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    marginTop: 32
  },
  summary: {
    padding: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 15, width: 340, marginTop: 10,
    height: 140,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: '#d3d3d3'
  }
};

export default AppWrapper;