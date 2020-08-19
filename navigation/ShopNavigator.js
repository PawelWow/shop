import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'

import * as Fonts from '../Fonts';

import ProductsOVerviewScreen from '../components/screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen';
import CartScreen from '../components/screens/shop/CartScreen';
import OrdersScreen from '../components/screens/shop/OrdersScreen';

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
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
    Orders: OrdersScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(ShopNavigator);