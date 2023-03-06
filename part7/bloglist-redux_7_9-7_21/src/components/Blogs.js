import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
    const blogs = useSelector(state => state.blogs)
    const style = {
        marginBottom: 2,
        padding: 5,
        borderStyle: 'solid'
    }

    return (

        <div>
          {
            blogs.map(blog =>
              <div key={blog.id} style={style} className='blog'>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </div>
            )
          }
        </div>
    )
}
export default UserList