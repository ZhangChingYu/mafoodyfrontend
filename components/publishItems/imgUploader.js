import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image} from "react-native";
import { useState } from "react";
import { COLORS } from "../../globles";
import * as ImagePicker from "expo-image-picker";

const ImgUpLoader = ({passImgUriHandler}) => {
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);

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
            allowsEditing: false,
            allowsMultipleSelection:true,
            orderedSelection:true,  // show number of selected photo in order
            selectionLimit:1,       // maximum number of selected photos
            //base64:true,            // encoding the image into base64
            quality:0.1,            // compress the file [0,1]
        });
        if(!result.canceled){
            setImageUri(result.assets);
            passImgUriHandler(result.assets);
        }
        //console.log(imageUri);
    };
    return(
        <View style={styles.picUpLoader}>
            {
                imageUri && 
                <FlatList data={imageUri} horizontal renderItem={(object)=>{
                    return(
                        <View style={styles.imgHolder}><Image source={{uri:object.item.uri}} style={styles.picture} /></View>
                    ); 
                }}/>
            }
            <TouchableOpacity style={styles.uploadBtn} onPress={pick}>
                <Text style={styles.addTxt}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ImgUpLoader;

const styles = StyleSheet.create({
    picUpLoader:{
        marginVertical:10,
        marginBottom:30,
        backgroundColor:COLORS.white,
        borderRadius:25,
        padding:10,
        height:200,
        width:260,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
        justifyContent:'center',
        alignItems:'center',
    },
    imgHolder:{
        marginHorizontal:5,
        backgroundColor:COLORS.white,
        shadowColor:COLORS.black,
        shadowOpacity:0.7,
        shadowRadius:1,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    picture:{
        width:180,
        height:180,
    },
    uploadBtn:{
        position:'absolute',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.theme_yellow,
        height:40,
        width:40,
        borderRadius:25,
        top:180,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    addTxt:{
        textAlign:'center',
        fontSize:26,
        fontWeight:'600',
    },
})