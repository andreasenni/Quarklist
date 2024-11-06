import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    marginTop:-20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 8,
  },
  taskText: {
    color: colors.white,
    marginLeft: 8,
    fontFamily: 'neue regrade',
    fontWeight: '500',
    fontSize: 14,
  },
  checked: {
    textDecorationLine: 'line-through',
    color: colors.lightGrey,
  },
  projectName: {
    color: colors.white,
    marginTop: 20,
    fontFamily: 'neue regrade',
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 2,
  },
});

export default styles;
