import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Dimensions} from "react-native";
import { useState } from "react";
import { COLORS } from "../../globles";
import * as ImagePicker from "expo-image-picker";

const BGUpLoader = (props)=>{
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [bgImg, setBgImg] = useState(props.oldBG);
    
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

    const pick = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[1,1],
            orderedSelection:true,  // show number of selected photo in order
            selectionLimit:1,       // maximum number of selected photos
            //base64:true,            // encoding the image into base64
            quality:0.2,            // compress the file [0,1]
        });
        if(!result.canceled){
            setImageUri(result.assets[0]);
            setBgImg(result.assets[0].uri);
            //console.log(bgImg);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.bgHolder}>
                <Image source={{uri:bgImg}} style={styles.bg}/>
            </View>
            <TouchableOpacity style={styles.pickBtn} onPress={pick}>
                <Text style={styles.btnTxt}>Pick Picture</Text>
            </TouchableOpacity>
        </View>
    );
}

export default BGUpLoader;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    bgHolder:{
        backgroundColor:COLORS.white,
        borderRadius:10,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    bg:{
        height:180,
        width:(180*4/3),
        borderRadius:10,
    },
    pickBtn:{
        top:-16,
        backgroundColor:COLORS.primary,
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