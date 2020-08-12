import React from 'react'

import classes from './Order.module.css'

const getIngredientsAmountObject = ingredients => {
    const IngAmounts = {
        meat: 0,
        cheese: 0,
        salad: 0,
        bacon: 0
    }

    ingredients.forEach(ing => {
        IngAmounts[ing.type]++;
    })

    return IngAmounts;

}

const order = props => {
    const dt = new Date(props.datetime).toLocaleString();
    const ingredientsAmount = getIngredientsAmountObject(props.ingredients)

    return (
        <div className={classes.Order}>
            <p>Date and Time: <span className={classes.bold}>{`${dt}`}</span></p>
            {props.ingredients ? <div className={classes.DesktopOnly}>
                Ingredients:
                <ul>
                    {Object.keys(ingredientsAmount).map(ingType => {
                        return (
                            ingredientsAmount[ingType] ? <li key={ingType}>
                                <span style={{ textTransform: 'capitalize' }}>{ingType}</span> ({ingredientsAmount[ingType]})
                            </li> : null
                        )
                    })}
                </ul>
            </div> : null}
            <p>Price: <span className={classes.bold}>{(+props.price).toFixed(2)} $</span></p>
        </div >
    )
}

export default order;