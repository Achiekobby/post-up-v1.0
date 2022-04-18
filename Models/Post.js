const { model, Schema }  = require('mongoose')

const postSchema = new Schema({ 
    post_body:String,
    username:String,
    created_at:String,
    comments:[
        {
            comment_body:String,
            username:String,
            created_at:String,
        }
    ],

    likes:[
        { 
            username:String,
            created_at:String,
        }
    ],

    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
    
})

module.exports = model("Post", postSchema)