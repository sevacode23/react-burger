import { updateObject } from './utility'
import * as actionTypes from '../actions/actionTypes'

const initialOrders = {
    loading: true,
    list: []
}

const reducer = (orders = initialOrders, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_INIT:
            return updateObject(orders, { loading: true })

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(orders, { list: action.orders, loading: false })

        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(orders, { loading: false, failReason: action.reason })

        default:
            return orders;
    }
}

export default reducer