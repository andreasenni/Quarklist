import React, {useState} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Title from '../../../components/Title';
import Checkbox from '../../../components/Checkbox';
import {PRIVACY_POLICY, TERMS_AND_CONDITIONS} from '../../../constants/links';

const Signup = ({navigation}) => {
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState({});

  const onCheckboxPress = () => {
    setAgreed(value => !value);
  };

  const onLinkPress = url => {
    Linking.openURL(url);
  };

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    if (!values.first_name || !values.last_name) {
      Alert.alert('Inserisci nome e cognome');
      return;
    }
    if (values.password !== values.confirm_password) {
      Alert.alert('Le due password non sono uguali');
      return;
    }
    if (!agreed) {
      Alert.alert('Devi accettare i termini per proseguire');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${values.first_name} ${values.last_name}`,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Questo indirizzo e-mail è già in uso');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Questo indirizzo e-mail non è valido');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('La password inserita è troppo debole');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Entra in famiglia!</Title>
        <Input
          onChangeText={val => onChange(val, 'first_name')}
          placeholder="Nome"
        />
        <Input
          onChangeText={val => onChange(val, 'last_name')}
          placeholder="Cognome"
        />
        <Input
          onChangeText={val => onChange(val, 'email')}
          placeholder="Indirizzo e-mail"
          keyboardType="email-address"
        />
        <Input
          onChangeText={val => onChange(val, 'password')}
          placeholder="Password"
          secureTextEntry
        />
        <Input
          onChangeText={val => onChange(val, 'confirm_password')}
          placeholder="Conferma Password"
          secureTextEntry
        />

        <View style={styles.row}>
          <Checkbox checked={agreed} onPress={onCheckboxPress} />
          <Text style={styles.agreeText}>
            Accetto
            <Text
              style={styles.link}
              onPress={() => onLinkPress(TERMS_AND_CONDITIONS)}>
              {' '}
              termini e condizioni d'uso
            </Text>{' '}
            e la
            <Text
              style={styles.link}
              onPress={() => onLinkPress(PRIVACY_POLICY)}>
              {' '}
              Privacy Policy
            </Text>
          </Text>
        </View>
        <Button onPress={onSubmit} type={'blue'}>
          Crea nuovo account
        </Button>

        <Text style={styles.footerText}>
          Sei già dei nostri?
          <Text
            onPress={() => navigation.navigate('Signin')}
            style={styles.footerLink}>
            {' '}
            Accedi!
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Signup);
