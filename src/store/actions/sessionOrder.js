import axios from '../../axios/axios-orders'
import * as actionTypes from './actionTypes'

export const uninitializeOrder = (reason) => {
    return {
        type: actionTypes.UNINITIALIZE_ORDER,
        uninitializeReason: reason
    }
}

export const initializeOrder = orderData => {
    return {
        type: actionTypes.INITIALIZE_ORDER,
        orderData: orderData
    }
}

export const cancelOrder = () => {
    return {
        type: actionTypes.CANCEL_ORDER
    }
}

export const confirmOrder = () => {
    return {
        type: actionTypes.CONFIRM_ORDER
    }
}

const submitOrder = (orderData) => {
    return {
        type: actionTypes.SUBMIT_ORDER,
        orderData: orderData
    }
}

export const submitOrderAsync = (orderData) => {
    return dispatch => {
        dispatch(submitOrder(orderData))

        const ingredientsObj = {}

        orderData.ingredients.forEach(ing => {
            ingredientsObj[ing.pos] = ing.type
        })

        axios.post('/orders.json', {
            ...orderData,
            ingredients: ingredientsObj
        })
            .then(res => {
                dispatch(successOrder())
            })
            .catch(err => {
                dispatch(failOrder(err.message))
            })
    }
}

export const successOrder = () => {
    return {
        type: actionTypes.SUCCESS_ORDER
    }
}

export const failOrder = (reason) => {
    return {
        type: actionTypes.FAIL_ORDER,
        failReason: reason
    }
}