import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Input from '../../../components/Input';
import {categories} from '../../../constants/categories';
import DateInput from '../../../components/DateInput';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setToUpdate} from '../../../store/tasks';
import moment from 'moment';
import MiniTitle from '../../../components/MiniTitle';
import CategoriesTasks from '../../../components/CategoriesTasks';

const AddTask = ({navigation}) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Projects')
      .onSnapshot(
        snapshot => {
          const projectList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projectList);
          if (projectList.length > 0) {
            setSelectedProject(projectList[0].id);
          }
        },
        error => {
          console.error('Error fetching projects: ', error);
        },
      );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, []);


  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const deadlineFormatted = moment(deadline).format('YYYY-MM-DD');

    // Check if the title is provided
    if (!title) {
      Alert.alert('Inserisci un titolo');
      return;
    }

    // Check if the category is selected
    if (!category) {
      Alert.alert('Seleziona una categoria');
      return;
    }

    // Check if the deadline is valid
    if (moment(deadlineFormatted).isBefore(today)) {
      Alert.alert('Inserisci una data valida');
      return;
    }

    setLoading(true);

    // Add the task to the Firestore collection
    firestore()
      .collection('Tasks')
      .add({
        title,
        deadline,
        category,
        projectId: selectedProject,
        checked: false,
        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        console.log('Task added!');
        navigation.navigate('Tasks');
        setTitle('');
        setDeadline(new Date());
        setCategory(null);
        setSelectedProject(projects.length > 0 ? projects[0].id : '');
      })
      .catch(e => {
        console.log('Error when adding tasks:>>', e);
        setLoading(false);
        Alert.alert(e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separator}>
        <SafeAreaView>
        <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image
          style={styles.backIcon}
          source={require('../../../assets/backDown.png')}
        />
      </Pressable>
          <MiniTitle>Crea Nuova task</MiniTitle>

          <Text style={styles.label}>Cosa dobbiamo fare?</Text>
          <Input
            value={title}
            onChangeText={setTitle}
            outlined
            placeholder="Descrivi la task..."
          />

          <Text style={styles.label}>In che categoria la mettiamo?</Text>
          <CategoriesTasks
            categories={categories}
            selectedCategory={category}
            onCategoryPress={setCategory}
          />
          {/*   <Text style={styles.label}>Quanto tempo abbiamo?</Text>
          <DateInput value={deadline} onChange={setDeadline} /> */}

          <Text style={styles.label}>Di che progetto fa parte?</Text>
          <Picker
            selectedValue={selectedProject}
            onValueChange={itemValue => setSelectedProject(itemValue)}>
            {projects.map(project => (
              <Picker.Item
                key={project.id}
                label={project.name}
                value={project.id}
              />
            ))}
          </Picker>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button style={styles.button} type={'blue'} onPress={onSubmit}>
              Aggiungi task
            </Button>
          )}
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(AddTask);
