import React, { useEffect } from 'react'
import './Recipe.css'
import editIcon from '../icons/edit.png'
import { RecipeConsumer } from '../contexts/RecipeContext'
import DeleteLaunchModal from './DeleteLaunchModal'

function Main(props) {
  const { recipe, value } = props

  useEffect(() => {
    document.getElementById(`recipe${recipe._id}`).style.opacity = 1
  })

  function onEdit() {
    value.edit(recipe)
  }

  function onDeleteThis() {
    value.delete(recipe._id)
  }

  return (
    <div className="card recipe" id={`recipe${recipe._id}`}>
      <div className="card-body">
        <h4 className="card-title mb-3">{recipe.name}</h4>
        <p className="card-text">{recipe.description}</p>
        <div className="footer">
          <a className="card-link" href={`${recipe.link}`}>Link</a>
          <div className="buttons">
            <DeleteLaunchModal onDeleteThis={onDeleteThis} />
            <img src={editIcon} alt="" onClick={onEdit} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Recipe({ recipe }) {
  return <RecipeConsumer>
    {(value) => <Main value={value} recipe={recipe} />}
  </RecipeConsumer>
}
