import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import MenuHeaderButton from '../../UI/MenuHeaderButton';
import AddProductHeaderButton from '../../UI/AddProductHeaderButton';

import * as productsActions from '../../../store/actions/products';
import Colors from '../../../constans/Colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    
    const dispatch = useDispatch();

    const onEditProduct = (id) => {
        props.navigation.navigate('EditProduct', {productId: id});
    }

    return(
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { onEditProduct(itemData.item.id) }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => { onEditProduct(itemData.item.id) }} />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id));
                        }}
                    />                    
                </ProductItem>
            }
        />
    );
};

UserProductsScreen.navigationOptions =  navData => {
    return {
        headerTitle: 'User products',
        headerRight: () => <AddProductHeaderButton onPress={() => navData.navigation.navigate('EditProduct')} />,
        headerLeft: () => <MenuHeaderButton onPress={() => { navData.navigation.toggleDrawer() }} />        
    }
};

export default UserProductsScreen;