import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';
import Platform from '../../constans/Platform';


const MenuHeaderButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Cart'
            iconName={Platform.isAndroid ? 'md-menu' : 'ios-menu'}
            onPress={props.onPress}
        />
    </HeaderButtons>
    );
};

export default MenuHeaderButton;