import {StyleSheet} from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.QuarkYellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        alignSelf:'center',
        borderWidth:2,
        borderRadius: 10,
        padding: 13,
        marginVertical:8
    },
    text:{
        color: colors.black,
        fontFamily:'neue regrade',
        fontSize: 18,
        fontWeight: 'bold'
    },
})


export default styles;