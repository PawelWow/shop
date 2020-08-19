import React from 'react';
import { FlatList, Text  } from 'react-native';
import { useSelector } from 'react-redux';

import MenuHeaderButton from '../../UI/MenuHeaderButton';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
            data={orders}
            keyExtractor={ item => item.id}
            renderItem={itemData => <Text>{itemData.itemTotalAmount}</Text>}/>
    );
};

OrdersScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'Your orders',
        headerLeft: () => <MenuHeaderButton onPress={() => { navData.navigation.toggleDrawer() }} />
    }
};

export default OrdersScreen;