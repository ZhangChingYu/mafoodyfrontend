import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Keyboard, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { COLORS, ICON } from "../../globles";
import "../../global";

const root = global.root;

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HIGHT} = Dimensions.get('screen');

const CategoryDialog = (props) => {

    const [input, setInput] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true)
    const [addedList, setAddedList] = useState(props.categoryList);

    const searchPress = () =>{
        Keyboard.dismiss();
        if(input != ''){
            setIsLoaded(false)
            fetch(root+'/mafoody/publish/category/?key='+input)
            .then((response) => response.json())
            .then((responseJson) => {
                const {status} = responseJson
                if(status == 200){
                    const {category_list} = responseJson.data
                    setCategoryList(category_list)
                    setIsLoaded(true)
                    //console.log(category_list)
                }
                else{
                    console.log(responseJson)
                }
            })
            .catch((error) => {
                //console.error(error)
                console.log(error)
            })
        }
    }
    const categoryPress = (category) =>{
        let flag=0
        if(addedList.length<5){
            for(i=0;i<addedList.length; i++){
                if(addedList[i]==category){
                    flag=1
                }
            }
            if(flag!=1){
                setAddedList([...addedList, category])
            }
        }
    }

    const deletePress = (category) =>{
        newList = []
        for(i=0;i<addedList.length; i++){
            if(addedList[i]!=category){
                newList.push(addedList[i])
            }
        }
        setAddedList(newList);
    }
    const donePress = ()=>{
        props.enterPress(addedList)
        props.closePress('category')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dialog}>
                <View style={styles.header}>
                    <Text style={styles.headerTXT}>Please Type In To Search:</Text>
                </View>
                <View style={styles.searchBox}>
                    <TextInput style={styles.input} placeholder='ex.麵食' onChangeText={(input)=>setInput(input)}/>
                    <Icon name={ICON.search} size={30} style={styles.icon} onPress={searchPress}/>
                </View>
                <View style={styles.categoryWrapper}>
                    {isLoaded===true?
                        <FlatList 
                        data={categoryList}
                        renderItem={(object)=>{
                            return(
                                <TouchableOpacity style={styles.elementWrapper} onPress={()=>categoryPress(object.item.name)}>
                                    <Text style={styles.categoryTxt}>{object.item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        />
                        :<ActivityIndicator size='large' style={{marginTop:50}}/>
                    }
                </View>
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.closePress('category')}>
                        <Text style={styles.btnTxt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={donePress}>
                        <Text style={styles.btnTxt}>DONE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.resultList}>
                <FlatList
                data={addedList}
                horizontal={true}
                renderItem={(object)=>{
                    return(
                        <View style={styles.resultWrapper}>
                            <Text style={styles.resultTxt}>{object.item}</Text>
                            <TouchableOpacity style={styles.deleteBtn} onPress={()=>deletePress(object.item)}>
                                <Text style={styles.deleteTxt}>-</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                />
            </View>
        </SafeAreaView>
    );
}

export default CategoryDialog;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:'#00000077',
        height:SCREEN_HIGHT,
        width:SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center',
    },
    dialog:{
        backgroundColor:COLORS.light_purple,
        width:SCREEN_WIDTH*0.8,
        borderRadius:25,
        padding:10,
        shadowColor:COLORS.black,
        shadowOpacity:0.6,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:6,
    },
    headerTXT:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.header,
    },
    searchBox:{
        flexDirection:'row',
        margin:4,
        alignItems:'center',
    },
    input:{
        backgroundColor:COLORS.white,
        flex:1,
        borderWidth:3,
        borderColor:COLORS.header,
        borderRadius:5,
        padding:4,
        fontSize:24,
        color:COLORS.header,
    },
    icon:{
        color:COLORS.header,
        marginHorizontal:4,
    },
    categoryWrapper:{
        backgroundColor:COLORS.light_purple,
        borderRadius:5,
        marginTop:10,
        height:160,
    },
    elementWrapper:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        padding:4,
        borderRadius:5,
        margin:4,
        borderColor:COLORS.header,
        backgroundColor:COLORS.bgColor,
    },
    categoryTxt:{
        fontSize:18,
        color:COLORS.header,
        fontWeight:'500'
    },
    btnHolder:{
        flexDirection:'row',
        margin:20,
        justifyContent:'space-between',
        alignItems:'stretch',
    },
    btn:{
        backgroundColor:COLORS.transparent_theme_purple,
        borderRadius:10,
        padding:8,
        width:90,
    },
    btnTxt:{
        fontSize:18,
        textAlign:'center',
    },
    resultList:{
        position:'absolute',
        top:SCREEN_HIGHT*0.1,
    },
    resultWrapper:{
        backgroundColor:COLORS.bgColor,
        borderWidth:2,
        padding:8,
        borderRadius:6,
        borderColor:COLORS.header,
        marginHorizontal:4,
    },
    resultTxt:{
        color:COLORS.header,
        fontSize:18,
        fontWeight:'500',
    },
    deleteBtn:{
        position:'absolute',
        right:-6,
        top:-6,
        backgroundColor:COLORS.primary,
        borderRadius:25,
        width:20,
        height:20,
        justifyContent:'center',
        alignItems:'center',
    },
    deleteTxt:{
        position:'absolute',
        fontSize:30,
        color:COLORS.header,
    }
})