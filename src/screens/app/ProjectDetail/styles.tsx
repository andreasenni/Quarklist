import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  separator: {
    marginTop: 50,
    height: '92%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
  },
  backContainer: {
    padding: 10,
  },
  backIcon: {
    width: 65,
    height: 65,
    marginLeft: -15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  projectTitle: {
    fontFamily: 'neue regrade',
    fontSize: 25,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 20,
    marginLeft: 18,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
    marginLeft: 8,
    color: colors.white,
  },
  checked: {
    textDecorationLine: 'line-through',
    color: colors.lightGrey,
  },
  deleteButton: {
    backgroundColor: 'red',
    width:'95%',
    marginHorizontal:'auto',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
