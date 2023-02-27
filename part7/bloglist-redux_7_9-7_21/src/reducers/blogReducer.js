import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


  const blogSlice = createSlice({
    name: 'blogs',
    initialState:[],
    reducers: {
      appendBlog(state, action) {
        state.push(action.payload)
      },
      setBlogs(state, action) {
        return action.payload
      },
      editBlog(state, action) {
        const id = action.payload.id
        return state.map(blog =>
            blog.id !== id ? blog : action.payload
        )
      },
      deleteBlog(state, action) {
        const id = action.payload
        return state.filter(blog => blog.id !== id)

      },
    },
})

export const { appendBlog, setBlogs, editBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = content => {

  return async dispatch => {
    const updateBlog = await blogService.update(content)
    dispatch(editBlog(updateBlog))
  }
}

export const removeBlog = id => {

  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer