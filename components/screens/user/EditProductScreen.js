import React, {useState, useEffect, useCallback } from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as Fonts from '../../../Fonts';

import * as productsActions from '../../../store/actions/products';
import SaveHeaderButton from '../../UI/SaveHeaderButton';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        if(editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: onSubmit });
    }, [onSubmit]);

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formCotnrol}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formCotnrol}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
                </View>
                {
                    editedProduct ? null : (
                        <View style={styles.formCotnrol}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                        </View>
                    )
                }

                <View style={styles.formCotnrol}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
                </View>
            </View>

        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit product' : 'Add product',
        headerRight: () => <SaveHeaderButton onPress={submitFunction} />,
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formCotnrol: {
        width: '100%'
    },
    label: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;