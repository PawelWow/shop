import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as Fonts from '../Fonts';
import * as authActions from '../store/actions/auth';

import ProductsOVerviewScreen from '../components/screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen';
import CartScreen from '../components/screens/shop/CartScreen';
import OrdersScreen from '../components/screens/shop/OrdersScreen';
import UserProductScreen from '../components/screens/user/UserProductsScreen';
import EditProductScreen from '../components/screens/user/EditProductScreen';
import AuthScreen from '../components/screens/user/AuthScreen';
import StartupScreen from '../components/screens/StartupScreen';

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
        UserProducts: UserProductScreen,
        EditProduct: EditProductScreen
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
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View styke={{flex: 1, padding: 20}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerItems {...props}  />
                        <Button title="Logout" color={Colors.primary} onPress={() => {
                            dispatch(authActions.logout());
                            props.navigation.navigate('Auth');
                        }} />
                    </SafeAreaView>
                </View>
            );
        }
    }
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    }, 
    {
        defaultNavigationOptions: defaultNavOptions
    }
);


const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);