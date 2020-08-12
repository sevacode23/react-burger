import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import classes from './Burger.module.css'

const Burger = props => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient typeS="bread-top" />

            {props.ingredients.length ?
                <Droppable droppableId="burger" >
                    {provided =>
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.ingredients.map((ing, index) => (
                                <BurgerIngredient
                                    key={ing.pos}
                                    id={ing.pos}
                                    typeS={ing.type}
                                    index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
                : <strong>Start adding ingredients!</strong>
            }

            <BurgerIngredient typeS="bread-bottom" />
        </div>
    )
}

export default Burger;