import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import * as Fonts from '../Fonts';

import ProductsOVerviewScreen from '../components/screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen';
import CartScreen from '../components/screens/shop/CartScreen';
import OrdersScreen from '../components/screens/shop/OrdersScreen';
import UserProductScreen from '../components/screens/user/UserProductsScreen';

import Colors from '../constans/Colors';
import Platform from '../constans/Platform';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.isAndroid ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD
    },
    headerBackTitleStyle: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR
    },
    headerTintColor: Platform.isAndroid ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOVerviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    }, 
    {
        navigationOptions:{
            drawerIcon: drawerConfig => <Ionicons 
                name={Platform.isAndroid ? 'md-cart' : 'ios-cart' }
                size={23}
                color={drawerConfig.tintColor}
                />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
    Orders: OrdersScreen
    },
    {
        navigationOptions:{
            drawerIcon: drawerConfig => <Ionicons 
                name={Platform.isAndroid ? 'md-list' : 'ios-list' }
                size={23}
                color={drawerConfig.tintColor}
                />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductScreen
    },
    {
        navigationOptions:{
            drawerIcon: drawerConfig => <Ionicons 
                name={Platform.isAndroid ? 'md-create' : 'ios-createt' }
                size={23}
                color={drawerConfig.tintColor}
                />
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(ShopNavigator);