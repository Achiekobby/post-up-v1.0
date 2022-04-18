const {gql} = require('apollo-server')

module.exports = gql`
    #Query Definitions 
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

    # Mutations Definitions
    input RegisterInput{
        username:String!,
        password:String!,
        confirm_password:String!,
        email:String!,
    }
    # List all the queries that the clients can execute along with the return types in relation to posts
    type Query {
        getPosts:[Post]
    }

    # List of all mutations or changes to be made in the database in relation to the posts
    type Mutation{
        register(registerInput:RegisterInput): User!
    }
`;
