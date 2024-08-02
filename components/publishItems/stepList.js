import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";

const StepList =(props)=>{
    const stepArray = props.array;
    return(
    <View style={styles.stepList}>
        {stepArray.length>0&&<FlatList data={stepArray} renderItem={(object)=>{
            return(
                <TouchableOpacity style={styles.stepHolder} onPress={()=>{}}>
                    <View style={styles.indexWrapper}>
                        <Text style={styles.stepIndex}>{object.index+1}</Text>
                    </View>
                    <Text style={styles.stepContent}>{object.item}</Text>
                    <TouchableOpacity style={styles.iconWrapper} activeOpacity={1} onPress={()=>{}}>
                        <Icon style={styles.icon} name={ICON.trash} size={25} onPress={()=>{}}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        }}/>}
    </View>      
    );
}

export default StepList;

const styles = StyleSheet.create({
    stepList:{
        //marginBottom:20,
        paddingTop:20,
    },
    stepHolder:{
        backgroundColor:COLORS.white,
        marginLeft:20,
        marginRight:10,
        marginBottom:4,
        paddingVertical:20,
        paddingLeft:20,
        flexDirection:'row',
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
    indexWrapper:{
        position:'absolute',
        top:-20,
        left:-20,
        backgroundColor:COLORS.theme_purple,
        height:40,
        width:40,
        borderRadius:25,
        justifyContent:'center',
        shadowColor:COLORS.black,
        shadowOpacity:0.7,
        shadowRadius:1,
        shadowOffset:{
            width:0,
            height:0
        },
        elevation:2
    },
    stepIndex:{
        color:COLORS.white,
        textAlign:'center',
        fontSize:20,
        fontWeight:'600',
    },
    stepContent:{
        flex:1,
    },
    iconWrapper:{
        padding:20,
    },
    icon:{
        color:COLORS.header,
    },
})