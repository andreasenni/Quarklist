import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import {Linking, StyleSheet, Text} from 'react-native';
import colors from '../../constants/colors';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../constants/links';

function DrawerContent(props) {
  const {navigation} = props;
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
        Home
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('Tasks')}>Tasks</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(PRIVACY_POLICY)}>Privacy Policy</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(TERMS_AND_CONDITIONS)}>Terms and Conditions</Text>
      <Text style={styles.link} onPress={logOut}>
        Log out
      </Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 13,
    margin: 8,
    marginHorizontal: 16,
  },
});

export default React.memo(DrawerContent);
