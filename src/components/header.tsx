import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  profilePicture: string;
  name: string;
  notificationCount: number;
  onPressNotification: () => void;
}

const Header: React.FC<HeaderProps> = ({
  profilePicture,
  name,
  notificationCount,
  onPressNotification,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.notificationContainer} onPress={onPressNotification}>
        <Image
            source={require('../assets/notification-icon.png')}
            style={styles.notificationIcon}
        />
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
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
});

export default Header;
