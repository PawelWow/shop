import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOVerviewScreen from '../components/screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen';

import Colors from '../constans/Colors';
import Platform from '../constans/Platform';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOVerviewScreen,
    ProductDetail: ProductDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.isAndroid ? Colors.primary : ''
        },
        headerTintColor: Platform.isAndroid ? 'white' : Colors.primary
    }
});

export default createAppContainer(ProductsNavigator);