import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  outlined: {
    backgroundColor: colors.white,
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});

export default styles;
