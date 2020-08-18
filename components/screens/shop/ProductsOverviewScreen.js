import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import CartHeaderButton from '../../UI/CartHeaderButton';

import * as cartActions from '../../../store/actions/cart';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => { 
                    props.navigation.navigate({
                        routeName: 'ProductDetail',
                        params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        }
                    })
                 }}
                onAddToCart={() => { 
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />}
        />    
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />
    }

};

export default ProductsOverviewScreen;