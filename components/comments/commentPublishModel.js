import React, { useState , useEffect} from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import RateIcon from "./rateIcon";
import ImgUpLoader from "./imgUploader";
//import ResultUploader from "./resultUpload";
import "../../global";

const root = global.root;

const CommentPublishModal = ({userId, recipeId, closeHandler, refreshHandler})=> {
    
    const [img, setImg] = useState([]);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [disableState, setDisableState] = useState(false)
    const getTodayDate =()=> {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  date.getHours().toString();
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();
        //console.log(year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second)
        // 2020-08-25 02:04:02
        return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
        
    }
    const checkInput = () => {
        if(img.length<1){
            alert('You seems to forget to upload your cooking result image.')
            return false
        }
        else if(content==''){
            alert('Please describe your experience with us.')
            return false
        }
        else if(rating==0){
            alert('The minimum rating is 1, please check you have rated the recipe.')
            return false
        }
        else{
            return true
        }
    }

    const subimtHandler = () => {
        if(checkInput()){
            // upload picture
            let imageData = new FormData();
            // file name is: userId-recipeId
            imageData.append('name', userId+'-'+recipeId)
            picture = img[0]
            let image = { uri : picture.uri.replace('file://',''), type: 'multipart/form-data', name : picture.fileName};
            imageData.append('image', image)
            console.log(imageData)
            
            fetch(root+'/mafoody/pictureupload', {
                method:'POST',
                headers:{},
                body:imageData,
            }) 
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                const {status}=responseJson
                if(status==200){
                    const {url}=responseJson.data
                    console.log(url)
                    const comment = {
                        user:userId,
                        recipe:recipeId,
                        content:content,
                        timestamp:getTodayDate(),
                        rating: rating,
                        img: url,
                    }
                    fetch(root+'/mafoody/comment/publish/',{
                        method:'POST',
                        headers:{},
                        body:JSON.stringify(comment)
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        const {status}=responseJson
                        if (status===200){
                            const {msg} = responseJson.data
                            alert(msg);
                            refreshHandler();
                            closeHandler();
                        }
                        else{
                            const {msg} = responseJson.data
                            alert(msg);
                        }
                    })
                    .catch((error) => {
                        //console.error(error);
                        console.log(error)
                    });
                }else{
                    console.log(responseJson)
                }
            })
            .catch((error)=>{
                //console.error(error);
                console.log(error)
            });
            

        }
    }
    const returnHandler = ()=>{
        refreshHandler();
        closeHandler();
    }

    return(
        <Modal visible={true} animationType="slide">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={()=>Keyboard.dismiss()} style={styles.container} activeOpacity={1} disabled={disableState}>
                <View style={styles.header}>
                    <Icon name={ICON.goBack} style={styles.goBack} size={30} onPress={returnHandler}/>
                    <Text style={styles.headerTxt}>Share Your Thought</Text>
                </View>
                <View style={styles.body}>
                    <ScrollView style={{paddingVertical:20}}>
                        <View style={styles.uploadWrapper}>
                            <Text style={styles.titleTxt}>Upload Your Cooking Result!</Text>
                            {
                               // <ResultUploader imgHandler={setImg}/>
                                }
                            <ImgUpLoader passImgUriHandler={setImg}/>
                        </View>
                        <View style={styles.commentWrapper}>
                            <Text style={styles.titleTxt}>Describe Your Experience!</Text>
                            <TextInput style={styles.input} placeholder="No more than 300 characters." onChangeText={(input)=>setContent(input)}
                            multiline={true} maxLength={300} numberOfLines={5} returnKeyType='default' 
                            blurOnSubmit={false}/>
                        </View>
                        <View style={styles.ratingWrapper}>
                            <Text style={styles.titleTxt}>Rate The Recipe</Text>
                            <RateIcon updateRateHandler={setRating}/>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.doneTxt}>Ready to submit?</Text>
                    <Icon name={ICON.done} style={styles.done} size={30} onPress={subimtHandler}/> 
                </View>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
}

export default CommentPublishModal;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:COLORS.primary,
    },
    header:{
        backgroundColor:COLORS.white,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:16,
    },
    goBack:{
        left:8,
        position:'absolute',
        marginLeft:8,
    },
    headerTxt:{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'500',
    },
    footer:{
        //position:'absolute',
        backgroundColor:COLORS.white,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:16,
    },
    doneTxt:{
        fontSize:20,
        fontWeight:'500',
        alignSelf:'center',
    },
    done:{
        position:'absolute',
        right:8,
    },
    uploadWrapper:{
        marginTop:10,
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal:20,
    },
    titleTxt:{
        fontSize:24,
        alignSelf:'center',
        marginVertical:4,
        fontWeight:'700',
        color:COLORS.header,
    },
    commentWrapper:{
        marginBottom:10,
    },
    input:{
        backgroundColor:COLORS.white,
        marginTop:10,
        color:COLORS.black,
        borderWidth:3,
        borderRadius:25,
        height:200,
        marginHorizontal:10,
        alignContent:'flex-start',
        padding:20,
        paddingTop:30,
        borderColor:COLORS.header
    },
    ratingWrapper:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30,
    },
    body:{
        flex:1,
        
    }
    
});