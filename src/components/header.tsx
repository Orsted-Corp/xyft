import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useMyContext } from '../utils/context';
import { useNavigation } from '@react-navigation/native';
import ParentControl from '../screens/parentControl';


const Header: React.FC = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const profilePicture = require('../assets/qrcode.png');
  const { publicKey, setPublicKey } = useMyContext();
  const { accountDetails, setAccountDetails } = useMyContext();
  // Wait till accountDetails is not undefined
  const [accountDetails_,setaccountDetails_] = useState<any>(undefined)
  useEffect(()=>{
    setaccountDetails_(JSON.parse(JSON.stringify(accountDetails)))
  },[accountDetails])

  console.log("publicKey", accountDetails_);
  
  const qrData = 'ethereum:' + publicKey;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => {return(<ParentControl /> )}}>
        <Image source={require('../assets/profileImage.jpeg')} style={styles.profilePicture} />
        </TouchableOpacity>
        
        <Text style={styles.name}>{accountDetails_ ? accountDetails_.userInfo.name : "Loading"}</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
            source={require('../assets/qrcode.png')}
            style={styles.notificationIcon}
        />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <QRCode
        value={qrData}
        size={200} // Adjust the size of the QR code as needed
          />
          <Text>{publicKey}</Text>
            <TouchableOpacity onPress={ () => {setModalVisible(false)}} style={styles.modalText}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add some padding to the top
    paddingTop: 75,
    // Set the header background color
    backgroundColor: 'rgba(255, 255, 255, 0)',
    // Align items in the center
    alignItems: 'center',

    // Add padding
    paddingHorizontal: '7.5%',
    // Set flex direction
    flexDirection: 'row',
    // Add z-index to make sure the header is above everything else
    zIndex: 100,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: '10%',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalText: {
    marginTop: 20,
  },
});

export default Header;
