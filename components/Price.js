import React from 'react';
import { Text } from 'react-native';

const Price = props => {
    return <Text style={{...props.style}}>${props.value.toFixed(2)}</Text>;
};

export default Price;