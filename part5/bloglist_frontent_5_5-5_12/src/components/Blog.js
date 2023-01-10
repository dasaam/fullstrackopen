import { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (likes, id) => {
    updateBlog({
      "likes": likes + 1,
      "id":id
    })

  }
  
  return (
    <div style={blogStyle}>      
      <div>
        
        <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.title}</p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => handleLike(blog.likes, blog.id)}>like</button></p>
          <p>{blog.author}</p>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>  
    </div>
)}
 
export default Blog