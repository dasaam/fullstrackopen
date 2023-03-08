import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { handleNotification } from '../reducers/notificationReducer'
import Comment from '../components/Comment'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const userLogin = useSelector(state => state.login)

  const match = useMatch('/blogs/:id')
  const blog = match
  ? blogs.find(blog => blog.id === match.params.id)
  : null

  if (!blog) {
    return null
  }


  const notifyWith = (message, typeMessage = 'info') => {
    dispatch(handleNotification(message, typeMessage))

    setTimeout(() => {
      dispatch(handleNotification('', ''))
    }, 3000)
  }

  const canRemove = () => {
    return userLogin && blog.user.username===userLogin.username
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlog(blogToUpdate))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      //await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      //setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div>
      {
        <div>
          <h1>{ blog.title }</h1>
          <div> <a href={blog.url}> {blog.url}</a> </div>
          <div>{blog.likes} likes <button onClick={() => like(blog)}>like</button></div>
          <div>added by {blog.user && blog.user.name}</div>
          {canRemove&&<button onClick={() => remove(blog)}>delete</button>}
          <h3>Comments</h3>
          <Comment />
          <ul>
            {
              blog.comments.map(comment =>
                <li key={blog.id + comment}>
                  { comment }
                </li>
              )
            }
          </ul>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
}

export default Blog