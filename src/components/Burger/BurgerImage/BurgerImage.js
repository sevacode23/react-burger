import React from 'react'
import BurgerIngredientImage from './BurgerIngredientImage/BurgerIngredientImage'
import classes from './BurgerImage.module.css'

const BurgerImage = props => {
    return (
        <div
            style={{ height: props.height }}
            className={classes.BurgerImage}>
            <BurgerIngredientImage type='bread-top' />
            {props.ingredients.map(ing => {
                return <BurgerIngredientImage
                    key={ing.type + ing.pos}
                    type={ing.type} />
            })}
            <BurgerIngredientImage type='bread-bottom' />
        </div>
    )
}

export default BurgerImage