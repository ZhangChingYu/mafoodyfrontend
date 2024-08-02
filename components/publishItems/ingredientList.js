import React from "react";
import { StyleSheet, View, Text, FlatList} from "react-native";

import { COLORS } from "../../globles";

const IngredientList = (props) =>{
    const componentArray = props.array;
    return(
    <View style={styles.ingredientList}>
        {componentArray.length>0&&<FlatList data={componentArray} renderItem={(object)=>{
            return(
                <View style={styles.componentHolder}>
                    <Text style={styles.componentTxt}>{object.item.name}</Text>
                    <Text style={styles.componentTxt}>{object.item.amount}</Text>
                </View>
            );
        }}/>}
    </View>
    );
}

export default IngredientList;

const styles = StyleSheet.create({
    ingredientList:{
        marginBottom:20,
    },
    componentHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:6,
        margin:5,
        backgroundColor:COLORS.white,
        padding:10,
        borderRadius:10,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    componentTxt:{
        fontSize:16,
        fontWeight:'500',
    },
})

