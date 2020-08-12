import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import * as actions from '../../store/actions/actionTypes'
import { initializeOrder, cancelOrder, confirmOrder } from '../../store/actions/index'
import { orderStates } from '../../store/reducers/sessionOrder'
import classes from './BurgerBuilder.module.css'

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        sessionOrder: state.sessionOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingType) => dispatch({ type: actions.ADD_INGREDIENT, ingType: ingType }),
        //
        onLastIngredientRemove: () => dispatch({ type: actions.REMOVE_LAST_INGREDIENT }),
        //
        onIngredientDragEnd: (dest, source, dragId) => {
            dispatch({
                type: actions.MOVE_INGREDIENTS,
                dragData: { newPos: dest, prevPos: source, dragId: dragId }
            })
        },
        //
        onPurchaseInitialize: (ings, price) => dispatch(initializeOrder({
            ingredients: ings,
            totalPrice: price
        })),
        //
        onPurchaseCancel: () => dispatch(cancelOrder()),
        //
        onPurchaseConfrm: () => dispatch(confirmOrder())
    }
}

class BurgerBuilder extends Component {
    componentDidMount() {
        if (this.props.sessionOrder.state === orderStates.confirmed) {
            this.props.onPurchaseCancel();
        }
    }

    onIngredientDragEnd = result => {
        const { destination, source, draggableId } = result;
        console.log(destination)
        console.log(source)
        console.log(draggableId)


    }

    purchaseConfirmHandler = () => {
        this.props.onPurchaseConfrm();
        this.props.history.push('/contact')
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.props.sessionOrder.state === orderStates.initialized ? true : false}
                    backdropClicked={this.props.onPurchaseCancel}>
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.price}
                        cancelPurchase={this.props.onPurchaseCancel}
                        continuePurchase={this.purchaseConfirmHandler} />
                </Modal>
                <section className={classes.BurgerSection}>
                    <DragDropContext onDragEnd={(result) => {
                        if (!result.destination) return;
                        this.props.onIngredientDragEnd(result.destination.index, result.source.index, result.draggableId)
                    }
                    }>
                        <Burger
                            ingredients={this.props.ingredients} />
                    </DragDropContext>
                </section>
                <section>
                    <BuildControls
                        price={this.props.price}
                        enableRemoveButton={this.props.ingredients[0]}
                        onIngredientAdd={this.props.onIngredientAdd}
                        onIngredientRemove={this.props.onLastIngredientRemove}
                        ordered={() => this.props.onPurchaseInitialize(this.props.ingredients, this.props.price)} />
                </section>
            </React.Fragment >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)