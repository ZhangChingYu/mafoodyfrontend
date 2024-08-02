import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from '../../globles';
import RecipeList from '../../components/RecipeList';
import RecipeDetailModel from '../../components/recipeDetailModel';
import "../../global";

const root = global.root;

const Search = ({route, navigation})=>{
  const {user} = route.params
  const [initState, setInitState] = useState(true)
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [resultList, setResultList] = useState([]);
  const [recipeId, setRecipeId] = useState();
  const [avatar, setAvatar] = useState();
  const [detailShow, setDetialShow] = useState(false);


  const InputHandler = (input) => {
    setInput(input);
  }
  const OnPressHandler = () => {
    Keyboard.dismiss()
    if(input != ""){
      setInitState(false);
      setIsLoaded(false);
      fetch(root+'/mafoody/search/?keyword='+input+'&userId'+user.id)
      .then((response) => response.json())
      .then((responseJson) => {
        const {status}=responseJson
        if (status===200){
          const {recipe_list}=responseJson.data
          setResultList(recipe_list);
          setIsLoaded(true);
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
    }
    else{
      
    }
  }
  const onPressDetailHandler = (id, avatar)=> {
    setAvatar(avatar);
    setRecipeId(id);
    setDetialShow(true);
  } 

  if (initState == true){
    return(
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput style={styles.searchBox} onChangeText={input=>InputHandler(input)} placeholder='type in to search. (ex. 芒果)' blurOnSubmit={true}/>
            <Icon name={ICON.search} style={styles.icon} size={30} onPress={OnPressHandler}/>
          </View>
          <View style={styles.body}>
            <Text style={styles.initTxt}>請在上方搜索匡中輸入搜索內容吧＾＿＾</Text>
          </View>
      </View>
    </SafeAreaView>
    )
  }
    
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput style={styles.searchBox} onChangeText={input=>InputHandler(input)} placeholder='type in to search. (ex. 芒果)' blurOnSubmit={true}/>
          <Icon name={ICON.search} style={styles.icon} size={30} onPress={OnPressHandler}/>
        </View>
        <View style={styles.body}>
          {isLoaded===true?
          <RecipeList recipe_data={resultList} detail_hander={onPressDetailHandler} user={user}/>
          :<ActivityIndicator size='large'/>}
          </View>
      </View>
      {detailShow===true&&<RecipeDetailModel recipeId={recipeId} userId={user.id} goBackHandler={()=>setDetialShow(false)} authorPic={avatar}/>}
    </SafeAreaView>
  );
}

export default Search;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLORS.header,
      alignItems:'stretch',
    },
    header:{
      flexDirection:'row',
      backgroundColor:COLORS.header,
      padding:4,
      paddingVertical:8,
      alignItems:'center',
    },
    searchBox:{
      flex:1,
      borderWidth:3,
      borderRadius:25,
      marginHorizontal:10,
      padding:8,
      paddingLeft:12,
      fontSize:18,
      borderColor:COLORS.theme_yellow,
      backgroundColor:COLORS.white,
    },
    icon:{
      marginRight:8,
      color:COLORS.theme_yellow,
    },
    body:{
      flex:1,
      //marginTop:40,
    },
    initTxt:{
      margin: 30,
      color:COLORS.white,
      fontSize: 24,
      alignSelf:'center',
      textAlign:'center'
    }
    
});