import arrayMove from 'array-move'
import * as actions from '../actions/actionTypes'

const INGREDIENTS_PRICE = {
    meat: 2,
    cheese: 1.3,
    salad: 0.6,
    bacon: 1
}

const initialBurger = {
    ingredients: [],
    totalPrice: 4
}

const recalculateIngredientPositions = ingredients => {
    return ingredients.map((ing, index) => {
        return {
            pos: index,
            type: ing.type
        }
    })
}

const burgerReducer = (burger = initialBurger, action) => {
    const length = burger.ingredients.length;

    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...burger,
                ingredients: burger.ingredients.concat({ pos: length, type: action.ingType }),
                totalPrice: burger.totalPrice + INGREDIENTS_PRICE[action.ingType]
            }

        case actions.REMOVE_LAST_INGREDIENT:
            const removedIngredientPrice = INGREDIENTS_PRICE[burger.ingredients[length - 1].type]
            return {
                ...burger,
                ingredients: burger.ingredients.filter((ing, index) => index !== length - 1),
                totalPrice: burger.totalPrice - removedIngredientPrice
            }
        case actions.MOVE_INGREDIENTS:
            const { newPos, prevPos } = action.dragData
            const newIngredients = [...burger.ingredients]
            const movedArray = arrayMove(newIngredients, prevPos, newPos);
            return {
                ...burger,
                ingredients: recalculateIngredientPositions(movedArray)
            }
        default:
            return burger;
    }
}

export default burgerReducer