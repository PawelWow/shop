import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';

import * as carActions from '../../../store/actions/cart';

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
                    dispatch(carActions.addToCart(itemData.item));
                }}
            />}
        />    
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All products'
};

export default ProductsOverviewScreen;