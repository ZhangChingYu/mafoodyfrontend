import React from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { COLORS, ICON } from "../../globles";
import Icon from "react-native-vector-icons/Ionicons";
import RecipeItem from "./RecipeItem";

const RecipeList = ({recipe_data, detail_hander, avatar}) => {
    return (
        <View style={styles.listHolder}>
            <FlatList 
            style={styles.list}
            data={recipe_data}
            numColumns={2}
            renderItem={(object)=>{
                return(
                    <RecipeItem recipe={object.item} detail_handler={detail_hander} headPic={avatar}/>
                );
            }}/>
        </View>
    );
}

export default RecipeList;

const styles = StyleSheet.create({
    listHolder: {
        flex: 1,
        paddingTop: 16,
        alignItems: 'center',
        backgroundColor: COLORS.header,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        shadowColor: COLORS.black,
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: -6,
    },
    list: {
        flex:1,
        marginBottom: 4,
    },
    item: {
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 4,
        margin: 4,
        justifyContent:'flex-end',
        alignItems:'baseline',
    },
    RecipePicHolder: {
        flex:4,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    recipePic: {
        flex:1,
        height: 100,
        width: 160,
        borderRadius: 8,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 8,
    },
    title: {
        flex: 5,
        fontSize: 16,
        fontWeight: '500',
    },
    like: {
        flex: 1,
        marginRight: 1,
    },
    authorHolder:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        paddingHorizontal: 8,
    },
    authorPic: {
        flex:1,
        height: 34,
        width: 28,
        marginRight: 8,
    },
    authorName: {
        flex:3,
        alignSelf:'center',
        fontSize: 12,
    },
    loader:{
        color:COLORS.header
    }
});