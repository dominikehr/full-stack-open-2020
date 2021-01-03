const _ = require('lodash')
const dummy = () => 1

const totalLikes = (blogPosts) => {
  return blogPosts.reduce((acc, current) => acc+current.likes, 0)
}

const favoriteBlog = (blogPosts) => {
  if(blogPosts === undefined || blogPosts.length == 0) {
    return []
  }
  const maxElement = blogPosts.reduce(
    ((prev, current) => (prev.likes > current.likes) ? prev : current),
    blogPosts[0])
  
  const max = {
    title: maxElement.title,
    author: maxElement.author,
    likes: maxElement.likes
  }
  return max
}

const mostBlogs = (blogPosts) => {
  if(blogPosts === undefined || blogPosts.length == 0) {
    return []
  }
  // create an array of {key-value} pairs {author-occurenceCount}
  const occCount = blogPosts.reduce((acc, cur) => {
    if(cur.author in acc) {
      acc[cur.author]++
    } else {
      acc[cur.author] = 1
    }
    return acc
  }, {})

  // find the element with max occurence
  let maxOccElement = null
  Object.keys(occCount).forEach(autor => {
    if(maxOccElement == undefined || occCount[autor] > maxOccElement.blogs) {
      maxOccElement = {
        author: autor,
        blogs: occCount[autor]
      }
    }
  })

  return maxOccElement
}

const mostLikes = (blogPosts) => {
  if(blogPosts === undefined || blogPosts.length == 0) {
    return []
  }
  // use lodash to group by author and map to a new array of object with reduced likes as sum
  const authorsGrouped = _.groupBy(blogPosts, 'author')
  const results = _.map(authorsGrouped, (val, key) => {
    return {
      author: key,
      likes: _.reduce(val, (acc, cur) => {
        return acc + cur.likes
      }, 0)
    }
  })

  // iterate through result to find max likes author:
  let maxLikesAuthor = null
  results.forEach(result => {
    if(maxLikesAuthor == undefined || result.likes > maxLikesAuthor.likes) {
      maxLikesAuthor = {
        author: result.author,
        likes: result.likes
      }
    }   
  })

  return maxLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}