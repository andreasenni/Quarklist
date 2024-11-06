import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const MiniTitle = ({children}) => {
  return (
    <Text style={styles.title}>
      {children}
    </Text>
  );
};

export default React.memo(MiniTitle);