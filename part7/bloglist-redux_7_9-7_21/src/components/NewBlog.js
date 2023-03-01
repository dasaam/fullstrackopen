import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ notifyWith }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const likes = 0
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog({ title, author, url, likes }))
    notifyWith(`A new blog '${title}' by '${author}' added`)
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id='title'
            placeholder='title'
            name='title'
          />
        </div>
        <div>
          author
          <input
            id='author'
            placeholder='author'
            name='author'
          />
        </div>
        <div>
          url
          <input
            id='url'
            placeholder='url'
            name='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm