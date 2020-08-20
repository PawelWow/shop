import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator
 } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Price from '../../Price';
import Card from '../../UI/Card';
import CartItem from '../../shop/CartItem';

import * as cartActions from '../../../store/actions/cart';
import * as ordersActions from '../../../store/actions/orders';

import * as Fonts from '../../../Fonts';
import Colors from '../../../constans/Colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const onSendOrder = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary} >
                <Text style={styles.summaryText}>Total: <Price style={styles.amount} value={cartTotalAmount} /></Text>
                { isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : (
                    <Button
                        color={Colors.accent}
                        title="Order Now"
                        disabled={cartItems.length === 0}
                        onPress={onSendOrder}
                    />
                )}


            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData =>
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable 
                            onRemove={() => { 
                                dispatch(cartActions.removeFromCart(itemData.item.productId))
                            }}
                        />
                    }
                />

            </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});

export default CartScreen;
