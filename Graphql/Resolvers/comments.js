const Post = require('../../Models/Post')
const checkAuth = require('../../Middleware/CheckAuth')
const {UserInputError, AuthenticationError} = require('apollo-server')

module.exports = {
    Mutation:{
        //Todo: Creating a comment in relation to a post
        createComment:async (_,{postId, comment_body},context)=>{
            //Tip: Checking if it is a validated user
            const user = checkAuth(context)

            if(comment_body.trim()===""){
                throw new UserInputError("Empty Comment",{
                    errors:{
                        body:"Comment body must not be empty",
                    }
                })
            }
            //* Finding the specific post to comment on
            const post = await Post.findById(postId)
            if(post){

                //Tip: The unshift method appends new entries to the beginning of the comment table
                post.comments.unshift({
                    comment_body,
                    username:user.username,
                    created_at: new Date().toISOString()
                })
                await post.save()

                return post
            }
            else throw new UserInputError("Post not found")

        },
        deleteComment:async(_,{postId, commentId}, context)=>{
            //Tip: Checking if it is a validated user
            const {username} = checkAuth(context)

            //* Finding the post with the id
            const post = await Post.findById(postId)

            if(post){
                //Tip: using the findIndex to locate the index of the specific comment associated to the one to be deleted
                const commentIndex = post.comments.findIndex(comment=>comment.id === commentId)

                //* Checking to see the comment belongs to the authenticated user
                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex,1)
                    await post.save()
                    return post
                }
                else{
                    throw new AuthenticationError("Action not allowed")
                }
            }
            else throw new UserInputError("Post not found")

        }
    }
}