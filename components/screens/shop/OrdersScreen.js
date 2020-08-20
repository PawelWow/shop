import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuHeaderButton from '../../UI/MenuHeaderButton';
import OrderItem from '../../shop/OrderItem';

import * as ordersActions from '../../../store/actions/orders';
import Colors from '../../../constans/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        }).catch( err => { /* error handling */  });
    }, [dispatch])

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={ item => item.id}
            renderItem={itemData => 
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
        }/>
    );
};

OrdersScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'Your orders',
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

export default OrdersScreen;