import React, { useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Alert
}  from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../../store/actions/products';
import SaveHeaderButton from '../../UI/SaveHeaderButton';
import Input from '../../UI/Input';

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
    const prodId = props.navigation.getParam('productId');
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

    const onSubmit = useCallback(() => {
        if(!formState.formsIsValid) {
            Alert.alert('Wrong input!', 'Check the errors in the form.', [
                { text: 'OK' }
            ]);
            return;
        }
        if(editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: onSubmit });
    }, [onSubmit]);

    const onInputChange = useCallback((inputIdentifier, inputValue, inputValidity) => {
        console.log('---input ' + inputIdentifier);
        console.log(inputValidity);
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    });

    return(
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    label="Title"
                    errorText="Enter a valid title."
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnType="next"
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
                    returnType="next"
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
                            returnType="next"
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
    }
});

export default EditProductScreen;