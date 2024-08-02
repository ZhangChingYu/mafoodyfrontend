import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView, Keyboard, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { COLORS } from "../../globles";
import IngredientModal from "../../components/publishItems/IngredientDialog";
import StepDialog from "../../components/publishItems/stepDialog";
import ImgUpLoader from "../../components/publishItems/imgUploader";
import IngredientList from "../../components/publishItems/ingredientList";
import StepList from "../../components/publishItems/stepList";
import CategoryDialog from "../../components/publishItems/categoryDialog";
import "../../global";

const root = global.root;

const Publish = ( props )=>{
    
    const {userName} = props
    const [ingredientModalState, setIngredientModalState] = useState(false);
    const [stepModalState, setStepModalState] = useState(false);
    const [categoryModalState, setCategoryModalState] = useState(false)

    const closeHandler = (type) =>{
        if(type==='ingredient'){
            setIngredientModalState(false);
        }
        else if(type==='step'){
            setStepModalState(false);
        }
        else if(type=='category'){
            setCategoryModalState(false);
        }
    }

    const ingredientAddHandler = (NewName, NewAmount) =>{
        setComponentArray(oldArray=>[...oldArray, {name: NewName, amount:NewAmount}]);
        setComponent(oldArray=>[...oldArray, NewName+'['+NewAmount+']'])
        setIngredientModalState(false);
    }
    const stepAddHandler = (input)=>{
        //console.log(input);
        if(input==='' || input.length===0){
            alert('Please input some text or press CANCEL to leave!');
        }
        else{
            setStepArray(oldArray =>[...oldArray, input]);
            closeHandler('step');
        }
    }

    const showHandler = (type) =>{
        if(type==='ingredient'){
            setIngredientModalState(true);
        }
        else if(type==='step'){
            setStepModalState(true);
        }
        else if(type=='category'){
            setCategoryModalState(true);
        }
    }
    const [name, setName] = useState('')
    const [intro, setIntro] = useState('')
    const [componentArray, setComponentArray] = useState([]);
    const [component, setComponent] = useState([]);
    const [stepArray, setStepArray] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [category, setCategory] = useState([]);

    const checkInput = () =>{
        if(category.length<1 || name=='' || componentArray==[] || stepArray==[] || pictures.length<1){
            return false
        }
        else{
            return true
        }
    }

    const pictureUploadHandler = () =>{
        let imageData = new FormData();
        imageData.append('name',name)
        picture = pictures[0]
        let image = { uri : picture.uri.replace('file://',''), type: 'multipart/form-data', name : picture.fileName};
        imageData.append('image', image)
        console.log('lll')
        // 先進行圖片上傳，成功保存後返回圖片uri
        fetch(root+'/mafoody/pictureupload', {
            method:'POST',
            headers:{},
            body:imageData
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            const {status}=responseJson
            if (status===200){
                const {url}=responseJson.data
                console.log(url)
                
                const data = {
                    author:userName,
                    category:category,
                    name:name,
                    intro:intro,
                    img:url,
                    component:component,
                    step:stepArray
                }
                console.log(data)
                fetch(root+'/mafoody/publish/',{
                    method:'POST',
                    headers:{},
                    body:JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    const {status}=responseJson
                    if (status===200){
                        const {msg} = responseJson.data
                        alert(msg);
                        props.endPublishRecipe()
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
                console.log(responseJson)
            }
        })
        .catch((error) => {
            //console.error(error);
            console.log(error)
        });
        
    }

    const donePressHandler = () =>{
        if(checkInput()==true){
            pictureUploadHandler()
        }
        else{
            alert('Please make sure the information of your recipe is complete!')
        }
    }
    const elements=[
        {
            key: 'Header',
            element:
                <View style={styles.headerZone}>
                    <Text style={styles.title}>Share Your Recipe Ideas</Text>
                </View>
        },
        {
            key: 'Body',
            element:
            <View style={styles.body}>
                <View style={styles.pictureWrapper}>
                    <Text style={styles.subTitle}>Up Load Pictures of Your Dish</Text>
                    <View style={styles.pictureUploadHolder}>
                        <ImgUpLoader passImgUriHandler={setPictures}/>
                    </View>
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.subTitle}>Name Your Recipe</Text>
                    <TextInput style={styles.nameInput} placeholder="(Input your recipe name)" onChangeText={(input)=>{setName(input)}}/>
                </View>
                <View style={styles.IntroWrapper}>
                    <Text style={styles.subTitle}>Introduce Your Recipe</Text>
                    <View style={styles.introInputWrapper}>
                        <TextInput style={styles.introInput} placeholder="(no more than 200 words)" multiline={true} 
                        maxLength={200} numberOfLines={5} keyboardType='default' returnKeyType='default' blurOnSubmit={false}
                        onSubmitEditing={()=>{Keyboard.dismiss()}} onChangeText={(input)=>{setIntro(input)}}/>
                    </View>
                </View>  
                <View style={styles.ingredientWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.subTitle}>Ingredients</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={()=>showHandler('ingredient')}>
                            <Text style={styles.addTxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <IngredientList array={componentArray}/>
                </View>
                <View style={styles.stepWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.subTitle}>Steps</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={()=>showHandler('step')}>
                            <Text style={styles.addTxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <StepList array={stepArray}/>
                </View>
                <View style={styles.categoryWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.subTitle}>Category</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={()=>showHandler('category')}>
                            <Text style={styles.addTxt}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    data={category}
                    horizontal={true}
                    renderItem={(object)=>{
                        return(
                            <View style={styles.categoryElement}>
                                <Text style={styles.categoryTxt}>{object.item}</Text>
                            </View>
                        );
                    }}/>
                </View>
            </View>
            
        }
    ]
    return(
        <Modal visible={props.isVisible} animationType="slide">
            
            <SafeAreaView style={styles.container}>
            
                
                <FlatList data={elements} renderItem={(object)=>{
                    return(
                        <View>{object.item.element}</View>
                    );
                }}/>
                
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.closeBtn} onPress={props.endPublishRecipe}>
                        <Text style={styles.cancelTxt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={donePressHandler}>
                        <Text style={styles.doneTxt}>DONE</Text>
                    </TouchableOpacity>
                </View>
                {ingredientModalState && <IngredientModal closePress={closeHandler} enterPress={ingredientAddHandler}/>}
                {stepModalState && <StepDialog closePress={closeHandler} enterPress={stepAddHandler}/>}
                {categoryModalState && <CategoryDialog closePress={closeHandler} enterPress={setCategory} categoryList={category}/>}
       
            </SafeAreaView>
            
        </Modal>
    )
}

export default Publish;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'stretch',
        backgroundColor:COLORS.blue,
    },
    // background
    background:{
        backgroundColor:COLORS.blue,
        padding:3,
    },
    // header
    headerZone:{
        marginVertical:10,
    },
    title:{
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center',
    },
    // body
    body:{
        marginTop:20,
        backgroundColor:COLORS.white,
        paddingHorizontal:10,
        paddingVertical:10,
        paddingTop:26,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:3,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    subTitle:{
        fontSize:24,
        fontWeight:'600',
    },
    // picture
    pictureUploadHolder:{
        alignItems:'center'
    },
    
    addTxt:{
        textAlign:'center',
        fontSize:26,
        fontWeight:'600',
    },
    // ingredients
    ingredientWrapper:{
        //backgroundColor:COLORS.bgColor,
    },
    header:{
        justifyContent:'space-between',
        flexDirection:'row',
    },
    addBtn:{
        marginLeft:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.light_purple,
        height:35,
        width:35,
        borderRadius:25,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    // step
    
    // name
    nameWrapper:{
        backgroundColor:COLORS.white,
    },
    nameInput:{
        padding:10,
        borderWidth:2,
        borderRadius:5,
        marginVertical:5,
        marginBottom:20,
    },
    // intro
    IntroWrapper:{
        backgroundColor:COLORS.white,
        marginBottom:20,
    },
    introInputWrapper:{
        borderWidth:2,
        borderRadius:5,
        height:100,
    },
    introInput:{
        padding:10,
        borderRadius:5,
        marginVertical:5,
        marginBottom:20,
        textAlignVertical: 'top',
    },
    // footer
    footer:{
        padding:8,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'stretch',
        backgroundColor:COLORS.white,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:3,
        shadowOffset:{
            width:1,
            height:1
        },
        elevation:1
    },
    closeBtn:{
        paddingVertical:10,
        backgroundColor: COLORS.primary,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    saveBtn:{
        backgroundColor: COLORS.header,
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    cancelTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.header,
    },
    doneTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.white,
    },
    // category
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
});