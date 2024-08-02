import React, { useState , useEffect} from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import RatingIcon from "../ratingIcon";
import "../../global"

const root = global.root;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const CommentModal = (props)=> {
    const recipeId = props.recipeId;
    console.log(recipeId);
    const [ratingState, setRatingState] = useState(0);
    const [latestState, setLatesState] = useState(0)
    //const data = mockdata;

    const [isLoaded, setIsLoaded] = useState(false)
    const [comment, setComment] = useState([])
    
    useEffect(()=>{
        fetch(root+'/mafoody/recipedetail/comment/?recipeId='+recipeId)
        .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {comment} = responseJson.data
                setComment(comment);
                setIsLoaded(true);
                console.log(comment);
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
    }, [])

    const latestHandler = () =>{
        if (latestState ===0){
            setLatesState(1);
        }
        else if(latestState===1){
            setLatesState(2);
        }
        else if(latestState===2){
            setLatesState(0);
        }
    }
    const ratingHandler = () =>{
        if (ratingState ===0){
            setRatingState(1);
        }
        else if(ratingState===1){
            setRatingState(2);
        }
        else if(ratingState===2){
            setRatingState(0);
        }
    }


    return(
        <Modal visible={props.visible} animationType="slide">
            {isLoaded===true?
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.arrow} name={ICON.goBack} size={30} onPress={props.closeHandler}/>
                    <Text style={styles.headerTxt}>Comments</Text>
                </View>
                <View style={styles.listWrapper}>
                    <FlatList 
                    data={comment}
                    renderItem={(object)=>{
                        return(
                            <View style={styles.itemHodler}>
                                <View style={styles.contentHolder}>
                                    <View style={styles.Info}>
                                        <Image source={require('../../assets/images/Logo.png')} style={styles.headPic}/>
                                        <Text style={styles.name} numberOfLines={1}>{object.item.name}</Text>
                                        <View style={styles.rating}><RatingIcon rating={object.item.rating}/></View>
                                    </View>
                                    <View style={styles.comment}>
                                        <Text style={styles.commentTxt}  numberOfLines={5}>{object.item.content}</Text>
                                        <Text style={styles.date}>{object.item.timestamp}</Text>
                                    </View>
                                </View>
                                <View style={styles.pictureHolder}>
                                    {object.item.img===null?<Image source={require('../../assets/images/bg/spicy.jpeg')} style={styles.recipePic}/>:
                                    <Image source={{uri:root+object.item.img}} style={styles.recipePic}/>}
                                    
                                </View>
                            </View>
                        );
                    }}/>
                </View>
            </SafeAreaView>:<ActivityIndicator style={styles.load} size='large'/>}
        </Modal>
    );
}

export default CommentModal;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:COLORS.transparent_theme_purple,
    },
    header:{
        height:SCREEN_HEIGHT*0.1,
        backgroundColor:COLORS.white,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        shadowOpacity:0.6,
        shadowRadius:1,
        shadowOffset:{
            width:-1,
            height:1,
        },
        elevation:1,
    },
    headerTxt:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.header
    },
    arrow:{
        position:'absolute',
        left:10,
        color:COLORS.header,
    },

    //list 
    listWrapper:{
        flex:6,
        backgroundColor:'#ffffff00',
        padding:1,
    },
    itemHodler:{
        flex:1,
        flexDirection:'row',
        margin:4,
        backgroundColor:COLORS.white,
        padding:4,
        paddingVertical:14,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    contentHolder:{
        flex:2,
       
    },
    pictureHolder:{
        
        backgroundColor:COLORS.primary
    },
    Info:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        
    },
    headPic:{
        flex:2,
        height:30,
        width:30,
        marginHorizontal:3,
        marginRight:5,
    },
    name:{
        flex:6,
    },
    rating:{
        flex:8,
    },
    comment:{
        flex:2,
        alignItems:'stretch',
        marginRight:1,
        marginTop:4,
        marginLeft:8,
    },
    commentTxt:{
        flex:1,
        fontSize:12,
    },
    date:{
        fontSize:12,
        color:'gray',
    },
    recipePic:{
        height:100,
        width:100,
    },
    load:{
        position:'absolute',
        left: SCREEN_WIDTH/2-20,
        top: SCREEN_HEIGHT/2-20,
    }
});