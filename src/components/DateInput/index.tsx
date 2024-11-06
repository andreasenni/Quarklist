import moment from 'moment';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './styles';

const DateInput = ({value, onChange, ...props}) => {
  const [open, setOpen] = useState(false);

  const onDateOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <TouchableOpacity onPress={onDateOpen} style={styles.outlined}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require('../../assets/calendar.png')}
        />
        <Text style={styles.text}>
          {moment(value).format('D/M/YYYY') || 'Seleziona Data'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={value}
        locale='it'
        title={'Seleziona una data valida'}
        confirmText='Conferma'
        cancelText='Annulla'
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default React.memo(DateInput);
