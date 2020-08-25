import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
}  from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../../store/actions/products';
import SaveHeaderButton from '../../UI/SaveHeaderButton';
import Input from '../../UI/Input';

import Platform from '../../../constans/Platform';
import Colors from '../../../constans/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for( const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formsIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }

    return state;
};

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.route.params ? props.route.params.productId : null;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formsIsValid:  editedProduct ? true : false
    });

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured!', error, [{ text: 'OK'}]);
        }
    }, [error]);

    const onSubmit = useCallback(async () => {
        if(!formState.formsIsValid) {
            Alert.alert('Wrong input!', 'Check the errors in the form.', [
                { text: 'OK' }
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            if(editedProduct) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl
                    )
                );
            } else {
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl,
                        +formState.inputValues.price
                    )
                );
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);

    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <SaveHeaderButton onPress={onSubmit} />
        });
    }, [onSubmit]);

    const onInputChange = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.isAndroid ? 'height' : 'padding'} keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Enter a valid title."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={onInputChange}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                <Input
                        id="imageUrl"
                        label="Image URL"
                        errorText="Enter a valid image URL."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={onInputChange}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {
                        editedProduct ? null : (
                            <Input
                                id="price"
                                label="Price"
                                errorText="Enter a valid price."
                                keyboardType="decimal-pad"
                                returnKeyType="next"
                                onInputChange={onInputChange}
                                required
                                min={0.1}
                            />
                        )
                    }

                    <Input
                        id="description"
                        label="Description"
                        errorText="Enter a valid description."
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={onInputChange}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>

    );
};

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};

    return {
        headerTitle: routeParams.productId ? 'Edit product' : 'Add product',
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;