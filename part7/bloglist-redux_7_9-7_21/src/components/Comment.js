//import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { handleNotification } from '../reducers/notificationReducer'
import { useMatch } from 'react-router-dom'

const Comment = () => {
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')

  const notifyWith = (message, typeMessage = 'info') => {
    dispatch(handleNotification(message, typeMessage))

    setTimeout(() => {
      dispatch(handleNotification('', ''))
    }, 3000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    dispatch(createComment({ id:match.params.id, comments:[ comment ] }))
    notifyWith(`A new comment '${comment}' added`)

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id='comment'
          name='comment'
          placeholder='comment'
        />
      </div>

      <button type="submit">
        add comment
      </button>
    </form>
  )
}

export default Comment