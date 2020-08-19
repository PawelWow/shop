import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    
    return(
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => { }}
                    onAddToCart={() => { }}

                />
            }
        />
    );
};

UserProductsScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'User products',
        headerLeft: () => <MenuHeaderButton onPress={() => { navData.navigation.toggleDrawer() }} />
    }
};

export default UserProductsScreen;