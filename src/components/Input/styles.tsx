import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth:1,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 10,
    marginVertical: 12,
    color:colors.black,
    fontFamily:'neue regrade',
    fontWeight:'700',
    width:'95%',
    alignSelf:'center'
},
});

export default styles;
