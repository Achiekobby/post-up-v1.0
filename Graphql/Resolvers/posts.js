const Post = require("../../Models/Post")
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
        }
    },
}