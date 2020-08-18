import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';
import Platform from '../../constans/Platform';


const CartHeaderButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Cart'
            iconName={Platform.isAndroid ? 'md-cart' : 'ios-cart'}
            onPress={props.onPress}
        />
    </HeaderButtons>
    );
};

export default CartHeaderButton;