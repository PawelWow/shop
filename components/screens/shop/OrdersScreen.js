import React from 'react';
import { FlatList, Text  } from 'react-native';
import { useSelector } from 'react-redux';

import MenuHeaderButton from '../../UI/MenuHeaderButton';
import OrderItem from '../../shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

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

export default OrdersScreen;