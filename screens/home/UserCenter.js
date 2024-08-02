import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, Dimensions, SafeAreaView} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../components/bottomSheetContainer";
import UserProfile from "../../components/userProfile";
import RecipeDetailModel from "../../components/recipeDetailModel";
import RecipeEdit from "../../components/bottomItems/RecipeEdit";
import "../../global";

const root = global.root;

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const bg_path = '../../assets/images/bg/vegeteble.jpeg';
const pic_path = '../../assets/images/bg/image.jpg';

const UserCenter = ({route, navigation})=>{
    const {user} = route.params;
    //console.log(user)
    const mockdata = {following: '103', like: '25.3K', follower: '307'};
    const [recipeId, setRecipeId] = useState();
    const [avatar, setAvatar] = useState('')
    const [editRecipeId, setEditRecipeId] = useState();
    const [editRecipeshow, setEditRecipeShow] = useState(false);
    const [detailShow, setDetialShow] = useState(false);
    const [myRecipeList, setMyRecipeList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const onPressDetailHandler = (id, avatar)=> {
        setAvatar(avatar);
        setRecipeId(id);
        setDetialShow(true);
    }

    const onEditRecipePress = (id) => {
        setEditRecipeId(id);
        setEditRecipeShow(true);
    }
    
    useEffect(()=>{
        
            fetch(root+'/mafoody/usercenter/like?id='+user.id)
            .then((response) => response.json())
            .then((responseJson) => {
                const {status} = responseJson
                if(status == 200){
                    const {like_list} = responseJson.data
                    setLikeList(like_list);
                }
                else{
                    console.log(responseJson.data)
                }
            })
            .catch((error) => {
                //console.error(error);
                console.log(error)
            });
            fetch(root+'/mafoody/usercenter/comment?id='+user.id)
            .then((response) => response.json())
            .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {comment_list} = responseJson.data
                setCommentList(comment_list);
            }
            else{
                console.log(responseJson.data)
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
          });
        
        
            fetch(root+'/mafoody/usercenter/myrecipe?id='+user.id)
            .then((response) => response.json())
            .then((responseJson) => {
                const {status} = responseJson
                if(status == 200){
                    const {recipe_list} = responseJson.data
                    setMyRecipeList(recipe_list);
                    setIsLoaded(true);
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
    return(
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require(bg_path)} style={{flex: 1}}>
                    <View style={styles.header}>
                        <Icon name={ICON.home} size={25} color={COLORS.white} onPress={()=>navigation.goBack()}/>
                        <Icon name={ICON.edit} size={25} color={COLORS.white} onPress={()=>navigation.navigate('ProfileEdit', {user})}/>
                        <Icon name={ICON.setting} size={25} color={COLORS.white} onPress={()=>navigation.navigate('Settings')}/>
                    </View>
                    <UserProfile userData={user} mockData={mockdata}/>
                </ImageBackground>
            </SafeAreaView>
            <BottomSheet pressHandler={onPressDetailHandler} user={user} isLoaded={isLoaded} likeList={likeList} myRecipeList={myRecipeList} commentList={commentList} editHandler={onEditRecipePress}/> 
            {detailShow===true&&<RecipeDetailModel recipeId={recipeId} userId={user.id} goBackHandler={()=>setDetialShow(false)} authorPic={avatar}/>}
            {editRecipeshow===true&&<RecipeEdit recipeId={editRecipeId} closeHandler={setEditRecipeShow}/>}
        </GestureHandlerRootView>  
    );
}

export default UserCenter;

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT/2,
        backgroundColor: '#fff',
    },
    header: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#00000088',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff88',
    },
    profileHolder: {
        flex: 5,
        backgroundColor: '#00000088',
        flexDirection: 'row',
    },
    profile: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureHolder: {
        marginTop: 4,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 160/2,
        borderColor: COLORS.white,
    },
    profilePic: {
        width: 120,
        height: 160,
        borderRadius: 160/2,
    },
    userName: {
        marginTop: 10,
        fontSize: 24,
        color: COLORS.white,
    },
    userId: {
        marginVertical: 2,
        fontSize: 18,
        color: COLORS.white,
    },
    digit: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderLeftColor: '#ffffff88'
    },
    digitItem: {
        marginVertical: 20,
    },
    number: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    numberTxt: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.white,
    },
});