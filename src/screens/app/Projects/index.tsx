import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import {setProjects} from '../../../store/projects';
import styles from './styles';

const Projects = ({navigation}) => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Projects')
      .onSnapshot(
        snapshot => {
          const projectsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setProjects(projectsList));
          setLoading(false);
        },
        error => {
          console.error('Error fetching projects: ', error);
          setLoading(false);
        },
      );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const onProjectPress = projectId => {
    navigation.navigate('ProjectDetail', {projectId});
  };

  const handleDelete = projectId => {
    Alert.alert(
      'Elimina Progetto',
      'Vuoi davvero eliminare questo progetto? Cosi facendo eliminerai anche tutte le task associate',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('Projects').doc(projectId).delete();
            } catch (error) {
              console.error('Error deleting project: ', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderProject = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onProjectPress(item.id)}
      onLongPress={() => handleDelete(item.id)} 
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={{marginTop:-20}}>
    <Title>Home</Title>
      <TouchableOpacity
        style={styles.addCard}
        onPress={() => navigation.navigate('AddProjects')}
        >
        <View style={styles.cardContent}>
          <Text style={styles.cardAddTitle}>Crea nuovo progetto</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Projects'} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={projects}
          renderItem={renderProject}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default React.memo(Projects);
