import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Dimensions} from "react-native";
import { useState } from "react";
import { COLORS } from "../../globles";
import * as ImagePicker from "expo-image-picker";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

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
            quality:0.2,            // compress the file [0,1]
        });
        if(!result.canceled){
            setImageUri(result.assets);
            passImgUriHandler(result.assets);
        }
        //console.log(imageUri);
    };
    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={styles.backBoard}></View>
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
        </View>
    );
}

export default ImgUpLoader;

const styles = StyleSheet.create({
    backBoard:{
        position:'absolute',
        height:100,
        width:SCREEN_WIDTH,
        backgroundColor:COLORS.bgColor,
    },
    picUpLoader:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginBottom:30,
        backgroundColor:COLORS.white,
        borderRadius:25,
        padding:10,
        height:180,
        width:180,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    imgHolder:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5,
        //backgroundColor:COLORS.white,
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
        width:150,
        height:150,
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
        top:160,
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