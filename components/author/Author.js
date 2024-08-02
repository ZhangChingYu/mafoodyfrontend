import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, Modal, SafeAreaView, Dimensions} from "react-native";
import { useState, useEffect } from "react";
import '../../global'
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import RecipeList from "./RecipeList";

const root = global.root;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Author = (props) =>{

    const [recipeList, setRecipeList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(root+'/mafoody/subscirbe/?id='+props.userId+'&author='+props.name)
      .then((response) => response.json())
      .then((responseJson) => {
        const {status} = responseJson
        if(status == 200){
            const {recipe_list} = responseJson.data
            setRecipeList(recipe_list);
            setIsLoaded(true)
        }
      })
      .catch((error) => {
        //console.error(error);
        console.log(error)
      });

},[])
    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Icon name={ICON.goBack} size={40} style={styles.goBack} onPress={props.closeHandler}/>
                    <Text style={styles.authorName}>{props.name}</Text>
                    <Icon name={ICON.collect} size={40} style={styles.collect} onPress={()=>{}}/> 
                </View>
                <View style={styles.body}>
                    <View style={styles.authorWrapper}>
                        <Image source={{uri:root+props.avatar}} style={styles.avatar}/>
                    </View>
                    {isLoaded===true?<RecipeList recipe_data={recipeList} detail_hander={()=>{}} avatar={props.avatar}/>:
                    <ActivityIndicator size='large' style={styles.loader}/>}
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export default Author;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.bgColor
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:SCREEN_HEIGHT*0.1,
        backgroundColor:COLORS.white,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:2,
        shadowOffset:{
            height:1,
            width:0
        },
        elevation:1
    },
    goBack:{
        position:'absolute',
        left:10,
        color:COLORS.theme_yellow,
    },
    collect:{
        position:'absolute',
        right:10,
        color:COLORS.theme_yellow,
    },
    authorName:{
        fontSize:24,
        fontWeight:'bold',
        color:COLORS.header
    },
    body:{
        backgroundColor:COLORS.light_blue_purple,
        flex:1,
    },
    authorWrapper:{
        //backgroundColor:COLORS.light_blue_purple,
        alignItems:'center',
        paddingTop:10,
        paddingBottom:20,
        shadowColor:COLORS.black,
        shadowOpacity:0.7,
        shadowRadius:3,
        shadowOffset:{
            height:1,
            width:1
        },
        elevation:1
    },
    avatar:{
        height:200,
        width:200,
        borderRadius:50,
        borderWidth:10,
        borderColor:COLORS.white,
    }
})