import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  item: {
    fontSize: 12,
    color: colors.black,
    fontFamily: 'neue regrade',
    fontWeight: '700',
    padding: 8,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    marginRight: 8,
    marginVertical: 14,
  },
  selectedItem: {
    color: colors.white,
  },
  selectedItemContainer: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
});

export default styles;
