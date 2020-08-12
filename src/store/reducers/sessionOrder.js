import { updateObject } from '../reducers/utility'
import * as actionTypes from '../actions/actionTypes'

export const orderStates = {
    uninitialized: 'UNINITIALIZED',
    initialized: 'INITIALIZED',
    confirmed: 'CONFIRMED',
    canceled: 'CANCELED',
    submitted: 'SUBMITTED',
    success: 'SUCCESS',
    fail: 'FAIL'
}

const initialOrder = {
    ingredients: [],
    totalPrice: 4,
    state: orderStates.uninitialized
}

const initializeOrder = (order, orderData) => {
    return updateObject(order, { ...orderData, state: orderStates.initialized })
}

const reducer = (order = initialOrder, action) => {
    switch (action.type) {

        case actionTypes.UNINITIALIZE_ORDER:
            return updateObject(initialOrder)

        case actionTypes.INITIALIZE_ORDER:
            return initializeOrder(order, action.orderData)

        case actionTypes.CANCEL_ORDER:
            return updateObject(order, { state: orderStates.canceled })

        case actionTypes.CONFIRM_ORDER:
            return updateObject(order, { state: orderStates.confirmed })

        case actionTypes.SUBMIT_ORDER:
            return updateObject(order, { state: orderStates.submitted, ...action.orderData })

        case actionTypes.SUCCESS_ORDER:
            return updateObject(order, { state: orderStates.success })

        case actionTypes.FAIL_ORDER:
            return updateObject(order, { state: orderStates.fail, failReason: action.failReason })

        default:
            return order;
    }
}

export default reducer;