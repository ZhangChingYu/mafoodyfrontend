import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS,ICON } from "../globles";


const RatingIcon = ({rating, mystyle}) => {
    const rate = rating;
    const [iconSize, setIconSize] = useState(22);
   

    return(
        <View style={styles.container}>
            <Icon style={[styles.star, mystyle]} name={rate>=1 ? ICON.full_star: rate>=0.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>{}}/>
            <Icon style={styles.star} name={rate>=2 ? ICON.full_star: rate>=1.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>{}}/>
            <Icon style={styles.star} name={rate>=3 ? ICON.full_star: rate>=2.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>{}}/>
            <Icon style={styles.star} name={rate>=4 ? ICON.full_star: rate>=3.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>{}}/>
            <Icon style={styles.star} name={rate>=5 ? ICON.full_star: rate>=4.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>{}}/>
        </View>
    );
}

export default RatingIcon;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginRight:10,
    },
    star:{
        color:COLORS.theme_yellow,
    }
});