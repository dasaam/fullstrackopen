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

const mostBlogs = (blogs) => {
    const _ = require("lodash");

    let bigger = 0;
    let author;
    _.forEach(_.countBy(blogs, 'author'), function(value, key) {
        if(bigger < value){
            bigger = value
            author = key
        }
    });

    const bestAuthor = {
        "author": author,
        "blogs": bigger
    }

    
    return bestAuthor
}

const mostLikes = (blogs) => {
    const _ = require("lodash");

    let bigger = 0;
    let author;

    _.forEach(_.groupBy(blogs, 'author'), function(value, key) {

        if(bigger < _.sumBy(value, 'likes')){
            bigger =  _.sumBy(value, 'likes')
            author =  key
        }

    });

    const bestAuthor = {
        "author": author,
        "likes": bigger
    }

    
    return bestAuthor
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}