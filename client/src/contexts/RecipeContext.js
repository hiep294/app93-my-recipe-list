import React, { useState, useEffect } from 'react'
import RecipeConnection from '../APIConnections/RecipeConnection'
const RecipeContext = React.createContext()
const Provider = RecipeContext.Provider

export const RecipeConsumer = RecipeContext.Consumer
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [editedRecipe, setEditedRecipe] = useState({})

  const value = {
    recipes,
    create: (recipe, dispatch) => {
      RecipeConnection.create(recipe, (resItem) => {
        setRecipes([resItem, ...recipes])
        setTimeout(() => {
          dispatch({ type: 'RESET_STATE' })
        }, 1)
      }, (errors) => {
        dispatch({ type: 'GET_ERRORS', payload: errors })
      })
    },
    editedRecipe,
    edit: (recipe) => {
      setEditedRecipe(recipe)
    },
    closeEditing: () => {
      setEditedRecipe({})
    },
    update: (updatedRecipe, dispatch) => {
      RecipeConnection.update(updatedRecipe, () => {
        setEditedRecipe({})
        setRecipes(recipes.map(item => {
          if (updatedRecipe._id === item._id) {
            for (var key in updatedRecipe) {
              item[key] = updatedRecipe[key]
            }
          }
          return item
        }))
      }, (errs) => {
        dispatch({ type: 'GET_ERRORS', payload: errs })
      })
    },
    delete: (_id) => {
      RecipeConnection.delete(_id, () => {
        setRecipes(recipes.filter(item => item._id !== _id))
      })
      document.getElementById(`recipe${_id}`).style.opacity = 0.3
    }
  }

  useEffect(() => {
    RecipeConnection.index((recipes) => {
      setRecipes(recipes)
    })
  }, [])

  return <Provider value={value}>
    {children}
  </Provider>
}

