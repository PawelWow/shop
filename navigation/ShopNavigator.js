import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOVerviewScreen from '../components/screens/shop/ProductsOverviewScreen';

import Colors from '../constans/Colors';
import Platform from '../constans/Platform';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOVerviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.isAndroid ? Colors.primary : ''
        },
        headerTintColor: Platform.isAndroid ? 'white' : Colors.primary
    }
});

export default createAppContainer(ProductsNavigator);