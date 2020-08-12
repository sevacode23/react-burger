import axios from '../../axios/axios-orders'
import { mapIngredientsToArray } from './utility'
import * as actionTypes from './actionTypes'

const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = reason => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        reason: reason
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit())

        axios.get('/orders.json')
            .then(res => {
                const orders = []
                for (let orderKey in res.data) {
                    orders.push({
                        id: orderKey,
                        ingredients: mapIngredientsToArray(res.data[orderKey].ingredients),
                        price: +res.data[orderKey].price,
                        datetime: res.data[orderKey].datetime
                    })
                }
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err.message))
            })
    }
}