export const updateObject = (state, changes) => {
    return {
        ...state,
        ...changes
    }
}