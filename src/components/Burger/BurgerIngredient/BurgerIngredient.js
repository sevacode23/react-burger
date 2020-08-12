import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import classes from './BurgerIngredient.module.css'

const BurgerIngredient = (props) => {
    let ingredientClass = null;

    switch (props.typeS) {
        case ('bread-bottom'):
            return <div className={classes.BreadBottom}></div>
        case ('bread-top'):
            return (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
        case ('meat'):
            ingredientClass = classes.Meat
            break;
        case ('cheese'):
            ingredientClass = classes.Cheese
            break;
        case ('salad'):
            ingredientClass = classes.Salad
            break;
        case ('bacon'):
            ingredientClass = classes.Bacon
            break;
        default:
            ingredientClass = null;
            break;
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.index}>
            {provided =>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={ingredientClass}></div>
            }
        </Draggable>
    )
}

BurgerIngredient.propTypes = {
    typeS: PropTypes.string.isRequired
}

export default BurgerIngredient