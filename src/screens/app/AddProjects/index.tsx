import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setToUpdate } from '../../../store/projects';
import MiniTitle from '../../../components/MiniTitle';

const AddProject = ({ navigation }) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (!name) {
      Alert.alert('Inserisci un nome per il progetto');
      return;
    }

    setLoading(true);
    firestore()
      .collection('Projects')
      .add({
        name,
        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        console.log('Project added!');
        navigation.navigate('Projects');
        setName('');
      })
      .catch(e => {
        console.log('error when adding project:>>', e);
        setLoading(false);
        Alert.alert(e.message);
      });
  };

  return (
    <View style={styles.separator}>
    <SafeAreaView style={styles.container}>
      <>
     

      <View>
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image
          style={styles.backIcon}
          source={require('../../../assets/backDown.png')}
        />
      </Pressable>
        <MiniTitle>Crea Nuovo Progetto</MiniTitle>

        <Input
          value={name}
          onChangeText={setName}
          outlined
          placeholder="Nome progetto"
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button style={styles.button} onPress={onSubmit}>
            Aggiungi Progetto
          </Button>
        )}
      </View>
      </>
    </SafeAreaView>
    </View>
  );
};

export default React.memo(AddProject);
