import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import MyRecipeItem from "./myRecipeItem";
import MyLikeItem from "./myLikeItem";

const FlatListA = ({user, type, onPress, onEdit, likeList, myRecipeList, isLoaded}) => {
    if(type == 1){
        return (
            <View>
                {isLoaded===true?<FlatList
                data={likeList}
                numColumns={2}
                renderItem={(object) => {
                    return(
                        <View>
                            <MyLikeItem title={object.item.name} author={object.item.author} img={object.item.img} id={object.item.id} recipeDetailHandler={onPress}/>
                        </View>
                    );
                }}/>:<ActivityIndicator size='large'/>}
            </View>
        );
    }
    else if (type == 0){
        return (
            <View>
                {isLoaded===true?<FlatList
                data={myRecipeList}
                numColumns={2}
                renderItem={(object) => {
                    return(
                        <View>
                            <MyRecipeItem user={user} data={object.item} editHandler={onEdit}/>
                        </View>
                    );
                }}/>:<ActivityIndicator size='large'/>}
            </View>
        )
    }
}

export default FlatListA;

const styles = StyleSheet.create({

});