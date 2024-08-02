import React, { useEffect } from "react";
import { StyleSheet, View, Text, Modal, SafeAreaView, Dimensions, ActivityIndicator } from "react-native";
import { useState } from "react";
import { COLORS, ICON } from "../../globles";
import Icon from "react-native-vector-icons/Ionicons";
import RecipeList from "../../components/RecipeList";
import RecipeDetailModel from "../../components/recipeDetailModel";
import "../../global";

const root = global.root;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const CategoryResult = ({cId, cName, modelHandler, user}) =>{
    
    const [recipeList, setRecipeList] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [recipeId, setRecipeId] = useState();
    const [avatar, setAvatar] = useState();
    const [detailShow, setDetialShow] = useState(false);
    const categoryId = cId
    const categoryName = cName

    useEffect(()=>{
        fetch(root+'/mafoody/category/?categoryId='+categoryId+'&userId='+user.id)
        .then((response) => response.json())
        .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recipe_list} = responseJson.data
                setRecipeList(recipe_list);
                setIsLoaded(true)
                //console.log(recipe_list);
            }
        })
        .catch((error) => {
            //console.error(error);
            console.log(error)
        })
    }, [])

    const onPressDetailHandler = (id, avatar)=> {
        setAvatar(avatar);
        setRecipeId(id);
        setDetialShow(true);
    }

    return(
        <Modal style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.icon} name={ICON.goBack} size={30} onPress={()=>modelHandler()}/>
                    <Text style={styles.headerTxt}>{categoryName}</Text>
                </View>
                {isLoaded===true?
                    <RecipeList recipe_data={recipeList} detail_hander={onPressDetailHandler} user={user}/>
                :<ActivityIndicator size='large'/>}
                {detailShow===true&&<RecipeDetailModel recipeId={recipeId} userId={user.id} goBackHandler={()=>setDetialShow(false)} authorPic={avatar}/>}
            </SafeAreaView>
        </Modal>
    );
}

export default CategoryResult;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        backgroundColor:COLORS.header,
    },
    header:{
        flexDirection:'row',
        padding:10,
        backgroundColor:COLORS.header,
        width:SCREEN_WIDTH,
        height: SCREEN_HEIGHT/10,
        justifyContent:'center',
        alignItems:'center',

    },
    icon:{
        left:10,
        position:'absolute',
        marginHorizontal:10,
        color:COLORS.white,
    },
    headerTxt:{
        alignSelf:'center',
        fontSize:24,
        color:COLORS.white,
        fontWeight:'bold',

    }

})