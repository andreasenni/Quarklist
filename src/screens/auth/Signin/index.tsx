import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import Input from '../../../components/Input';

const Signin = ({navigation}) => {
  const [values, setValues] = useState({});

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("L'indirizzo e-mail è già in uso");
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert("Questo indirizzo e-mail non è valido");
        } else if (error.code === 'auth/invalid-credential') {
          Alert.alert('Email o password errati');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../assets/Logo.png')} style={{alignSelf:'center', marginTop:120, marginBottom:50}} />

      <Input
        placeholder="email"
        keyboardType="email-address"
        onChangeText={val => onChange(val, 'email')}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={val => onChange(val, 'password')}
      />

      <Button onPress={onSubmit}>Login</Button>

      <Text style={styles.footerText}>
        Prima volta?
        {' '}
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.footerLink}>
          Registrati!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
