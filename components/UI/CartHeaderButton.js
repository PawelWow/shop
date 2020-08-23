import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';
import IconsNames from '../../constans/IconsNames';


const CartHeaderButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Cart'
            iconName={IconsNames.cart}
            onPress={props.onPress}
        />
    </HeaderButtons>
    );
};

export default CartHeaderButton;