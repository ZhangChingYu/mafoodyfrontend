import React, { useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { COLORS } from "../globles";
import RecipeList from "./RecipeList";



const HomeList = ({recipe_data, user, detail_hander, isLoaded}) => {

    

    const elements = [
        {
            key: 'HomeIntro',
            element: 
            <View style={styles.body}>
                <Text style={styles.hello}>Hello, {user.user_name}</Text>
                <Text style={styles.intro}>Welcome to the best recipe recommendation system!</Text>
                <Text style={styles.title}>MAFOODY</Text>
            </View>
        },
        {key: 'RecipeList', element: <RecipeList recipe_data={recipe_data} detail_hander={detail_hander} user={user}/>}
    ];
    return(
        <View style={styles.listHolder}>
            {isLoaded===true?<FlatList
           
            data={elements}
            renderItem={(object) =>{
                return(
                    <View>{object.item.element}</View>
                );
            }} 
            />:<ActivityIndicator size={100}/>}
        </View>
    );
}

export default HomeList;

const styles = StyleSheet.create({
    listHolder: {
        flex:1,
    },
    body: {
        marginTop: -10,
        backgroundColor: COLORS.theme_yellow,
        bottom: -20,
        paddingTop: 10,
        paddingBottom: 60,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: -1,
            width: 0
        },
        elevation: 2,
    },
    hello: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    intro: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 6,
    },
    title:{
        fontSize: 40,
        fontWeight: '900',
        textAlign: 'center',
        color: COLORS.light_yellow,
        shadowColor: COLORS.black,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height:0,
            width:1
        },
        elevation: 2,
    },
    
});