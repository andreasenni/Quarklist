import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  separator:{
    paddingTop:70,
    backgroundColor: colors.QuarkYellow,
  }, 
  container: {
    backgroundColor: colors.QuarkYellow,
    height: '100%',

  },
  backContainer: {
    marginHorizontal:'auto',
    marginTop:-50,
    paddingBottom:30
  },
  backIcon: {
    width: 52,
    height: 52,
  },
  label: {
    fontSize: 12,
    color: colors.black,
    marginHorizontal: 24,
    fontWeight: '500',
    marginTop: 12,
  },
  button: {
    margin: 24,
    borderColor: colors.black,
    borderWidth: 2,
  },
});

export default styles;
