import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileEdit from "../screens/home/ProfileEdit";
import Publish from "../screens/home/Publish";
import Settings from "../screens/home/Settings";
import UserCenter from "../screens/home/UserCenter";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator(); 

function HomeStack({route, navigation}){
    console.log("HomeStack");
    console.log(route);
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeDrawer" component={DrawerNavigator} initialParams={route.params}/>
            <Stack.Screen name="UserCenter" component={UserCenter} />  
            <Stack.Screen name="Settings" component={Settings} />  
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />  
            <Stack.Screen name="Publish" component={Publish} />  
        </Stack.Navigator>
    );
}

export default HomeStack;