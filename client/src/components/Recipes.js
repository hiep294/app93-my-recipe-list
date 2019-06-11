import React from 'react'
import Recipe from './Recipe'
import { RecipeConsumer } from '../contexts/RecipeContext'

function Main({ value }) {
  // const { recipes } = value
  const { recipes } = value
  return (
    <>
      {recipes.map((recipe) => <Recipe key={recipe._id} recipe={recipe} />)}
    </>
  )
}


export default function Recipes() {
  return (
    <RecipeConsumer>
      {(value) => <Main value={value} />}
    </RecipeConsumer>
  )
}
