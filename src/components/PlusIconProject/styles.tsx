import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.QuarkYellow,
    marginHorizontal:'auto',
    marginTop:10
  },
  plus: {
    fontSize: 32,
    marginTop: -3,
    color: colors.black,
    fontWeight: '600',
  },
});

export default styles;
