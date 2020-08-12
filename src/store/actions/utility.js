export const mapIngredientsToArray = ingredients => {
    const ingredientsArray = []
    for (let key in ingredients) {
        ingredientsArray.push({ pos: key, type: ingredients[key] })
    }
    return ingredientsArray;
}
