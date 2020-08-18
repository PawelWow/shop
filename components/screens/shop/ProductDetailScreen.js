import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartHeaderButton from '../../UI/CartHeaderButton';

import * as Fonts from '../../../Fonts';
import  Colors from '../../../constans/Colors';
import Price from '../../Price';

import * as cartActions from '../../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id == productId));
    const dispatch = useDispatch();

    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }} />
            </View>
            <Price style={styles.price} value={ selectedProduct.price } />
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle');
    return{
        headerTitle: productTitle,
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />     
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD
    },
    description: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetailScreen;