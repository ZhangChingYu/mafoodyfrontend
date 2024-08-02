import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS } from "../../globles"

const ForgetPassword = ()=>{
    const [phoneInput, setPhoneInput] = useState('');
    const [codeInput, setCodeInput] = useState('');

    const InputHandler = (input, type) => {
        //console.log(input, type);
        if(type==='phone'){
            setPhoneInput(input);
        }
        else if(type==='code'){
            setCodeInput(input);
        }
    }

    const sendHandler = () => {
        if(phoneInput===''){
            alert('Phone Number is Empty!');
        }else{
            alert('Code is: 7810');
            alert('The confirmation code has been send to phone '+phoneInput+ 'please check your new message!');
        }
    }
    const confirmHandler = () =>{
        if(codeInput==='7810'){
            alert('Your password is: 0000');
        }
        else{
            alert('Please Input the correct confirmation Code!')
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.explain}>Enter your phone number to recieve the confirmation code.</Text>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="phone number or email address" onChangeText={input=>InputHandler(input, 'phone')}/>
                <TextInput style={styles.input} placeholder="confirmation code" onChangeText={input=>InputHandler(input, 'code')}/>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.sendBtn} onPress={sendHandler}>
                    <Text style={styles.send}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendBtn} onPress={confirmHandler}>
                    <Text style={styles.send}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.header,
        alignItems: 'center',
        justifyContent:'center',
    },
    explain:{
        top:-50,
        color:COLORS.white,
        fontSize:30,
        fontWeight:'600',
        textAlign:'center',
        margin:20,
    },
    inputWrapper: {
        marginBottom: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        
    },
    input: {
        width:300,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: COLORS.primary,
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 60,
        paddingLeft: 8,
    },
    btnWrapper:{
        flexDirection:'row',
        alignItems:'stretch',
        paddingHorizontal:20,
    },
    sendBtn:{
        flex:1,
        backgroundColor:COLORS.theme_yellow,
        paddingVertical:4,
        borderRadius:5,
        marginHorizontal:20,
    },
    send:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        color:COLORS.header,
    }
  });