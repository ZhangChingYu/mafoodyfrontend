import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../../globles";
import HomeList from '../../components/HomeList';
import Publish from "./Publish";
import RecipeDetailModel from "../../components/recipeDetailModel";
import "../../global";

const root = global.root;


const Home = ({route, navigation})=>{
    const {user} = route.params; 
    const [detailShow, setDetialShow] = useState(false);
    const [recipeId, setRecipeId] = useState();
    const [avatar, setAvatar] = useState()
    const [recommendList, setRecommendList] = useState([])
    const [recipeLoaded, setRecipLoaded] = useState(false)
    const [loadMoreRecipe, setLoadMoreRecipe] = useState(true)

    useEffect(() => {
        fetch(root+'/mafoody/recipeoutline/?userId='+user.id+'&index='+0)
          .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recommend} = responseJson.data
                setRecommendList(recommend);
                setRecipLoaded(true)
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
    
    },[])

    var index = 1
    const LoadMoreHandler = () =>{
        if(index<25){
            fetch(root+'/mafoody/recipeoutline/?userId='+user.id+'&index='+(index*40))
            .then((response) => response.json())
            .then((responseJson) => {
                const {status} = responseJson
                if(status == 200){
                    const {recommend} = responseJson.data
                    total_list = recommendList.concat(recommend)
                    setRecommendList(total_list);
                    index ++
                    LoadMoreHandler()
                }
            })
            .catch((error) => {
                //console.error(error);
                console.log(error)
            });
        }
    }

    if(recipeLoaded==true && loadMoreRecipe==true){
        setLoadMoreRecipe(false)
        //LoadMoreHandler()
    }

    

    const [modalIsVisible, setModalisVisible] = useState(false);
    const [clickState, setClickState] = useState(0);
    

    const SelectHandler = (selected) => {
        // For You: 0; Subscrib: 1; Trend: 2
        setClickState(selected);
        if (selected===0){
            setRecipLoaded(false)
            fetch(root+'/mafoody/recipeoutline/?userId='+user.id+'&index='+0)
          .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recommend} = responseJson.data
                setRecommendList(recommend);
                setRecipLoaded(true)
            }
          })
          .then(()=>{
                setLoadMoreRecipe(true)
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
        }
        else if (selected===1){
            index=1
            setRecipLoaded(false)
            fetch(root+'/mafoody/subscirbe/?id='+user.id)
          .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recipe_list} = responseJson.data
                setRecommendList(recipe_list);
                setRecipLoaded(true)
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
        }
        else if (selected===2){
            index=1
            setRecipLoaded(false)
            fetch(root+'/mafoody/trend/?id='+user.id)
          .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recipe} = responseJson.data
                setRecommendList(recipe);
                setRecipLoaded(true)
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
        }
    }
    const onPressDetailHandler = (id, avatar) => {
        //navigation.navigate('RecipeDetail', {recipeId:id});
        setAvatar(avatar);
        setRecipeId(id);
        setDetialShow(true);
    }

    const startPublishRecipe = () => {
        setModalisVisible(true);
    }

    const endPublishRecipe = () => {
        setModalisVisible(false);
    }

    //console.log(user)
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.headBtn, {backgroundColor:clickState===0 ? COLORS.theme_red : COLORS.theme_blue}]} onPress={()=>SelectHandler(0)}>
                    <Text style={styles.headBtnTxt}>For You</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headBtn, {backgroundColor:clickState===1 ? COLORS.theme_red : COLORS.theme_blue}]} onPress={()=>SelectHandler(1)}>
                    <Text style={styles.headBtnTxt}>Subscribe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headBtn, {backgroundColor:clickState===2 ? COLORS.theme_red : COLORS.theme_blue}]} onPress={()=>SelectHandler(2)}>
                    <Text style={styles.headBtnTxt}>Trend</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userCenterBtn} onPress={() => navigation.navigate('UserCenter', {user})}>
                    <Image source={require('../../assets/images/profiles/male_1.jpeg')} style={styles.headPic} />
                </TouchableOpacity>
            </View>
           
            <HomeList recipe_data={recommendList} user={user} detail_hander={onPressDetailHandler} isLoaded={recipeLoaded}/>
            {modalIsVisible && <Publish isVisible={modalIsVisible} endPublishRecipe={endPublishRecipe} userName={user.user_name}/>} 
            
            <TouchableOpacity style={styles.publishBtn} onPress={()=>startPublishRecipe()}>
                <Text style={styles.publishTxt}>+</Text>
            </TouchableOpacity>
            
            {detailShow===true&&<RecipeDetailModel recipeId={recipeId} userId={user.id} goBackHandler={()=>setDetialShow(false)} authorPic={avatar}/>}
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingBottom: 10,
        marginTop: 20,
    },
    headBtn: {
        flex:1,
        marginHorizontal: 6,
        height: 40,
        width: 70,
        backgroundColor: COLORS.theme_blue,
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 2,
    },
    headBtnTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.white,
    },
    userCenterBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius:2,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    headPic: {
        height: 50,
        width: 50,
        borderRadius:25,
        borderWidth:2,
        borderColor:COLORS.theme_yellow,
    },
    publishBtn:{
        position: 'absolute',
        height: 80,
        width: 80,
        backgroundColor: COLORS.light_yellow,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: COLORS.theme_yellow,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -16,
        right: -16,
        shadowColor: COLORS.black,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset:{
            height:-1,
            width:-1
        },
        elevation: 6,
    },
    publishTxt: {
        position: 'absolute',
        fontSize: 80,
        textAlign: 'center',
        color: COLORS.theme_yellow,
        bottom: 1,
        right: 16,
    }
});