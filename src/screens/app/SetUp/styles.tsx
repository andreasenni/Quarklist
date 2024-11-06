import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  userInfoText: {
    fontFamily:'neue regrade',
    fontWeight:'700',
    fontSize: 18,
    color: colors.QuarkYellow,
    marginBottom: 25,
  }, 
  text: {
    color: colors.white,
    fontFamily:'neue regrade',
    fontWeight:'700',
    fontSize:15,
  },
  logOutText:{
    color: colors.red,
    fontSize:15,
    fontFamily:'neue regrade',
    fontWeight:'700',
  },
  firstRow:{
    borderWidth:2,
    borderColor:colors.white,
    padding:20,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop:40,
    borderRadius:20,
    justifyContent:'center'
  },
  row: {
    borderWidth:2,
    borderColor:colors.white,
    padding:20,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical:24,
    borderRadius:20,
    justifyContent:'center'
  },
  logOutRow:{
    borderWidth:2,
    borderColor:colors.red,
    padding:20,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop:70,
    borderRadius:20,
    justifyContent:'center'
  },
});

export default styles;
