import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  separator: {
    marginTop: 70,
    height: '100%',
  },
  container: {
    backgroundColor: colors.QuarkYellow,
  },
  label: {
    fontFamily: 'neue regrade',
    fontSize: 12,
    color: colors.black,
    marginHorizontal: 24,
    fontWeight: '600',
    marginTop: 12,
  },
  button: {
    margin: 24,
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
});

export default styles;
