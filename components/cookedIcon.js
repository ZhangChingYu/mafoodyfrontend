import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { COLORS } from "../globles";

headPics = ['female_1.jpeg','female_2.jpeg','male_1.jpeg']

const CookedIcon = ({targetUsers}) =>{
    const cookedUsers = targetUsers;
    //console.log(cookedUsers);
    const userName1 = 'female_1.jpeg';
    const userName2 = 'female_2.jpeg';
    const userName3 = 'male_1.jpeg';
  
  
    return (
        <View style={styles.container}>
            <View style={styles.headPicHolder}>
                <Image style={styles.headPic} source={require('../assets/images/profiles/'+userName1)} />
            </View>
            {cookedUsers.length>1&&<View style={styles.headPicHolder}>
                <Image style={styles.headPic} source={require('../assets/images/profiles/'+userName2)} />
            </View>}
            {cookedUsers.length>2&&<View style={styles.headPicHolder}>
                <Image style={styles.headPic} source={require('../assets/images/profiles/'+userName3)} />
            </View>}
        </View>
    );
}

export default CookedIcon;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        paddingLeft: 20,
        marginTop: 10,
    },
    headPicHolder:{
        borderRadius:25,
        shadowColor: COLORS.black,
        shadowOpacity:0.5,
        shadowRadius: 3,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation: 2,
    },
    headPic:{
        height:40,
        width:40,
        borderWidth: 2,
        borderColor:COLORS.theme_yellow,
        borderRadius:25,
        marginLeft: -10,
    }
});