import React, { useReducer } from 'react'
import './Form.css'
import { RecipeConsumer } from '../contexts/RecipeContext'
import ErrorsLaunchModal from './ErrorsLaunchModal'

const initialState = {
  name: '',
  description: '',
  link: '',
  errors: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload }
    case 'CHANGE_DESCRIPTION':
      return { ...state, description: action.payload }
    case 'CHANGE_LINK':
      return { ...state, link: action.payload }
    case 'RESET_STATE':
      return initialState
    case 'GET_ERRORS':
      return { ...state, errors: action.payload }
    case 'EDIT_RECIPE':
      const { _id, name, description, link } = action.payload
      return { ...state, _id, name, description, link }
    default:
      throw new Error()
  }
}

function Main({ value }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function onSubmit() {
    const { name, description, link } = state
    value.create({ name, description, link }, dispatch)
  }

  // edit item
  if (state._id !== value.editedRecipe._id) {
    dispatch({ type: 'EDIT_RECIPE', payload: value.editedRecipe })
  }
  // close editing
  function onCloseEditingRecipe() {
    value.closeEditing()
  }

  // update
  function onUpdateRecipe() {
    if (state._id) {
      const { _id, name, description, link } = state
      const updatedItem = { _id, name, description, link }
      value.update(updatedItem, dispatch)
    }
  }

  // reset errors
  function onResetErrors() {
    dispatch({ type: 'GET_ERRORS', payload: [] })
  }

  const editIconsStyle = {
    transition: 'opacity 0.3s',
    opacity: state._id ? 1 : 0,
    cursor: state._id ? 'pointer' : 'unset'
  }

  // set keyup for the last input
  function onKeyUp(e) {
    if (e.keyCode === 13) {
      state._id ? onUpdateRecipe() : onSubmit()
    }
  }

  return (
    <div className="card form">
      {state.errors.length ? (
        <ErrorsLaunchModal
          errors={state.errors}
          onResetErrors={onResetErrors}
        />
      ) : null}
      <div className="card-body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Example: Sugar Snap Pea and Carrot Soba Noodles" className="form-control" id="name"
              value={state.name || ''}
              onChange={(e) => dispatch({ type: 'CHANGE_NAME', payload: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea placeholder="Example: This dish is simple to make once you have the vegetables prepared and the dressing whisked up" className="form-control" id="description"
              value={state.description || ''}
              onChange={(e) => dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input type="url" placeholder="Example: https://bit.ly/2XHSH2Q" className="form-control" id="link"
              value={state.link || ''}
              onChange={(e) => dispatch({ type: 'CHANGE_LINK', payload: e.target.value })}
              onKeyUp={onKeyUp}
            />
          </div>
          <div className="buttons">
            <button className="btn btn-light btn-submit" type="button"
              onClick={onSubmit}
            >Submit</button>
            <span style={editIconsStyle}>
              <button className="btn btn-light" type="button"
                onClick={onUpdateRecipe}
              >Update
            </button>
              <button className="btn btn-light" type="button"
                onClick={onCloseEditingRecipe}
              >Close
            </button>
            </span>
          </div>
        </form>
      </div>
    </div>

  )
}

export default function Form() {
  return (
    <RecipeConsumer>
      {(value) => <Main value={value} />}
    </RecipeConsumer>
  )
}

