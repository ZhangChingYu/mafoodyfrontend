import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../../globles";
import * as ImagePicker from "expo-image-picker";

const ResultUploader = (props) =>{
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [picture, setPicture] = useState();

    const permissionFunc = async () =>{
        // here is how you can get the camera permission
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        setGalleryPermission(imagePermission.status==='granted');
        if(imagePermission.status!=='granted'){
            //alert('Permission for media access needed!');
        }
        //console.log('[imagePermission.status]: ', imagePermission.status);
    };
    useEffect(()=>{
        permissionFunc();
    }, []);
    console.log(picture)
    const pick = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            //base64:true,            // encoding the image into base64
            quality:0.2,            // compress the file [0,1]
        });
        if(!result.canceled){
            setImageUri(result.assets);
            setPicture(result.assets[0]);
            props.imgHandler(result.assets[0]);
            //console.log(avatar);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}></View>
            <View style={styles.avatarHolder}>
                <Image source={{uri:picture.uri}} style={styles.avatar}/>
            </View>
            <TouchableOpacity style={styles.pickBtn} onPress={pick}>
                <Text style={styles.btnTxt}>Pick Picture</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResultUploader;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    box:{
        position:'absolute',
        paddingHorizontal:150,
        paddingVertical:70,
        backgroundColor:COLORS.white,
        borderRadius:25,
        marginTop:10,
        
    },
    avatarHolder:{
        backgroundColor:COLORS.header,
        height:160,
        width:160,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:1,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    avatar:{
        height:120,
        width:120,
        borderWidth:3,
        borderColor:COLORS.white,
        borderRadius:5,
        backgroundColor:COLORS.white,
    },
    pickBtn:{
        top:-16,
        backgroundColor:COLORS.theme_yellow,
        borderRadius:25,
        padding:4,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:1,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    btnTxt:{
        fontSize:16,
        color:COLORS.white,
    }
})