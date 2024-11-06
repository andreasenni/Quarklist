import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setToUpdate} from '../../../store/projects';
import Checkbox from '../../../components/Checkbox'; // Aggiungi l'importazione della checkbox
import styles from './styles';
import PlusIconProject from '../../../components/PlusIconProject';

const ProjectDetail = ({route, navigation}) => {
  const {projectId} = route.params;
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Projects')
      .doc(projectId)
      .onSnapshot(
        doc => {
          if (doc.exists) {
            setProject(doc.data());
          } else {
            console.error('No such document!');
          }
          setLoading(false);
        },
        error => {
          console.error('Error fetching project: ', error);
          setLoading(false);
        },
      );
  
    return () => unsubscribe();
  }, [projectId]);
  


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Tasks')
      .where('projectId', '==', projectId)
      .onSnapshot(
        snapshot => {
          const tasksList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTasks(tasksList);
          setLoading(false);
        },
        error => {
          console.error('Error fetching project tasks: ', error);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [projectId]);

  const deleteProject = async () => {
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
              // Delete all tasks associated with the project
              const tasksSnapshot = await firestore()
                .collection('Tasks')
                .where('projectId', '==', projectId)
                .get();
              const batch = firestore().batch();

              tasksSnapshot.docs.forEach(taskDoc => {
                batch.delete(taskDoc.ref);
              });

              await batch.commit();

              // Delete the project
              await firestore().collection('Projects').doc(projectId).delete();
              dispatch(setToUpdate()); // Notify Redux store of the update
              navigation.goBack(); // Navigate back to the previous screen
            } catch (error) {
              console.error('Error deleting project and tasks: ', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const onTaskUpdate = async task => {
    try {
      await firestore().collection('Tasks').doc(task.id).update({
        checked: !task.checked,
      });
      dispatch(setToUpdate());
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const renderTask = ({item}) => (

    <View style={styles.taskRow}>
      <Checkbox checked={item.checked} onPress={() => onTaskUpdate(item)} />
      <Text style={[styles.taskText, item.checked ? styles.checked : {}]}>
        {item.title}
      </Text>
    </View>

  );

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.separator}>
       <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image
          style={styles.backIcon}
          source={require('../../../assets/back.png')}
        />
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Text style={styles.projectTitle}>{project?.name}</Text>
        <PlusIconProject />
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={item => item.id}
            style={{marginTop:20}}
          />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteProject}>
            <Text style={styles.deleteButtonText}>Elimina Progetto</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
    </SafeAreaView>
  );
};

export default ProjectDetail;
