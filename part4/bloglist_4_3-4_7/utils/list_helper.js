const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let mostLiked = 0;
    let mostLikedId;
    
    const reducer = (sum, item) => {
        if(mostLiked < item.likes){
            mostLiked = item.likes
            mostLikedId = item._id;
        }
    }
    blogs.reduce(reducer, 0)
    
    const mostBlog = blogs.filter(blog => blog._id == mostLikedId)

    return mostBlog
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}