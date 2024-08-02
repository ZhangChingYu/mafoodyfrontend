import React from "react";
import { StyleSheet, View, TouchableOpacity,  Image, Text, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ICON } from "../../globles";
import RatingIcon from "../ratingIcon";

 
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const MyCookedItem = ({comment}) => {
    //console.log(comment)
    
    return(
        <TouchableOpacity style={styles.itemWrapper} disabled={true}>
            <View style={styles.info}>
                <Text style={styles.recipeName}>{comment.recipeName}</Text>
                <RatingIcon rating={comment.rating}/>
                <Text numberOfLines={3} style={styles.comment}>{comment.comment}</Text>
            </View>
            <View style={styles.pictureWrapper}>
                <Image source={{uri:comment.img}} style={styles.img}/>
                <Icon style={styles.viewMore} name={ICON.three_dot} size={25} onPress={()=>{}}/>
            </View>
        </TouchableOpacity>
    );
}

export default MyCookedItem;

const styles = StyleSheet.create({
    itemWrapper:{
        flex:1,
        flexDirection:'row',
        backgroundColor:COLORS.white,
        alignItems:'stretch',
        justifyContent:'flex-start',
        marginVertical:2,
        padding:2,
    },
    info:{
        width:SCREEN_WIDTH/1.7,
    },
    pictureWrapper:{
        alignItems:'center',
        borderRadius:23,
        flexDirection:'row'
    },
    img:{
        width:SCREEN_WIDTH/4,
        height:80,
        borderRadius:5,
    },
    viewMore:{
        marginHorizontal:10,
    }
});