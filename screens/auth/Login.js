import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { COLORS } from "../../globles";
import { useState } from "react";
import "../../global"

const root = global.root;

const Login = ({route,navigation})=>{
    const [authentication, setAuthetication] = useState({Acount:'', Password:''});
    const [user, setUser] = useState({});


    const InputHandler = (input,type) => {
        //console.log(input, type);
        if (type==='userId'){
            if(input.indexOf('@')!=-1){
                //setUser({...user, userEmail:input, userPsd:user.userPsd});
            }else{
                //setUser({...user, userPhone:input, userPsd:user.userPsd});
            }
            setAuthetication({...authentication, Acount:input});
        }
        else if (type==='userPsd'){
            //setUser({userId:user.userId, userPsd:input});
            setAuthetication({...authentication, Password:input});
        }
    }
    const LoginHandler = () => {
        if(authentication.Acount==='' && authentication.Password===''){
            alert('User Id (phone or email) and Password must be filled');
        }
        else if(authentication.Acount==='' && authentication.Password!==''){
            alert('User Id (phone or email) is missing!');
        }else if(authentication.Acount!=='' && authentication.Password===''){
            alert('Password is missing!');
        }else{
            setUser({...user, userPsd:authentication.Password});
            fetch(root+'/mafoody/login/?userName='+authentication.Acount+'&password='+authentication.Password)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    const {status}=responseJson
                    if (status===200){
                        const {user}=responseJson.data
                        navigation.navigate('HomeStack', {user:user});
                    }
                    else{
                        const {msg} = responseJson.data
                        alert(msg);
                    }
                })
                .catch((error) => {
                    //console.error(error);
                    console.log(error);
                }
            );
        }
    }
    const Navigation_Handler = (PageName) => {
        console.log('Go To Page: '+PageName)
        navigation.navigate(PageName)
    }

    return(
        <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../../assets/images/Logo.png')} style={styles.Logo}/>
        </View>
        <View style={styles.wrapper}>
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="phone number or email address" onChangeText={input=>InputHandler(input, 'userId')}/>
                <TextInput style={styles.input} placeholder="password" onChangeText={input=>InputHandler(input, 'userPsd')} secureTextEntry={true}/>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={LoginHandler}>
                <Text style={styles.loginTxt}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgetBtn} onPress={() => Navigation_Handler('ForgetPassword')}>
                <Text style={styles.forgetTxt}>Forget Password</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.signWrapper}>
            <Text>Don't have an account? press here to </Text>
            <TouchableOpacity onPress={()=>Navigation_Handler('SignUp')}>
                <Text style={styles.signBtnTxt}>Sign up</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Logo: {
        height: 100,
        width: 100,
        marginBottom: 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    headerTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.header,
    },
    wrapper: {
        paddingBottom: 100,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    inputWrapper: {
        marginBottom: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    input: {
        backgroundColor: '#fff',
        marginVertical: 10,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: COLORS.theme_blue,
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 60,
        paddingLeft: 8,
    },
    loginBtn: {
        backgroundColor: COLORS.theme_red,
        padding: 10,
        borderRadius: 20,
    },
    loginTxt: {
        fontSize: 30,
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgetBtn: {
        padding: 10,
        margin: 20
    },
    forgetTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.theme_red,
    },
    signWrapper:{
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    signBtnTxt: {
        color: COLORS.theme_yellow,
        fontWeight: 'bold',
        fontSize: 20,
    }
  });