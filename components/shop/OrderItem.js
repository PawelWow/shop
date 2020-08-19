import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Price from '../Price';

import Colors from '../../constans/Colors';
import * as Fonts from '../../Fonts';

const OrderItem = props => {
    return (
        <View style={styles.orderItem}> 
            <View style={styles.summary}>
                <Price style={styles.totalAmount} value={props.amount} />
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title="Show Details" />
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
    }
});

export default OrderItem;