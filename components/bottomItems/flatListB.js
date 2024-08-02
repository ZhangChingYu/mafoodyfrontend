import React from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import MyCookedItem from "./myCookedItem";

const FlatListB = ({user, commentList, isLoaded}) => {

    return(
        <View style={styles.container}>
            {isLoaded===true?
            <FlatList
            data={commentList}
            numColumns={1}
            renderItem={(object) => {
                return(
                    <MyCookedItem comment={object.item}/>
                );
            }}/>:
            <ActivityIndicator size='large'/>}
        </View>
    );
}

export default FlatListB;

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
    }
});