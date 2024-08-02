import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../globles";
import CookedIcon from "./cookedIcon";
import RatingIcon from "./ratingIcon";
import CommentModal from "./comments/commentModal";
import CommentPublishModel from "./comments/commentPublishModel";
import Author from "./author/Author";
import "../global";

const root = global.root;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');


const RecipeDetailModel = ({recipeId, userId, goBackHandler, authorPic})=>{
    
    const [likeCount, setLikeCount] = useState(0);
    const [collectCount, setCollectCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [isCollect, setIsCollect] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false); 
    const [commentPublishVisible, setCommentPublishVisible]= useState(false);
    const [authorVisible, setAuthorVisible] = useState(false);

    const [recipe,setRecipe] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        refreshHandler();
        fetch(root+'/mafoody/recipelikestate/?userId='+userId+'&recipeId='+recipeId)
        .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {state} = responseJson.data
                setIsLike(state)
            }
            else{
                console.log(responseJson.data)
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
    },[])
    const likeHandler = () =>{
        setIsLike(!isLike);
        //console.log(isLike);
        if(isLike===true){
            setLikeCount(likeCount-1);
        }
        else{
            setLikeCount(likeCount+1);
        }
        const data = {
            user:userId,
            recipe: recipeId,
            timestamp: getTodayDate()
        }
        fetch(root+'/mafoody/usercenter/like',{
            method:'PUT',
            headers:{},
            body:JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            const {status} = responseJson
            if(status==200){
                const {msg} = responseJson.data
                console.log(msg)
            }
            else{
                const {msg} = responseJson.data
                console.log(responseJson)
                alert(msg)
            }
        })
        .catch((error)=>{
            //console.error(error)
            console.log(error)
        })
    }

    const refreshHandler =  () =>{
        setIsLoaded(false);
        fetch(root+'/mafoody/recipedetail/?recipeId='+recipeId)
        .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recipe} = responseJson.data
                setRecipe(recipe);
                setLikeCount(recipe.like_count);
                setIsLoaded(true);
            }
            else{
                console.log(responseJson.data)
            }
          })
          .catch((error) => {
            console.log(error);
            goBackHandler();
          });
    }

    const collectHandler = () =>{
        setIsCollect(!isCollect);
        if(!isCollect){
            setCollectCount(collectCount+1);
        }
        else{
            setCollectCount(collectCount-1);
        }
        const data = {
            user:userId,
            author: recipe.author,
            timestamp: getTodayDate()
        }
        fetch(root+'/mafoody/subscirbe/',{
            method:'PUT',
            headers:{},
            body:JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            const {status} = responseJson
            if(status==200){
                const {msg} = responseJson.data
                console.log(msg)
            }
            else{
                const {msg} = responseJson.data
                console.log(responseJson)
                alert(msg)
            }
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    const closeCommentHandler = ()=>{
        setCommentVisible(false);
    }
    const closeCommentPublishHandler = (comment) =>{
        console.log(comment);
        setCommentPublishVisible(false);
    }
    const closeAuthorHandler = () =>{
        setAuthorVisible(false);
    }
    function cookedTxtHandler(){
        if(recipe.cookedCount>=2){
            return recipe.cooked[0].name+' and '+ (recipe.cookedCount-1) + ' others tried this recipe.';
        }else if(recipe.cookedCount>0){
            return 'User ' + recipe.cooked[0].name + ' had tried this recipe~';
        }else{
            return 'Ready to be the first one trying the recipe?'
        }
    }
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

    return(
        <Modal style={styles.container} animationType='slide'>
            {isLoaded?<SafeAreaView style={{flex:1}}>
                <View style={styles.header}>
                    <Icon style={styles.returnBtn} name={ICON.goBack} size={30} onPress={goBackHandler}/>
                    <Text style={styles.byTxt}>Published by. </Text>
                    <Text style={styles.authorName}>{recipe.author}</Text>
                    <TouchableOpacity style={styles.headPicHolder} onPress={()=>setAuthorVisible(true)}>
                        <Image source={{uri:root+authorPic}} style={styles.authorPic}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scroller}>
                    <View style={styles.pictureHodler}>
                        <Image source={{uri:recipe.img}} style={styles.foodPic}/>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleTxt}>{recipe.name}</Text>
                        <View style={styles.iconHolder}>
                            <Icon style={styles.like} name={isLike?ICON.full_heart:ICON.empty_heart} size={30} onPress={likeHandler}/>
                            <Text>{likeCount}</Text>
                        </View>
                        <View style={styles.iconHolder}>
                            <Icon style={styles.collect} name={isCollect?ICON.collected:ICON.collect} size={30} onPress={collectHandler}/>
                            <Text>{collectCount}</Text>
                        </View>
                    </View>
                    {recipe.cookedCount>0?<View style={styles.cookedBar}>
                        <View>
                            <CookedIcon targetUsers={recipe.cooked}/>
                        </View>
                        <Text style={styles.cookedTxt}>{cookedTxtHandler()}</Text>
                        <RatingIcon rating={recipe.rating}/>
                    </View>:<View></View>}
                    <View style={styles.contentHolder}>
                        <View style={styles.introHolder}>
                            <Text style={styles.introTitle}>Introduction</Text>
                            <Text style={styles.introContent}>{recipe.intro===null?'/**這個作者很懶，沒有編輯介紹喔～**/':recipe.intro}</Text>
                        </View>
                        <View style={styles.componentHolder}>
                            <Text style={styles.componentTitle}>Components</Text>
                            {recipe.component!==undefined?recipe.component.map((object)=>{
                                return(
                                    <View key={Math.random(10000)} style={styles.componentWraper}>
                                        <Text key={Math.random(10000)} style={styles.component}>{object}</Text>
                                    </View>
                                );
                            }):<ActivityIndicator size='large'/>}
                        </View>
                        <View style={styles.stepHolder}>
                            <Text style={styles.stepTitle}>Let's Cook It!</Text>
                            {recipe.step!==undefined?recipe.step.map((object,i)=>{
                                return(
                                    <View key={Math.random(10000)} style={styles.stepWraper}>
                                        <Text key={Math.random(10000)} style={styles.index}>{(i+1)+'.'}</Text>
                                        <Text key={Math.random(10000)} style={styles.step}>{object}</Text>
                                    </View>
                                );
                            }):<ActivityIndicator size='large'/>}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Icon style={[styles.like, styles.footerIcon]} name={isLike===true?ICON.full_heart:ICON.empty_heart} size={35} onPress={likeHandler}/>
                    <Icon style={[styles.collect, styles.footerIcon]} name={isCollect?ICON.collected:ICON.collect} size={35} onPress={collectHandler}/>
                    <View style={styles.commentWrapper}>
                        <Icon style={[styles.comment, styles.footerIcon]} name={ICON.comment} size={35} onPress={()=>{setCommentVisible(true)}}/>
                        <Text style={styles.commentCount}>{recipe.cookedCount}</Text>
                    </View>
                    <TouchableOpacity style={styles.commentBox} onPress={()=> setCommentPublishVisible(true)}>
                        <Text style={styles.commentTxt}>Share Your Cooking Result...</Text>
                    </TouchableOpacity>
                </View>
                {commentVisible && <CommentModal recipeId={recipe.id} visible={commentVisible} closeHandler={closeCommentHandler}/>}
                {commentPublishVisible && <CommentPublishModel recipeId={recipe.id} userId={userId} closeHandler={closeCommentPublishHandler} refreshHandler={refreshHandler}/>}
                {authorVisible && <Author visible={authorVisible} closeHandler={closeAuthorHandler} name={recipe.author} avatar={authorPic} userId={userId}/>}
            </SafeAreaView>:<ActivityIndicator size='large' style={{position:'absolute', top:SCREEN_HEIGHT/2-20, left:SCREEN_WIDTH/2-20}}/>} 
        </Modal>
    )
    
}

export default RecipeDetailModel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor:COLORS.white,
    },
    // header
    header:{
        justifyContent:'center',
        height:SCREEN_HEIGHT*0.09,
        backgroundColor:COLORS.white,
        flexDirection:'row',
        alignItems:'center',
    },
    returnBtn:{
        marginLeft:8,
        alignSelf:'center',
    },
    headPicHolder:{
        justifyContent:'center',
        alignItems:'center',
        //flex:1,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:1,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
        marginRight:10,
    },
    authorPic: {
        height: 40,
        width: 40,
        borderRadius:25,
    },
    byTxt:{
        alignSelf:'center',
        fontSize: 18,
        fontWeight: '300',
        marginLeft:10,
    },
    authorName:{
        flex:1,
        fontSize: 18,
        fontWeight:'600',
    },
    // scroller
    scroller:{
        flex:1,
        backgroundColor:'#ffffff00',
    },
    // scroller.foodPicture
    pictureHodler:{
        alignItems:'center',
        justifyContent:'center',
    },
    foodPic:{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/3,
    },
    // scroller.titleBar
    titleBar:{
        backgroundColor:COLORS.white,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        height:70,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:3,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation: 1,
    },
    titleTxt:{
        flex:1,
        fontSize:28,
        marginLeft: 20,
    },
    iconHolder:{
        flexDirection:'row',
        alignItems:'flex-end',
        paddingLeft:5,
        marginRight:10,
    },
    like:{
        color:COLORS.theme_red,
    },
    collect:{
        color:COLORS.primary,
    },
    // scroller.cookedBar
    cookedBar:{
        flexDirection:'row',
        alignItems: 'center'
    },
    cookedTxt:{
        marginLeft:20,
        marginTop: 10,
        flex:1,
        fontSize: 12,
        fontWeight:'200',
    },
    // scroller.content
    contentHolder:{
        padding:5,
    },
    introHolder:{
        marginBottom: 20,
    },
    introTitle:{
        fontSize:40,
        fontWeight:'bold',
        color:COLORS.primary,
    },
    introContent:{
        marginTop:5,
        fontSize:16,
    },
    componentHolder:{
        marginBottom: 20,
    },
    componentTitle:{
        fontSize:40,
        fontWeight:'bold',
        color:COLORS.header,
        marginBottom:5,
    },
    componentWraper:{
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:COLORS.light_purple,
        padding:2,
        borderWidth:2,
        borderColor:'#ffffff66',
        borderRadius:20,
    },
    component:{
        marginVertical:5,
        fontSize: 20,
        textAlign:'center',
    },
    stepHolder:{
        flex:1,
        marginBottom:20,
        alignItems:'stretch',
        backgroundColor:COLORS.white,
        borderRadius:6,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:3,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    stepTitle:{
        fontSize:40,
        fontWeight:'bold',
        color:COLORS.primary,
        marginBottom:5,
        textAlign:'center',
    },
    stepWraper:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:8,
        marginHorizontal:10,
        
    },
    index:{
        textAlign:'center',
        fontSize:25,
        color:COLORS.header,
        fontWeight:'bold',
    },
    step:{
        textAlign:'left',
        marginLeft:2,
        flex:1,
    },
    // footer
    footer: {
        height:SCREEN_HEIGHT/10,
        paddingVertical:5,
        backgroundColor: COLORS.white,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
    },
    footerIcon:{
        marginHorizontal:4,
    },
    commentWrapper:{
        flexDirection:'row',
        alignItems:'flex-end',
        
    },
    comment:{
        color:COLORS.header,
    },
    commentBox:{
        marginLeft:8,
        borderWidth:2,
        padding:4,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:25,
        backgroundColor:'#eeeeff',
        borderColor:COLORS.header,
    },
    commentTxt:{
        fontSize:14,
        textAlign:'center'
    }
});