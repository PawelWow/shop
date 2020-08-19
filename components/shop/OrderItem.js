import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Price from '../Price';
import CartItem from '../shop/CartItem';

import Colors from '../../constans/Colors';
import * as Fonts from '../../Fonts';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}> 
            <View style={styles.summary}>
                <Price style={styles.totalAmount} value={props.amount} />
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails  ? 'Hide details' : 'Show details' } onPress={() => {
                setShowDetails(prevState => !prevState)
            }} />
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem =>
                    <CartItem
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />
                    )}
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',   
        margin: 20,
        padding: 10,
        alignItems: 'center'  
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;