import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";


const RateIcon = ({updateRateHandler}) => {
    const [rate, setRate] = useState(0);
    const iconSize = 50;
    const onPress = (index) =>{
        setRate(index)
        updateRateHandler(index)
    }

    return(
        <View style={styles.container}>
            <Icon style={styles.star} name={rate>=1 ? ICON.full_star: rate>=0.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>onPress(1)}/>
            <Icon style={styles.star} name={rate>=2 ? ICON.full_star: rate>=1.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>onPress(2)}/>
            <Icon style={styles.star} name={rate>=3 ? ICON.full_star: rate>=2.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>onPress(3)}/>
            <Icon style={styles.star} name={rate>=4 ? ICON.full_star: rate>=3.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>onPress(4)}/>
            <Icon style={styles.star} name={rate>=5 ? ICON.full_star: rate>=4.5?ICON.half_star:ICON.empty_star} size={iconSize} onPress={()=>onPress(5)}/>
        </View>
    );
}

export default RateIcon;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginRight:10,
    },
    star:{
        marginHorizontal:4,
        color:COLORS.theme_yellow,
    }
});