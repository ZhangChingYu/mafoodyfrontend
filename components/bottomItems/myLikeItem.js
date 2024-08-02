import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity,  Image, Text} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import '../../global'

const root = global.root;

const MyLikeItem = ({title, author, img, id, recipeDetailHandler}) =>{

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
        <TouchableOpacity style={styles.item} onPress={()=>recipeDetailHandler(id, avatar)}>
            <Image source={{uri:img}} style={styles.recipePic} />
            <View style={styles.itemHeader}>
                <Text numberOfLines={2} style={styles.title}>{title}</Text>
                <Icon name={ICON.full_heart} size={24} color={COLORS.theme_red} />
            </View>
            <View style={styles.authorHolder}>
                <View style={styles.picHolder}>
                    {isLoaded===true?<Image source={{uri:root+avatar}} style={styles.authorPic}/>:
                    <Image source={require('../../assets/images/Logo.png')} style={styles.authorPic} />}
                </View>
                <Text numberOfLines={2} style={styles.authorName}>{author}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MyLikeItem;

const styles = StyleSheet.create({
    item: {
        flex:1,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 4,
        margin: 4,
        justifyContent:'flex-end',
        alignItems:'baseline',
        shadowColor: COLORS.black,
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
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
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems:'center'
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
        height: 34,
        width: 34,
        marginRight: 8,
        borderRadius:25,
    },
    authorName: {
        flex:1,
        fontSize: 16,
    }
})