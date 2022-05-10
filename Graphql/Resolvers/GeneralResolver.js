const postsResolvers = require("./posts")
const userResolvers = require("./users")
const commentsResolvers = require("./comments")

module.exports = {
    Post:{
        likesCount:(parent)=>parent.likes.length,
        commentsCount:(parent)=>parent.comments.length,   
    },
    Query:{
        ...postsResolvers.Query,
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
    Subscription:{
        ...postsResolvers.Subscription,
    }
}