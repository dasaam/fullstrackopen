import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 

  const addBlog = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addBlog}>
        <p>
          <label>title</label>
          <input type="text" name="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
        </p>
        <p>
          <label>author</label>
          <input type="text" name="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
        </p>
        <p>
          <label>url</label>
          <input type="text" name="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
        </p>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm