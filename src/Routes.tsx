import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import Onboarding from './screens/auth/Onboarding';
import Signin from './screens/auth/Signin';
import Signup from './screens/auth/Signup';
import Home from './screens/app/Home';
import Tasks from './screens/app/Tasks';
import Projects from './screens/app/Projects';
import AddTask from './screens/app/AddTask';
import AddProjects from './screens/app/AddProjects';
import ProjectDetail from './screens/app/ProjectDetail';
import {setUser} from './store/user';
import SetUp from './screens/app/SetUp';
import colors from './constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen
      name="AddTask"
      component={AddTask}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddProjects"
      component={AddProjects}
      options={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProjectsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Projects" component={Projects} />
    <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
  </Stack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.black,
      },
    }}>
    <Tab.Screen
      name="Projects"
      component={ProjectsStack}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={styles.icon}
            source={
              focused
                ? require('./assets/home_active.png')
                : require('./assets/home_inactive.png')
            }
          />
        ),
      }}
    />
    <Tab.Screen
      name="Tasks"
      component={Tasks}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={styles.icon}
            source={
              focused
                ? require('./assets/tasks_active.png')
                : require('./assets/tasks_inactive.png')
            }
          />
        ),
      }}
    />
    <Tab.Screen
      name="SetUp"
      component={SetUp}
      options={{
        tabBarIcon: ({focused}) => (
          <Image
            style={styles.icon}
            source={
              focused
                ? require('./assets/setup_active.png')
                : require('./assets/setup_inactive2.png')
            }
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const Routes = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) {
    return <MainStack />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default React.memo(Routes);
