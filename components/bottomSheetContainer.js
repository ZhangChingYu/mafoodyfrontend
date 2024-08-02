import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS } from "../globles";
import FlatListA from './bottomItems/flatListA';
import FlatListB from './bottomItems/flatListB';


const {height: SCREEN_HEIGHT} = Dimensions.get('screen')  
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT-60;
const MIN_TRANSLATE_Y = -SCREEN_HEIGHT/1.4;

const BottomSheet = ({pressHandler, editHandler, user, isLoaded, likeList, myRecipeList, commentList}) => {
    //console.log('data'+recipeData);

    const translateY = useSharedValue(0);

    const context = useSharedValue({y:0}); 

    const [barLocate, setBarLocate] = useState(0)

    const [listState, setListState] = useState();


    const ListSwitchHandler = (index) =>{
        setBarLocate(index);
        if(index===2){
            setListState({columnNum:1});
        }
        else{
            setListState({columnNum:2});
        }
    }

    const scrollTo = useCallback((destination)=>{
        'worklet';
        translateY.value = withTiming(destination);
    },[])

    const myGesture = Gesture.Pan()
    .onStart(()=>{
        context.value = {y:translateY.value};
    })
    .onUpdate((event)=>{
        //console.log(event.translationY); // observe changes of Y axis when finger sliding on object
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);
    })
    .onEnd(()=>{
        if (translateY.value < -SCREEN_HEIGHT/1.15){
            scrollTo(MAX_TRANSLATE_Y);
            //translateY.value = withTiming(MAX_TRANSLATE_Y);
        }
        else{
            scrollTo(-SCREEN_HEIGHT/1.4);
            //translateY.value = withTiming(-SCREEN_HEIGHT/3);
        }
    });

    useEffect(()=>{
        scrollTo(-SCREEN_HEIGHT/1.4);
        //translateY.value = withTiming(-SCREEN_HEIGHT/1.4);
    }, []);

    const rBottomSheetStyle = useAnimatedStyle(()=>{
        const borderTopLeftRadius = interpolate(
            translateY.value, 
            [MAX_TRANSLATE_Y+50, MAX_TRANSLATE_Y], 
            [25, 5],
            Extrapolate.CLAMP
            );
        const borderTopRightRadius = interpolate(
            translateY.value, 
            [MAX_TRANSLATE_Y+50, MAX_TRANSLATE_Y], 
            [25, 5],
            Extrapolate.CLAMP
            );
        return {
            borderTopLeftRadius,
            borderTopRightRadius,
            transform: [{translateY:translateY.value}],
        }
    });

    return (
        <GestureDetector gesture={myGesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.listHolder}>
                    <View style={styles.barHolder}>
                        <TouchableOpacity style={[styles.tabBar, {backgroundColor:barLocate===0 ? COLORS.theme_red : COLORS.theme_yellow}]} activeOpacity={1} onPress={()=>ListSwitchHandler(0)}>
                            <Text style={[styles.tabBarTxt, {color:barLocate===0 ? COLORS.white : COLORS.black}]}>Recipe</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabBar, {backgroundColor:barLocate===1 ? COLORS.theme_red : COLORS.theme_yellow}]} activeOpacity={1} onPress={()=>ListSwitchHandler(1)}>
                            <Text style={[styles.tabBarTxt, {color:barLocate===1 ? COLORS.white : COLORS.black}]}>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabBar, {backgroundColor:barLocate===2 ? COLORS.theme_red : COLORS.theme_yellow}]} activeOpacity={1} onPress={()=>ListSwitchHandler(2)}>
                            <Text style={[styles.tabBarTxt, {color:barLocate===2 ? COLORS.white : COLORS.black}]}>Profolio</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.listContainer}>
                        {barLocate===2?<FlatListB user={user} commentList={commentList} isLoaded={isLoaded}/>:<FlatListA user={user} type={barLocate} onPress={pressHandler} onEdit={editHandler} likeList={likeList} myRecipeList={myRecipeList} isLoaded={isLoaded}/>}
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}

export default BottomSheet;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT*0.9,
        width: '100%',
        backgroundColor:'white',
        position: 'absolute',
        top:SCREEN_HEIGHT*1.2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    // List Holder
    listHolder: {
        flex:1,
        backgroundColor: COLORS.transparent_theme_blue,
        
    },barHolder: {
        flexDirection: 'row',
    },
    tabBar:{
        flex: 1,
        backgroundColor: COLORS.theme_yellow,
        paddingVertical: 3,
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderStartColor: '#00000022',
        borderEndColor: '#00000022',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        top: -6,
        shadowColor: COLORS.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        elevation: 4,
    },
    tabBarTxt: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight:'bold',
        color: COLORS.black,
    },
    // line
    lineContainer:{
        
    },
    line: {
        width: 75,
        height: 4, 
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 15
    },
    // list
    listContainer:{
        flex:1,
        marginBottom: 4,
        alignItems:'center',
    },
    
});