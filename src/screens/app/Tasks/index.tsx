import React, {useEffect, useState} from 'react';
import {SectionList, SafeAreaView, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Checkbox from '../../../components/Checkbox';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import styles from './styles';
import Categories from '../../../components/Categories';
import {categories} from '../../../constants/categories';
import {setTasks, setToUpdate} from '../../../store/tasks';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.data); // Verifica che le tasks siano presenti
  const user = useSelector(state => state.user.data);
  const projects = useSelector(state => state.projects.data); // Ottieni i progetti dal Redux
  const toUpdate = useSelector(state => state.tasks.toUpdate);

  const [category, setCategory] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Tasks')
      .where('userId', '==', user?.uid)
      .onSnapshot(querySnapshot => {
        const tasksList = [];
        querySnapshot.forEach(documentSnapshot => {
          tasksList.push({
            uid: documentSnapshot.id,
            ...(documentSnapshot.data() || {}),
          });
        });
        dispatch(setTasks(tasksList));
      });

    return () => unsubscribe();
  }, [user, toUpdate, dispatch]);

  useEffect(() => {
    if (category && category !== 'all') {
      const filtered = tasks?.filter(task => task?.category === category);
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [category, tasks]);

  const onTaskUpdate = item => {
    firestore()
      .collection('Tasks')
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      });
  };

  const groupTasksByProject = tasks => {
    const groupedTasks = {};

    tasks.forEach(task => {
      const project = projects.find(p => p.id === task.projectId);
      const projectName = project ? project.name : 'Unknown Project';

      if (!groupedTasks[projectName]) {
        groupedTasks[projectName] = [];
      }
      groupedTasks[projectName].push(task);
    });

    return Object.entries(groupedTasks)
      .filter(([, tasks]) => tasks.length > 0)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([project, tasks]) => ({title: project, data: tasks}));
  };

  const renderTask = ({item}) => {
    return (
      <View style={styles.row}>
        <Checkbox checked={item.checked} onPress={() => onTaskUpdate(item)} />
        <Text style={[styles.taskText, item?.checked ? styles.checked : {}]}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Tasks'} />

      <SectionList
        sections={groupTasksByProject(filteredTasks)}
        keyExtractor={item => String(item?.uid)}
        renderItem={renderTask}
        renderSectionHeader={({section: {title}}) => (
          <View>
            <Text style={styles.projectName}>{title}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={{marginBottom: 15}}>
            <Title>Tasks</Title>
            <Categories
              categories={[{label: 'tutte', value: 'all'}, ...categories]}
              selectedCategory={category}
              onCategoryPress={setCategory}
            />
          </View>
        }
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Tasks);
