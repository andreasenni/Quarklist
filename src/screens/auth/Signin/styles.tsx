import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginHorizontal:24,
    backgroundColor:colors.black,
    textAlign:'center',
  },
  footerText:{
    color:colors.QuarkGray,
    fontSize:15,
    textAlign:'center',
    marginTop:28,
    fontFamily:'neue regrade',
    fontWeight:'800'
  },
  footerLink:{
    color:colors.QuarkYellow,
    textDecorationLine: 'underline',
  }
  
});

export default styles;
