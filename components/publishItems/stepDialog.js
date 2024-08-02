import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { COLORS } from "../../globles";

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HIGHT} = Dimensions.get('screen');

const StepDialog = (props) =>{
    const [content, setContent] = useState('');

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      );

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.dialog}>
                <DismissKeyboard>
                    <Text style={styles.title}>Add New Step</Text>
                </DismissKeyboard>
                <View style={styles.inputWrapper}>
                    <TextInput 
                    style={styles.input}
                    placeholder="(no more than 200 words)" 
                    multiline={true} 
                    maxLength={200}
                    numberOfLines={5}
                    keyboardType='default'
                    returnKeyType='default'
                    blurOnSubmit={false}
                    onChangeText={(input)=>setContent(input)}
                    />
                </View>
                <View style={styles.btnHolder}>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.closePress('step')}>
                        <Text style={styles.btnTxt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>props.enterPress(content)}>
                        <Text style={styles.btnTxt}>ENTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default StepDialog;

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
        textAlign:'center',
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
    inputWrapper:{
        borderWidth:2,
        borderRadius:5,
        borderColor:COLORS.transparent_theme_purple,
        backgroundColor:COLORS.white,
        marginHorizontal:10,
        width:300,
        height:100,
    },
    input:{
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:5,
        marginVertical:5,
        marginBottom:20,
        textAlignVertical: 'top',
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