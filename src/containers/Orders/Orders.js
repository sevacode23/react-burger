import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios/axios-orders'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

import classes from './Orders.module.css'

const mapStateToProps = state => {
    return {
        orders: state.orders.list,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetchInit: () => dispatch(actions.fetchOrders())
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.onOrdersFetchInit()
    }

    render() {
        return (
            this.props.loading ? <Spinner /> :
                <div className={classes.Orders}>
                    <ul>
                        {this.props.orders.map(order => {
                            return <li key={order.id}>
                                <Order
                                    ingredients={order.ingredients}
                                    price={order.price}
                                    datetime={order.datetime} />
                            </li>
                        })}
                    </ul>
                </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));