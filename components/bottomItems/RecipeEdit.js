import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from "react-native";
import { COLORS, ICON } from "../../globles";
import Icon from "react-native-vector-icons/Ionicons";
import CategoryDialog from "../publishItems/categoryDialog";
import "../../global"

const root = global.root;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const RecipeEdit = ({recipeId, closeHandler}) =>{

    const [isLoaded, setIsLoaded] = useState(false)
    const [recipe, setRecipe] = useState();
    const [nameEdit, setNameEdit] = useState(false)
    const [name, setName] = useState('')
    const [introEdit, setIntroEdit] = useState(false)
    const [intro, setIntro] = useState('')
    const [componentEdit, setComponentEdit] = useState(false)
    const [component, setComponent] = useState([])
    const [stepEdit, setStepEdit] = useState(false)
    const [step, setStep] = useState([])
    const [categoryEdit, setCategoryEdit] = useState(false)
    const [category, setCategory] = useState([])

    const doneHandler = (featureName) =>{
        if(featureName=='name'){
            setNameEdit(false);
        }else if(featureName=='intro'){
            setIntroEdit(false)
        }else if(featureName=='component'){
            setComponentEdit(false)
        }else if(featureName=='step'){
            setStepEdit(false)
        }
    }

    useEffect(()=>{
        fetch(root+'/mafoody/recipedetail/?recipeId='+recipeId)
        .then((response) => response.json())
          .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {recipe} = responseJson.data
                setRecipe(recipe)
                setName(recipe.name)
                setIntro(recipe.intro)
                setComponent(recipe.component)
                setStep(recipe.step)
                setCategory(recipe.category)
                setIsLoaded(true);
            }
            else{
                console.log(responseJson.data) 
            }
          })
          .catch((error) => {
            //console.error(error);
            console.log(error)
            goBackHandler();
          });
    },[])
    return(
        <Modal style={styles.container} animationType='slide'>
            {isLoaded===true?<SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.returnBtn} name={ICON.goBack} size={30} onPress={()=>closeHandler(false)}/>
                    <Text style={styles.recipeName}>{recipe.name}</Text>
                    <TouchableOpacity style={styles.headPicHolder}>
                        <Image source={require('../../assets/images/profiles/male_1.jpeg')} style={styles.authorPic}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scroller}>
                    <View style={styles.pictureHodler}>
                        <Image source={{uri:root+recipe.img}} style={styles.foodPic}/>
                    </View>
                    <View style={styles.titleBar}>
                        <TextInput style={nameEdit===true?[styles.titleTxt, {color:'grey'}]:styles.titleTxt} value={name} editable={nameEdit} onChangeText={(input)=>setName(input)}/>
                        {nameEdit&&<Icon name={ICON.done} size={30} style={styles.checkBtn} onPress={()=>doneHandler('name')}/>}
                        <Icon name={ICON.edit} style={styles.editBtn} size={30} onPress={()=>setNameEdit(true)}/>
                    </View>
                    <View style={stepEdit===true?[styles.content,{marginBottom:100}]:styles.content}>
                    <View style={styles.introHolder}>
                        <View style={styles.titleHolder}>
                            <Text style={styles.introTitle}>Introduction</Text>
                            {introEdit&&<Icon name={ICON.done} size={30} style={styles.checkBtn} onPress={()=>doneHandler('intro')}/>}
                            <Icon name={ICON.edit} style={styles.editBtn} size={30} onPress={()=>setIntroEdit(true)}/>
                        </View>
                        <TextInput style={introEdit===true?[styles.introContent, {color:'grey'}]:styles.introContent} value={intro===null||''?'/**這個作者很懶，沒有編輯介紹喔～**/':intro} 
                        multiline={true} editable={introEdit} numberOfLines={5} onChangeText={(input)=>setIntro(input)} blurOnSubmit={false} />
                    </View>
                    <View style={styles.introHolder}>
                        <View style={styles.titleHolder}>
                            <Text style={styles.introTitle}>Components</Text>
                            {componentEdit&&<Icon name={ICON.done} size={30} style={styles.checkBtn} onPress={()=>doneHandler('component')}/>}
                            <Icon name={ICON.edit} style={styles.editBtn} size={30} onPress={()=>setComponentEdit(true)}/>
                        </View>
                        {(component!=undefined||[])&&component.map((object)=>{
                            return(
                                <View key={Math.random(10000)} style={styles.componentWraper}> 
                                    <Text key={Math.random(10000)} style={styles.component}>{object}</Text>
                                    {componentEdit&&<Icon key={Math.random(10000)} name={ICON.trash} style={styles.deleteBtn} size={30}/>}
                                </View>
                            )
                        })}
                        {componentEdit&&<TouchableOpacity style={styles.addBtn}>
                            <Text style={styles.addTxt}>+</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.introHolder}>
                        <View style={styles.titleHolder}>
                            <Text style={styles.introTitle}>Steps</Text>
                            {stepEdit&&<Icon name={ICON.done} size={30} style={styles.checkBtn} onPress={()=>doneHandler('step')}/>}
                            <Icon name={ICON.edit} style={styles.editBtn} size={30} onPress={()=>setStepEdit(true)}/>
                        </View>
                        {(step!==undefined||[])&&step.map((object, i)=>{
                            return(
                                <View key={Math.random(10000)} style={styles.stepWrapper}>
                                    <Text key={Math.random(10000)} style={styles.index}>{(i+1)+'.'}</Text>
                                    <TextInput key={Math.random(10000)} style={styles.step} editable={stepEdit}>{object}</TextInput>
                                    {stepEdit&&<Icon key={Math.random(10000)} name={ICON.trash} style={styles.deleteBtn} size={30}/>}
                                </View>
                            )
                        })}
                        {stepEdit&&<TouchableOpacity style={styles.addBtn}>
                            <Text style={styles.addTxt}>+</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.introHolder}>
                        <View style={styles.titleHolder}>
                            <Text style={styles.introTitle}>Category</Text>
                            <Icon name={ICON.edit} style={styles.editBtn} size={30} onPress={()=>setCategoryEdit(true)}/>
                        </View>
                        <FlatList data={category} horizontal={true} renderItem={(object)=>{
                            return(
                                <View style={styles.categoryElement}>
                                    <Text style={styles.categoryTxt}>{object.item}</Text>
                                </View>
                            )
                        }}/>
                    </View>
                    </View>
                </ScrollView>
                {categoryEdit && <CategoryDialog closePress={()=>setCategoryEdit(false)} enterPress={setCategory} categoryList={category}/>}
            </SafeAreaView>:<ActivityIndicator size='large' style={{marginTop:SCREEN_HEIGHT/2-20}}/>}
        </Modal>
    );
}

export default RecipeEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor:COLORS.light_blue_purple,
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
        marginRight:10,
    },
    authorPic: {
        height: 40,
        width: 40,
        borderRadius:25,
        borderWidth:2,
        borderColor:COLORS.black
    },
    recipeName:{
        flex:1,
        fontSize: 26,
        fontWeight:'500',
        alignSelf:'center',
        textAlign:'center',
    },
    // scroller
    scroller:{
        flex:1,
        backgroundColor:'#ffffff00',
    },
    // content
    content:{
        //backgroundColor:COLORS.light_purple,
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
    editBtn:{
        marginRight:10,
        marginVertical:8,
    },
    checkBtn:{
        marginRight:10,
        marginVertical:8,
    },
    titleHolder:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
    },
    // scroller.introHolder
    introHolder:{
        marginHorizontal:10,
        marginBottom: 20,
        alignContent:'center',
        justifyContent:'center',
       
    },
    introTitle:{
        flex:1,
        fontSize:40,
        fontWeight:'bold',
        color:COLORS.light_yellow,
        alignSelf:'center',
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation: 1,
    },
    introContent:{
        marginTop:5,
        fontSize:16,
        padding:10,
        lineHeight:20,
        backgroundColor:COLORS.white,
    },
    // scroller.component
    componentWraper:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:COLORS.light_purple,
        padding:2,
        borderWidth:2,
        borderColor:'#ffffff66',
        borderRadius:20,
        marginVertical:1,
    },
    component:{
        marginVertical:5,
        fontSize: 20,
        textAlign:'center',
    },
    deleteBtn:{
        position:'absolute',
        right:6,
        top:2,
    },
    addBtn:{
        backgroundColor:COLORS.primary,
        alignSelf:'center',
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:1,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation: 1,
    },
    addTxt:{
        fontSize:30,
        textAlign:'center',
        alignSelf:'center',
    },
    // scroller.step
    stepWrapper:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:1,
        marginHorizontal:10,
        backgroundColor:COLORS.white,
        borderColor:COLORS.light_purple,
        borderWidth:2,
        borderRadius:6,
        padding:10,
    },
    index:{
        textAlign:'center',
        fontSize:25,
        color:COLORS.header,
        fontWeight:'bold',
    },
    step:{
        textAlign:'left',
        marginLeft:4,
        flex:1,
    },
    // scroller.category
    categoryWrapper:{
        backgroundColor:COLORS.white
    },
    categoryElement:{
        backgroundColor:COLORS.theme_yellow,
        borderRadius:6,
        margin:4,
        padding:6,
        marginTop:16,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:3,
        shadowOffset:{
            width:1,
            height:1
        },
        elevation:1
    },
    categoryTxt:{
        fontSize:18,
        fontWeight:'500',
        color:COLORS.header,
    }
})
