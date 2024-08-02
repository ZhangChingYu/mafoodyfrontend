import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { COLORS, ICON } from "../globles";
import Icon from "react-native-vector-icons/Ionicons";
import "../global"

const root = global.root;

const RecipeItem = ({recipe, detail_handler}) =>{
    const [avatar, setAvatar] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        fetch(root+'/mafoody/avatar')
        .then((response) => response.json())
        .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {avatar} = responseJson.data
                setAvatar(avatar)
                setIsLoaded(true)
            }
        })
        .catch((error) => {
            //console.error(error);
            console.log(error)
        });
    },[])
    
    return(
        <TouchableOpacity style={styles.item} onPress={()=>detail_handler(recipe.id, avatar)} activeOpacity={0.8}>
            <View style={styles.RecipePicHolder}>
                <Image source={{uri:recipe.img}} style={styles.recipePic} />
            </View>
            <View style={styles.itemHeader}>
                <Text style={styles.title}>{recipe.name}</Text>
                
            </View>
            <View style={styles.authorHolder}>
                <View style={styles.picHolder}>
                    {isLoaded===true?<Image source={{uri:root+avatar}} style={styles.authorPic}/>:
                    <Image source={require('../assets/images/Logo.png')} style={styles.authorPic} />}
                </View>
                <Text style={styles.authorName}>{recipe.author}</Text>                
            </View>
        </TouchableOpacity>
    )
}

export default RecipeItem;

const styles = StyleSheet.create({
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
    picHolder:{
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:1,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    authorPic: {
        flex:1,
        height: 34,
        width: 34,
        marginRight: 8,
        borderRadius:25,
    },
    authorName: {
        flex:3,
        alignSelf:'center',
        fontSize: 12,
    }
})