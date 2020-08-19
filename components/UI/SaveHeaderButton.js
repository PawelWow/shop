import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';
import Platform from '../../constans/Platform';


const SaveHeaderButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Save'
            iconName={Platform.isAndroid ? 'md-checkmark' : 'ios-checkmark'}
            onPress={props.onPress}
        />
    </HeaderButtons>
    );
};

export default SaveHeaderButton;