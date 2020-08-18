import React from 'react';
import { View, Text, FlatList, Button, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

import Price from '../../Price';

import * as Fonts from '../../../Fonts';
import Colors from '../../../constans/Colors';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    return (
        <View style={styles.screen}>
            <View style={styles.summary} >
                <Text style={styles.summaryText}>Total: <Price style={styles.amount} value={cartTotalAmount} /></Text>
                <Button title="Order Now" />
            </View>
            <View>
                <Text>Cart items</Text>
            </View>
        </View>
    );
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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
