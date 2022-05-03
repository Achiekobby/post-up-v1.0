const {gql} = require('apollo-server')

module.exports = gql`
    # //todo: Query Definitions 
    type Post{
        id:ID!,
        post_body:String!,
        created_at:String!,
        username:String
    }

    type User{
        id:ID!
        username:String!,
        email:String!,
        password:String,
        token:String!,
        created_at:String!,
    }

    # //todo:Mutations Definitions
    input RegisterInput{
        username:String!,
        password:String!,
        confirm_password:String!,
        email:String!,
    }
    # //todo:List all the queries that the clients can execute along with the return types in relation to app
    type Query {
        getPosts:[Post]
        getPost(postId:ID!):Post
    }

    # //todo: List of all mutations or changes to be made in the database in relation to the app
    type Mutation{
        register(registerInput:RegisterInput): User!
        login(username:String!, password:String!):User!
        createPost(post_body:String!):Post!
        deletePost(postId:ID!):String
    }
`;
