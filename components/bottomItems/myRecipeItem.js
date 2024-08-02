import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import '../../global'

const root = global.root

const MyRecipeItem = ({user, data, editHandler}) => {
    const url = data.img;
    if(!url.includes('http')){
        return(
            <TouchableOpacity style={styles.item} onPress={()=>editHandler(data.id)}>
                <Image source={{uri:root+url}} style={styles.recipePic} />
                <View style={styles.itemHeader}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Icon name={data.isLike?ICON.full_heart:ICON.empty_heart} size={24} color={COLORS.theme_red} />
                    <Text style={styles.likeCount}>{data.like}</Text>
                </View>
                <View style={styles.authorHolder}>
                    <Image source={require('../../assets/images/profiles/male_1.jpeg')} style={styles.authorPic}/>
                    <Text style={styles.authorName}>{user.user_name}</Text>
                </View>
                <View style={styles.viewHolder}>
                    <Icon style={styles.viewIcon} name={ICON.view} size={22} />
                    <Text style={styles.viewCount}>{data.view}</Text>
                </View>
            </TouchableOpacity>
        );
    }else{
        return(
            <TouchableOpacity style={styles.item} onPress={()=>{console.log(data.id)}}>
                <Image source={{uri:url}} style={styles.recipePic} />
                <View style={styles.itemHeader}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Icon name={data.isLike?ICON.full_heart:ICON.empty_heart} size={24} color={COLORS.theme_red} />
                    <Text style={styles.likeCount}>{data.like}</Text>
                </View>
                <View style={styles.authorHolder}>
                    <Image source={require('../../assets/images/profiles/male_1.jpeg')} style={styles.authorPic}/>
                    <Text style={styles.authorName}>{user.user_name}</Text>
                </View>
                <View style={styles.viewHolder}>
                    <Icon style={styles.viewIcon} name={ICON.view} size={22} />
                    <Text style={styles.viewCount}>{data.view}</Text>
                </View>
            </TouchableOpacity>
        );

    }
}

export default MyRecipeItem;

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
        padding: 2,
    },
    likeCount:{
        fontSize:8,
        marginTop:14,
    },
    title: {
        flex:1,
        fontSize: 16,
        fontWeight: '500',
        alignSelf:'center',
    },
    like: {
        flex: 1,
        marginRight: 1,
    },
    authorHolder:{
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 4,
    },
    authorPic: {
        borderWidth:2,
        borderColor:COLORS.header,
        borderRadius:25,
        height: 30,
        width: 30,
        marginRight: 8,
    },
    authorName: {
        flex:1,
        fontSize: 16,
        alignSelf:'center',
    },
    viewHolder:{
        position:'absolute',
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor:'#00000077',
        borderRadius:25,
        paddingHorizontal:5,
        paddingVertical:1,
        top:70,
        left:10,
    },
    viewIcon:{
        color:COLORS.white,
    },
    viewCount:{
        fontSize:8,
        fontWeight:'400',
        color:COLORS.white,
    }
});