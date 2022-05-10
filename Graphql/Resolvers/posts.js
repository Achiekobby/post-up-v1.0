const Post = require("../../Models/Post")
const checkAuth = require("../../Middleware/CheckAuth")
const {AuthenticationError} = require('apollo-server')


// const pubsub  = new PubSub()
module.exports = {
    // Query Methods Definitions in reference to posts
    Query: {
        getPosts:async()=>{
            try{
                const posts = await Post.find()
                return posts
            }catch(err){
                console.log(err.message)
            }
        },

        getPost:async (_,{postId})=>{
            try {
                const post = await Post.findById(postId)
                if(post){
                    return post
                }
                else{
                    throw new Error("Post not Found")
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }

    },

    Mutation:{
        createPost: async (_,{post_body}, context)=>{

            // Tip:Checking if the user token is valid
            const validUser = checkAuth(context)
            // console.log(validUser);

            //* Creating a new Post
            const newPost = new Post({
                post_body,
                user: validUser.id,
                username:validUser.username,
                created_at: new Date().toISOString()
            })
            const post = await newPost.save()

            context.pubsub.publish('NEW POST',{
                newPost: post
            })
            return post
        },

        //Todo: Deleting Post
        deletePost: async(_,{postId},context)=>{
            //Tip: check if validated user
            const validUser = checkAuth(context)

            //*finding the the specific post
            const post = await Post.findById(postId)
            try{
                if(post){
                    if(validUser.username === post.username){
                        //!deleting the post
                        post.delete()
                        return "Post has been deleted successfully"
                    }
                    throw new AuthenticationError("Action not allowed")
                }
                else{
                    throw new Error("Post to be deleted not found")
                }
            }
            catch(error){
                throw new Error(error.message)
            }
            
        },

        //Todo: Adding likes to a post
        likePost: async(_,{postId},context)=>{
            //Tip: check if validated user
            const {username} = checkAuth(context)

            //*finding the post
            const post = await Post.findById(postId)

            if(post){
                //Tip: whole idea of the following logic is to toggle the value of the like section of the post

                if(post.likes.find(like=>like.username === username)){
                    //!Post is already liked, unlike post
                    post.likes = post.likes.filter(like=>like.username !== username)
                }
                else{
                    //*Not liked, like post
                    post.likes.unshift({
                        username: username,
                        created_at: new Date().toISOString()
                    })
                }
                await post.save()

                return post
            }else throw new UserInputError("Post not Found")
        }

    },

    Subscription:{
        newPost:{
            subscribe:(_,__,{pubsub})=>{ pubsub.asyncIterator('NEW POST') }
        }
    }

}