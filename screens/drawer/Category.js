import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, SectionList, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { COLORS } from "../../globles";
import CategoryResult from "./CategoryResult";
import "../../global"

const root = global.root;
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Category = ({route, navigation})=>{
    const {user} = route.params;
    const [category, setCategory] =useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModel, setShowModel] = useState(false);

    useEffect(()=>{
        fetch(root+'/mafoody/category/')
        .then((response) => response.json())
        .then((responseJson) => {
            const {status} = responseJson
            if(status == 200){
                const {category_list} = responseJson.data
                setCategory(category_list);
                setIsLoaded(true)
                //console.log(category_list);
            }
        })
        .catch((error) => {
            //console.error(error);
            console.log(error)
        })
    }, [])

    const modelShowHandler = ()=> {
        setShowModel(false);
    }
    const onCategoryPress = (categoryId, categoryName) => {
        setCategoryId(categoryId);
        setCategoryName(categoryName);
        setShowModel(true);
    }

    return(
        <SafeAreaView style={styles.container}>
            {isLoaded===true?
            <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets//images/Title.png')} style={styles.title}></Image>
                <Text style={styles.intro}>Your Customized Recipe Recommendation!</Text>
                <View style={styles.underLine}></View>
            </View>
            <View style={styles.body}>
                <FlatList 
                data={category}
                renderItem={(object)=>{
                    return(
                        <View style={styles.section}>
                            <View>
                                <Text style={styles.titleTxt}>{object.item.title}</Text>
                            </View>
                            <View style={styles.itemWrapper}>
                                <View style={styles.items}>
                                    {object.item.data.map((element,index)=>{
                                        return(
                                            <View key={'CW'+Math.random(20000)} style={styles.categoryWrapper}>
                                                <TouchableOpacity style={[styles.itemBtn, styles.btnLeft]} key={'IB'+Math.random(20000)} onPress={()=>onCategoryPress(element.categoryId, element.name)}>
                                                    {index%2===0?<Text style={styles.item} key={'I'+Math.random(20000)}>{element.name}</Text>:<></>}
                                                </TouchableOpacity>
                                                {element.data.length != 0&&
                                                    <View key={'No'+Math.random(20000)}>
                                                        {element.data.map((element, i) => {
                                                            return(
                                                                <View key={'No'+Math.random(20000)}>
                                                                    {index%2===0?
                                                                    <TouchableOpacity style={styles.subItemBtn} key={'SIB'+Math.random(20000)} onPress={()=>onCategoryPress(element.categoryId, element.name)}>
                                                                        <Text style={styles.subItemTxt} key={'SIT'+Math.random(20000)}>{element.name}</Text>
                                                                    </TouchableOpacity>:<></>} 
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                }
                                            </View>
                                        );
                                    })}
                                </View>
                                <View style={styles.items}>
                                    {object.item.data.map((element,index)=>{
                                        return(
                                            <View key={'cW'+Math.random(20000)} style={styles.categoryWrapper}>
                                                <TouchableOpacity style={[styles.itemBtn, styles.btnRight]} key={'iB'+Math.random(20000)} onPress={()=>onCategoryPress(element.categoryId, element.name)}>
                                                    {index%2===1?<Text style={styles.item} key={'i'+Math.random(20000)}>{element.name}</Text>:<></>}
                                                </TouchableOpacity>
                                                {element.data.length != 0&&
                                                    <View key={'nO'+Math.random(20000)}>
                                                        {element.data.map((element, i) => {
                                                            return(
                                                                <View key={'NN'+Math.random(20000)}>
                                                                    {index%2===1?
                                                                    <TouchableOpacity style={styles.subItemBtn} key={'sib'+Math.random(20000)} onPress={()=>onCategoryPress(element.categoryId, element.name)}>
                                                                        <Text style={styles.subItemTxt} key={'sit'+Math.random(20000)}>{element.name}</Text>
                                                                    </TouchableOpacity>:<></>} 
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                }
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    );
                }}/>
            </View>
            </View>: <ActivityIndicator size='large'/>}
            {showModel===true&&<CategoryResult cId={categoryId} cName={categoryName} modelHandler={modelShowHandler} user={user}/>}
        </SafeAreaView>
        
    )
}

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:COLORS.black,
    },
    header:{
        padding:10,
        alignItems:'center'
    },
    intro:{
        fontSize: 17,
        fontWeight: '600',
        marginTop:5,
        color:COLORS.white,
    },
    underLine:{
        padding:2,
        backgroundColor:COLORS.theme_yellow,
        width:SCREEN_WIDTH-10,
        marginVertical:4,
        borderRadius:25,
    },
    title:{
        width: SCREEN_WIDTH-30,
        height:90,
    },
    body:{
        // occupy what ever is left.
        flex:1,
        backgroundColor:COLORS.light_blue_purple,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        padding:10,
    },
    section:{
        margin:2,
    },
    titleTxt:{
        fontSize:22,
        fontWeight:'bold',
        margin:4,
        color:COLORS.black,
    },
    itemWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-start',
        backgroundColor:COLORS.white,
        flex:1,
    },
    items:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'stretch',
        marginBottom:4,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:1,
        shadowOffset:{
            height:1,
            width:1,
        },
        elevation:1,
    },
    itemBtn:{
        borderRadius:5,
        backgroundColor:COLORS.light_purple,
        marginHorizontal:2,
    },
    btnLeft:{
        marginTop:3,
    },
    btnRight:{
        marginBottom:3,
    },
    item:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'500',
        borderRadius:5,
        padding:4,
    },
    categoryWrapper:{
       
    },
    subItemBtn:{
        justifyContent:'center',
        alignContent:'center',
        marginTop:6,
        
    },
    subItemTxt:{
        alignSelf:'center',
    }
});