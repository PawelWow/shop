import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {
const productId = props.navigation.getParam('productId');
const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id == productId));



    return(
        <View>
            <Text>{selectedProduct.title}</Text>
            <Text>{props.navigation.getParam('productTitle')}</Text>
        </View>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle');
    return{
        headerTitle: productTitle
    };
};

const styles = StyleSheet.create({

});

export default ProductDetailScreen;