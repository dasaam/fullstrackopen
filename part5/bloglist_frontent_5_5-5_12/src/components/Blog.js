import { useState } from 'react'

const Blog = ({blog}) => {
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

  return (
    <div style={blogStyle}>      
      <div>
        
        <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.title}</p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>  
    </div>
)}
 
export default Blog