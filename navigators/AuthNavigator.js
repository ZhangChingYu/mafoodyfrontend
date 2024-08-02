import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/auth/Login';
import ForgetPassword from "../screens/auth/ForgetPassword";
import SignUp from "../screens/auth/SignUp";
import HomeStack from "./HomeStack";

import { COLORS } from '../globles';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerTintColor:COLORS.white, headerStyle: {backgroundColor: COLORS.primary}}}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
            <Stack.Screen name='HomeStack' component={HomeStack} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default AuthNavigator;