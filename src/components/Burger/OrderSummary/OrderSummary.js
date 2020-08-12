import React from 'react'
import BurgerImage from '../BurgerImage/BurgerImage'
import Button from '../../UI/Button/Button'

import classes from './OrderSummary.module.css'

const OrderSummary = props => {

    const IngCounts = {
        meat: 0,
        cheese: 0,
        salad: 0,
        bacon: 0
    }

    props.ingredients.forEach(ing => {
        IngCounts[ing.type]++;
    })

    return (
        <React.Fragment>
            <h2 style={{ textAlign: 'center' }}>Your order</h2>
            <p>A delicious burger with the following ingredients:</p>
            <section style={{ display: 'flex', alignItems: 'center' }}>
                <ul className={classes.IngredientsList}>
                    {Object.keys(IngCounts).map(ingType => {
                        return (
                            IngCounts[ingType] ? <li key={ingType}>
                                <span style={{ textTransform: 'capitalize' }}>{ingType}</span> : {IngCounts[ingType]}
                            </li> : null
                        )
                    })}
                </ul>
                <BurgerImage ingredients={props.ingredients} />
            </section>
            <strong>Total Price: {props.price.toFixed(2)} $</strong>
            <p>Continue to checkout?</p>
            <Button
                type="Danger"
                clicked={props.cancelPurchase}>CANCEL</Button>
            <Button
                type="Success"
                clicked={props.continuePurchase}>CONFIRM</Button>
        </React.Fragment>
    )
}

export default OrderSummary;