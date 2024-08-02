import React from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import { useState } from "react";

const SignUp = ({route, navigation})=>{
    const [genderState, setGenderState] = useState(0);
    const [inputState, setInput] = useState({
        phone:'',
        email:'',
        password:'',
        c_password:'',
        userName:'',
        age:'',
        gender:0,
    })
    const inputHandler = (input, type) =>{
        if(type ==='phone'){
            setInput({...inputState, phone:input});
        }else if(type==='email'){
            setInput({...inputState, email:input});
        }else if(type==='password'){
            setInput({...inputState, password:input});
        }else if(type==='c_password'){
            setInput({...inputState, c_password:input});
        }else if(type==='userName'){
            setInput({...inputState, userName:input})
        }else if(type==='age'){
            setInput({...inputState, age:input})
        }
    }

    const genderHandler = (state) =>{
        setGenderState(state);
        setInput({...inputState, gender:state});
    }

    const signUpHandler = () =>{
        if(inputState.phone===''||inputState.email==''||inputState.password==''||inputState.c_password==''||inputState.userName==''||inputState.gender==null){
            alert('Please make sure you have filled in every (*) section!');
        }else{
            //navigation.goBack();
            console.log(inputState)
            if(inputState.password.length < 6){
                alert('Your password is too short! It should be around 6 to 20 letters.')
            }
            else if(inputState.password.length > 20){
                alert('The password is too long! Please set your password between 6 to 20 letters.')
            }
            else if(inputState.password!=inputState.c_password){
                alert('The your confirming password does not match with the password!')
            }
            alert('Ok');
        }
    }
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.basic}>
                    <Text style={styles.title}> Welcome to MAFOODY!</Text>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Phone Number*: </Text>
                        <TextInput style={styles.input} placeholder="ex. 123 1234 1234" onChangeText={input=>inputHandler(input, 'phone')}/>
                    </View>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Email Address*: </Text>
                        <TextInput style={styles.input} placeholder="ex. xxx@qq.com" onChangeText={input=>inputHandler(input, 'email')}/>
                    </View>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Password*: </Text>
                        <TextInput style={styles.input} placeholder="(must include number and letter)" textContentType="password" onChangeText={input=>inputHandler(input, 'password')}/>
                    </View>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Confirm Password*: </Text>
                        <TextInput style={styles.input} placeholder="(input the password again)" textContentType="password" onChangeText={input=>inputHandler(input, 'c_password')}/>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.personal}>
                    <Text style={styles.title}>Personal Information</Text>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>User Name*: </Text>
                        <TextInput style={styles.input} placeholder="(will be use in this app)" onChangeText={input=>inputHandler(input, 'userName')}/>
                    </View>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Age: </Text>
                        <TextInput style={styles.input} placeholder="(help us discover more recipes)" onChangeText={input=>inputHandler(input, 'age')}/>
                    </View>
                    <View style={styles.Item}>
                        <Text style={styles.Txt}>Gender*: </Text>
                    </View>
                    
                    <View style={styles.selectWrapper}>
                        <TouchableOpacity style={[styles.select, {backgroundColor:genderState===1?COLORS.light_blue_purple:COLORS.light_purple}]} onPress={()=>genderHandler(1)}>
                            <Text style={styles.selectTxt}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.select, {backgroundColor:genderState===2?COLORS.light_blue_purple:COLORS.light_purple}]} onPress={()=>genderHandler(2)}>
                            <Text style={styles.selectTxt}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.selectWrapper}>
                        <TouchableOpacity style={[styles.select, {backgroundColor:genderState===3?COLORS.light_blue_purple:COLORS.light_purple}]} onPress={()=>genderHandler(3)}>
                            <Text style={styles.selectTxt}>Other</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.select, {backgroundColor:genderState===4?COLORS.light_blue_purple:COLORS.light_purple}]} onPress={()=>genderHandler(4)}>
                            <Text style={styles.selectTxt}>Secret</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.confirm}>
                    <View style={styles.explainWrapper}>
                        <Icon style={styles.lightBulb} name={ICON.light_bulb} size={20} accessible={false}/>
                        <Text style={styles.explainTxt}>Any input box marked with (*) must be filled.</Text>
                    </View>
                    <TouchableOpacity style={styles.signBtn} onPress={signUpHandler}>
                        <Text style={styles.signTxt}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    basic:{
        padding:10, 
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:COLORS.header,
    },
    Item:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:16,
        marginTop:30,
        
    },
    Txt:{
        fontSize:16,
    },
    input:{
        flex:1,
        backgroundColor:COLORS.white,
        padding:4,
        paddingVertical:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#aaaaaa77'
    },
    line:{
        borderWidth:1,
        marginHorizontal:5,
        borderColor:COLORS.header,
        marginTop:20,
    },
    personal:{
        padding:10,
    },
    selectWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'stretch',
        marginTop:10,
    },
    select:{
        flex:1,
        alignItems:'stretch',
        padding:4,
        marginHorizontal:16,
        backgroundColor:COLORS.light_purple,
        borderRadius:5,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:2,
        shadowOffset:{
            width:1, 
            height:1,
        },
        elevation:1,
    },
    selectTxt:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'500',
    },
    confirm:{
        padding:10,
        marginHorizontal:16,
    },
    explainWrapper:{
        flexDirection:'row',
        alignItems:'center',
    },
    lightBulb:{
        color:COLORS.theme_yellow,
        marginRight:4,
    },
    explainTxt:{
        color:'#333',
    },
    signBtn:{
        marginVertical:20,
        backgroundColor:COLORS.theme_purple,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        marginHorizontal:40,
        shadowColor:COLORS.black,
        shadowOpacity:0.4,
        shadowRadius:3,
        shadowOffset:{
            width:0,
            height:1,
        },
        elevation:1,
    },
    signTxt:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.white,
    }
});
