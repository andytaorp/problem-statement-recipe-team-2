import { createContext, useReducer } from 'react'

export const RecipeContext = createContext()

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPE': 
      return {
        recipes: action.payload
      }
    case 'CREATE_RECIPE':
      return {
        recipes: [action.payload, ...state.recipes]
      }
    case 'DELETE_RECIPE':
      return {
        recipes: state.recipes.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: null
  })

  return (
    <RecipesContext.Provider value={{...state, dispatch}}>
      { children }
    </RecipesContext.Provider>
  )
}