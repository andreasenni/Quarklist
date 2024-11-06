import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  item: {
    fontSize: 12,
    color: colors.white,
    fontFamily: 'neue regrade',
    fontWeight: '700',
    padding: 8,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
  },
  selectedItem: {
    color: colors.black,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    marginRight: 8,
    marginVertical: 14,
  },
  selectedItemContainer: {
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
});

export default styles;
