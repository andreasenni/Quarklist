import {StyleSheet} from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:colors.QuarkYellow,
        borderRadius:3,
        height:18,
        width:18,  
        justifyContent:'center',      
        alignItems:'center',      
        marginVertical:2
    },
    innerSquare:{
        width:10,
        height:10,
        backgroundColor:colors.QuarkYellow,
    },
    checkedbox:{borderWidth:2}
})


export default styles;