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
