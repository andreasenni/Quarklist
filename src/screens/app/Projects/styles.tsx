import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 8,
  },
  taskText: {
    color: colors.black,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 36,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  addCard: {
    backgroundColor: 'rgba(245, 203, 92, 0.32)',
    padding: 10,
    marginTop: 8,
    marginBottom: 28,
    marginHorizontal: 16,
    borderColor: colors.QuarkYellow,
    borderRadius: 8,
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'neue regrade',
  },
  cardAddTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.QuarkYellow,
    margin: 'auto',
    fontFamily: 'neue regrade',
  },
});

export default styles;
