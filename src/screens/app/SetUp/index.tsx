import React, { useEffect, useState } from 'react';
import { Alert, Linking, SafeAreaView, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../../constants/links';
import Title from '../../../components/Title';

const SetUp = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const confirmLogOut = () => {
    Alert.alert(
      'Conferma logout',
      'Sei sicuro di voler uscire?',
      [
        {
          text: 'Annulla',
          onPress: () => console.log('Logout annullato'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          },
          style:'destructive'
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 70 }}>
        <Title>Impostazioni</Title>

        {user && (
          <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
            <Text style={styles.userInfoText}>
              {user.email}
            </Text>
          </View>
        )}

        <View style={styles.firstRow}>
          <Text
            style={styles.text}
            onPress={() => Linking.openURL(PRIVACY_POLICY)}>
            Privacy Policy
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={styles.text}
            onPress={() => Linking.openURL(TERMS_AND_CONDITIONS)}>
            Termini e Condizioni
          </Text>
        </View>
        <View style={styles.logOutRow}>
          <Text style={styles.logOutText} onPress={confirmLogOut}>
            Log out
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SetUp);
