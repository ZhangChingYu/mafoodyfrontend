import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Search from "../screens/drawer/Search";
import Category from "../screens/drawer/Category";
import Notification from "../screens/drawer/Notification";
import Home from "../screens/home/Home";

const Drawer = createDrawerNavigator();

function DrawerNavigator({route, navigation}){
    console.log('Drawer');
    console.log(route); 
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} initialParams={route.params}/>
            <Drawer.Screen name="Search" component={Search} initialParams={route.params}/>
            <Drawer.Screen name="Category" component={Category} initialParams={route.params}/>
            {
                //<Drawer.Screen name="Notification" component={Notification} initialParams={route.params}/>
            }
            
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;