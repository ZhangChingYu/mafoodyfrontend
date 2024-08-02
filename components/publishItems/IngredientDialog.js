import React, { useState } from "react";
import { StyleSheet, View, Modal, Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { COLORS } from "../../globles";

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HIGHT} = Dimensions.get('screen');

const IngredientModal = (props) =>{
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.dialog}>
                <Text style={styles.title}>Add New Ingredient</Text>
                <Text style={styles.Txt}>Ingredient:</Text>
                <TextInput style={styles.input} placeholder="ex. Sugar" onChangeText={(input)=>setIngredient(input)}/>
                <Text style={styles.Txt}>Amount: </Text>
                <TextInput style={styles.input} placeholder="ex. 1 cup" onChangeText={(input)=>setAmount(input)}/>
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.closePress('ingredient')}>
                        <Text style={styles.btnTxt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.enterPress(ingredient, amount)}>
                        <Text style={styles.btnTxt}>ENTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default IngredientModal;

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
    title:{
        fontSize:30,
        margin:10,
        fontWeight:'700',
        color:COLORS.transparent_theme_purple,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:1,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    Txt:{
        fontSize:20,
        fontWeight:'500',
        color:COLORS.header,
        margin:10,
    },
    input:{
        borderWidth:2,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:5,
        marginHorizontal:10,
        backgroundColor:COLORS.white,
        borderColor:COLORS.transparent_theme_purple,
    },
    btnHolder:{
        flexDirection:'row',
        margin:20,
        justifyContent:'space-around',
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
    }

})