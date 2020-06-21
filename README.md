Based on the tutorial at https://hasura.io/learn/graphql/nextjs-fullstack-serverless/

# Course Introduction

GraphQL is becoming the new way to use APIs in modern web and mobile apps.

However, learning new things always takes time and without getting your hands dirty it’s very hard to understand the nuances of a new technology.

So, we put together a powerful and concise course that will introduce you to GraphQL and integrating GraphQL into your frontend stack, in the shortest amount of time possible.

We will explore the fundamentals of GraphQL and the things that make GraphQL especially suitable for modern applications, like its realtime capabilities! The course is light on opinions so that once you grok the fundamentals you can go on to choose your favorite libraries, tools and tailor your workflow.

## Key topics and takeaways

- GraphQL vs REST
- GraphQL queries, mutations, subscriptions
- Setting up a GraphQL client with Apollo
- Integrating GraphQL queries in your react app
- Integrating GraphQL mutations with query variables to handle form input
- Updating local state after a GraphQL mutation (form input) using Apollo cache
- Optimistic updates to local state and UI after GraphQL mutations for a slick UX
- Using subscriptions with subscription hooks
- Building a real-time feed with notifications using mutations and subscriptions

## What will we be building?

We will be building a realtime todo app using authenticated GraphQL APIs.

Try this deployed version of the app to see what we'll be building: [https://learn-hasura-todo-app.netlify.com/](https://learn-hasura-todo-app.netlify.com/)

## Will this course teach Next.js concepts as well?

No, we will be simulating a scenario where we already have a GraphQL API and the basic UI of a Next.js app built. Our task in this scenario is to integrate the GraphQL APIs into our Next.js app to build a complete and working app.

If you're new to Hooks in React, we recommend going through the [official docs](https://reactjs.org/docs/hooks-intro.html) and then coming back here!

## What do I need to take this tutorial?

You need to have npm/yarn & node 10+ running.

## How long will this tutorial take?

Less than 2 hours

# Intro to GraphQL

## What is GraphQL?

GraphQL is a specification for how to talk to an API. It's typically used over HTTP where the key idea is to `POST` a "query" to an HTTP endpoint, instead of hitting different HTTP endpoints for different resources.

GraphQL is designed for developers of web/mobile apps (HTTP clients) to be able to make API calls to fetch the data they need from their backend APIs conveniently.

## GraphQL vs REST: An example

Let's say you have an API to fetch a user's profile and their address. In a typical REST scenario, this is what the request/response would look like:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

If your API server was a GraphQL server instead, this is what your API calls would look like:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

You can see that the response JSON is different for different "queries" sent by the client.

```
Request1:         |  Response1:
query {           |  {
  user (id: 1) {  |    "user": {
    id            |       "id": 1
  }               |     }
}                 |  }
----------------------------------------
Request2:         |   Response2:
query {           |   {
  user (id: 1) {  |     "user": {
    id            |       "id": 1
    name          |       "name": "Elmo"
  }               |     }
}                 |   }
```

## Thinking in GraphQL

We're changing the way we think about API calls. Instead of making different API calls to different URLs to fetch data, we're making ad-hoc queries to a "single URL endpoint" that returns data based on the query.

- Instead of 'GET'ing a resource you 'POST' a query that describes what data you want.
- You think of the data your API returns as a "graph", this allows you to make queries to fetch "related" pieces of data in a single shot. In the example above, you fetch the user and the user's address (as a nested JSON object) in the same API call, as opposed to making 2 API calls.
- The "query" you send as data in the POST request has a structure and a syntax. This "language" is called GraphQL.

As you can see in the example above, GraphQL queries look very neat and easy to read! This is because the query is the "shape" of the final JSON data you desire. This is one of the key-reasons that makes GraphQL a joy to work with!

## GraphQL benefits

- Avoid over-fetching: You avoid fetching more data than you need because you can specify the exact fields you need.
- Prevent multiple API calls: In case you need more data, you can also avoid making multiple calls to your API. In the case above, you don't need to make 2 API calls to fetch `user` and `address` separately.
- Lesser communication with API developers: Sometimes to fetch the exact data you need, especially if you need to fetch more data and want to avoid multiple API calls, you will need to ask your API developers to build a new API. With GraphQL, your work is independent of the API team! This allows you to work faster on your app.
- Self-documenting: Every GraphQL API conforms to a "schema" which is the graph data model and what kinds of queries a client can make. This allows the community to build lots of cool tools to explore & visualise your API or create IDE plugins that autocomplete your GraphQL queries and even do "codegen". We'll understand this in more detail later!

Here's a quick chart to show you the GraphQL analogs of typical REST-ish terms:

```
Requirement	                REST	            GraphQL
Fetching data objects	    GET	                query
Writing data	            POST	            mutation
Updating/deleting data	    PUT/PATCH/DELETE	mutation
Watching/subscribing to data	                subscription
```

## Architecture

## Fetching data - Queries

## Writing data - Mutations

## Watching data - Subscriptions

# Hasura Backend Setup

# Auth0 Setup

## Custom Claims in Auth0 Rules

## Connect Hasura with Auth0

## Sync Users with Rules

# Next.js Boilerplate Setup

# Configure Apollo Client with Next.js

# Queries

## Fetch todos - query

## useQuery hook

## Handle loading/errors

# Mutations & Query variables

## Create todos - mutation

## Query Variables

## useMutation Hook, Update Cache

# Optimistic UI

## Update todos - mutation

## Mutation and update cache

## Remove todos - mutation

## Mutation and update cache

## Bulk delete todos - mutation

## Mutation and update cache

# Subscriptions to show online users

## Apollo useSubscription React hook

## Create Subscription and Render Result

# Realtime Feed

## Fetch public todos - subscription

## Sync new todos

# Deployment

# What next?
