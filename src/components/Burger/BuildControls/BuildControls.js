import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'

const ctrls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {ctrls.map(ctrl => (
                <BuildControl
                    key={ctrl.type}
                    label={ctrl.label}
                    type={ctrl.type}
                    onAdd={() => props.onIngredientAdd(ctrl.type)} />
            ))}
            <button
                disabled={!props.enableRemoveButton}
                className={classes.Remove}
                onClick={props.onIngredientRemove}>Remove</button>
            <button
                className={classes.OrderButton}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default React.memo(BuildControls)