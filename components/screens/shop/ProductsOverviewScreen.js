import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/products';
import Colors from '../../../constans/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    // nie robić async przy useEffect, tzn. useEffect(async () => {...}) !!
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await dispatch(productsActions.fetchProducts());
            setIsLoading(false);
        };

        loadProducts();
    }, [dispatch]);

    const onViewDetails = (id, title) => { 
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
     }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        ); 
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Add some.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => onViewDetails(itemData.item.id, itemData.item.title)}
            >
                <Button color={Colors.primary} title="View Details"
                    onPress={() => {
                        onViewDetails(itemData.item.id, itemData.item.title)
                        }}
                />
                <Button title="Add to Cart" 
                    onPress={() => { 
                        dispatch(cartActions.addToCart(itemData.item));
                    }} 
                />                
            </ProductItem>}
        />    
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />,
        headerLeft: () => <MenuHeaderButton onPress={() => { navData.navigation.toggleDrawer() }} />
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;