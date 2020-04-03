import gql from 'graphql-tag';

export const SEARCH = gql `query SEARCH($queryStr:String!){
    search(type:USER, query:$queryStr, first:15)
    {
        nodes
        {
        ... on Issue
            {
                id
                title
                body
            }
        ... on Repository
            {
                reposname:name
                description
            }
        ... on User
            {
                id
                name
                avatarUrl
                company
                email
            }
        ... on PullRequest
            {
                number
            }
        }
    }
}`