import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useState } from "react";
import AvatarUpLoader from "../../components/profileItems/avatarUpload";
import BGUpLoader from "../../components/profileItems/bgUploader";
import { COLORS, ICON } from "../../globles";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileEdit = ({route, navigation})=>{
    const {user} = route.params;
    const [pushState, setPushState] = useState(false);
    const [psdHide, setPsdHide] = useState(true);
    const [changePsd, setChangePsd] = useState(false);
    const [userData, setUserData] = useState({user});
    const avatar="file:///var/mobile/Containers/Data/Application/868E2304-06A2-421D-B491-4C5B43FDEFEC/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdemo1-eec7ecca-d288-4981-b7bc-6d4250765863/ImagePicker/5793395B-6A18-4093-9B48-A404A95F14A1.jpg";
    const bg='file:///var/mobile/Containers/Data/Application/868E2304-06A2-421D-B491-4C5B43FDEFEC/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdemo1-eec7ecca-d288-4981-b7bc-6d4250765863/ImagePicker/760380E1-BEE4-4654-BD3A-939F961E1309.jpg';

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Profile Edit</Text>
                <Icon style={styles.goBack} name={ICON.goBack} onPress={()=>navigation.goBack()} size={25}/>
            </View>
            
            <ScrollView>
            
                <View style={styles.avatarHolder}>
                    <Text style={styles.subTitle}>Profile Picture</Text>
                    <AvatarUpLoader oldAvatar={avatar}/>
                </View>
                <View style={styles.line}></View>
                <View style={styles.bgHolder}>
                    <Text style={styles.subTitle}>Background Image</Text>
                    <BGUpLoader oldBG={bg}/>
                </View>
                <View style={styles.line}></View>
                <View style={styles.infoHolder}>
                    <Text style={styles.subTitle}>Security Information</Text>
                    <View style={[styles.txtBoxHolder]}>
                        <Text style={styles.txt}>User Name:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.user_name}/>
                    </View>
                    <View style={[styles.txtBoxHolder]}>
                        <View style={styles.eyeHolder}>
                            <Text style={styles.txt}>{changePsd===false?"Password:":"New Password:"}</Text>
                            <Icon style={{color:psdHide===true?COLORS.primary:COLORS.theme_red}} name={psdHide===true?ICON.view_close:ICON.view} size={25} onPress={()=>setPsdHide(!psdHide)}/>
                        </View>
                        <TextInput style={styles.input} placeholder="null" textContentType="password" secureTextEntry={psdHide}
                        value={userData.userPsd} onFocus={()=>{setChangePsd(true);}}/>
                    </View>
                    { changePsd&& 
                    <View style={[styles.txtBoxHolder, ]}>
                        <Text style={styles.txt}>Confirm Password:</Text>
                        <TextInput style={styles.input} placeholder="null" textContentType="password" secureTextEntry={psdHide}
                        onFocus={()=>{ setChangePsd(true);}}/>
                        <View style={styles.psdBtnHolder}>
                            <TouchableOpacity style={[styles.psdCancel,styles.psdBtn]} onPress={()=>setChangePsd(false)}>
                                <Text style={styles.psdTxt}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.psdEnter, styles.psdBtn]} onPress={()=>setChangePsd(false)}>
                                <Text style={styles.psdTxt}>ENTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
                <View style={styles.line}></View>
                <View style={styles.infoHolder}>
                    <Text style={styles.subTitle}>Basic Information</Text>
                    <View style={[styles.txtBoxHolder]}>
                        <Text style={styles.txt}>Real Name:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.real_name}
                        onFocus={()=>{}} onBlur={()=>{}}/>
                    </View>
                    <View style={[styles.txtBoxHolder,]}>
                        <Text style={styles.txt}>Phone Number:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.phone}
                        onFocus={()=>{}} onBlur={()=>{}}/>
                    </View>
                    <View style={[styles.txtBoxHolder]}>
                        <Text style={styles.txt}>Email Address:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.email}
                        onFocus={()=>{}} onBlur={()=>{}}/>
                    </View>
                    <View style={[styles.txtBoxHolder,]}>
                        <Text style={styles.txt}>Age:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.age}
                        onFocus={()=>setPushState(true)} onBlur={()=>setPushState(false)}/>
                    </View>
                    <View style={[styles.txtBoxHolder,]}>
                        <Text style={styles.txt}>Address:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.address}
                        onFocus={()=>setPushState(true)} onBlur={()=>setPushState(false)}/>
                    </View>
                    <View style={[styles.txtBoxHolder, {marginBottom:pushState===true?220:0}]}>
                        <Text style={styles.txt}>Gender:</Text>
                        <TextInput style={styles.input} placeholder="null" value={userData.gender===0?"male":userData.gender===1?"female":userData.gender===3?"Other":"Secret"}
                        onFocus={()=>setPushState(true)} onBlur={()=>setPushState(false)}/>
                    </View>
                </View>
                
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Done Editing?</Text>
                <Icon style={styles.done} name={ICON.done} onPress={()=>navigation.goBack()} size={25}/>
            </View>
            
        </SafeAreaView>
    )
}

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:COLORS.white,
    },
    header:{
        backgroundColor:COLORS.header,
        justifyContent:'center',
        alignItems:'center',
        padding:16,
        shadowColor:COLORS.black,
        shadowOpacity:0.5,
        shadowRadius:2,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    headerTxt:{
        fontSize:20,
        fontWeight:'500',
        color:COLORS.white,
    },
    goBack:{
        position:'absolute',
        color:COLORS.white,
        left:12,
    },
    subTitle:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.black,
        textAlign:'center',
        marginTop:20,
        marginBottom:10,
    },
    line:{
        backgroundColor:COLORS.header,
        padding:2,
        marginHorizontal:10,
        borderRadius:10,
    },
    txtBoxHolder:{
        flexDirection:'column',
        paddingHorizontal:20,
        marginTop:10,
    },
    txt:{
        fontSize:20,
        fontWeight:'500',
        color:COLORS.header,
    },
    input:{
        borderWidth:2,
        marginTop:5,
        fontSize:16,
        padding:4,
        paddingHorizontal:8,
        borderRadius:10,
        backgroundColor:COLORS.white,
    },
    eyeHolder:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    psdBtnHolder:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingTop:10,
    },
    psdBtn:{
        padding:10,
        borderRadius:25,
        shadowColor:COLORS.black,
        shadowOpacity:0.3,
        shadowRadius:1,
        shadowOffset:{
            width:1,
            height:1,
        },
        elevation:1,
    },
    psdCancel:{
        backgroundColor:COLORS.transparent_theme_blue,
    },
    psdEnter:{
        backgroundColor:COLORS.theme_red,
    },
    psdTxt:{
        fontSize:16,
        color:COLORS.white,
    },
    done:{
        color:COLORS.white,
        position:'absolute',
        right:10,
    },
    infoHolder:{
        marginBottom:20,
    }
});