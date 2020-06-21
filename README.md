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

Before going further in understanding GraphQL, it's useful to get a sense of how GraphQL is actually used in an HTTP client (typically a web/mobile app).

### GraphQL over HTTP

Check out the diagram below, to get a sense of how GraphQL is typically used in your stack:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

#### GraphQL client-server flow

1. Note that the GraphQL query is not really JSON; it looks like the shape of the JSON you want. So when we make a 'POST' request to send our GraphQL query to the server, it is sent as a "string" by the client.
2. The server gets the JSON object and extracts the query string. As per the GraphQL syntax and the graph data model (GraphQL schema), the server processes and validates the GraphQL query.
3. Just like a typical API server, the GraphQL API server then makes calls to a database or other services to fetch the data that the client requested.
4. The server then takes the data and returns it to the client in a JSON object.

#### Example GraphQL client setup

In your day to day work, you don't actually need to worry about the underlying HTTP requests & responses.

Just like when you work with a REST API and use a HTTP client to reduce the boilerplate in making API calls and handling responses, you can choose a GraphQL client to make writing GraphQL queries, sending them and handling responses much easier.

In fact, the mechanism of how you send the GraphQL query and accept the GraphQL response has become standard. This makes working with GraphQL very easy on the client.

Here's what a typical GraphQL client setup and making a query would look like:

```js
// Setup a GraphQL client to use the endpoint
const client = new client("https://myapi.com/graphql");
// Now, send your query as a string (Note that ` is used to create a multi-line
// string in javascript).
client.query(`
  query {
    user {
      id
      name
    }
  }`);
```

## Fetching data - Queries

### Try out GraphQL queries

For this tutorial we've set up a GraphQL API for you. The most common way to browse a GraphQL API is to use GraphiQL. GraphiQL is a tool built by Facebook, (pronounced "graphical") that makes it easy to explore any GraphQL API.

When you connect GraphiQL to a GraphQL endpoint, it queries the server for its GraphQL schema and gives you a UI to browse and test queries, and that powers its amazing autocomplete!

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

Tools like GraphiQL make GraphQL APIs really easy to use and integrate APIs in your app without requiring external documentation tools.

You can access the GraphiQL for this realtime todo app tutorial here: [hasura.io/learn/graphql/graphiql](hasura.io/learn/graphql/graphiql)

When you work with a GraphQL API in a project you will almost always use a tool like GraphiQL to explore and test your GraphQL queries.

### Basic GraphQL query

1. Open GraphiQL at [https://hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql). You'll have to login to get an auth token to query the API. In a real-world scenario your GraphQL APIs will be protected.
2. You'll see a URL, and headers that contain the auth token that will be sent along with your GraphQL query.
3. Now, paste this GraphQL query in the GraphiQL window:

```gql
query {
  users {
    name
  }
}
```

4. Hit ctrl + enter or cmd + enter (mac) or click on the ▶️ icon to run the GraphQL query
5. On the right, you should see a list of users by their names that are in the system!

Recall that there is no magic here! The hosted GraphiQL app is sending a GraphQL query string to the server at the given endpoint with the HTTP headers. The server then sends the response that you see on the right hand side.

### Fetching "graphs"

Our todo app has users, todos and information about users that are currently online. This is what our API "schema" looks like:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

As you can see, it is a "graph" like schema where all the 3 models are linked to each other.

Let's try making queries that fetch different slices of our data from the overall "graph".

#### Fetch users and their todos

This GraphQL query will fetch all the users and their publicly visible todos:

```gql
query {
  users {
    name
    todos {
      title
    }
  }
}
```

#### Fetch online users and their profile information

This GraphQL query will fetch all the currently online users and their profile information (which is just their name for now):

```gql
query {
  online_users {
    last_seen
    user {
      name
    }
  }
}
```

### Adding parameters (arguments) to GraphQL queries

In most API calls, you usually use parameters. For example, to specify what data you're fetching. If you're familiar with making GET calls, you would have used a query parameter. For example, to fetch only 10 todos you might have made this API call: GET /api/todos?limit=10.

The GraphQL query analog of this is arguments that you can attach to a "field".

#### Basic argument: Fetch 10 todos

This GraphQL query will fetch 10 todos and not all of them.

```gql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

The most important bit to check here is `limit: 10`. GraphQL servers will provide a list of arguments that can be used in `()` next to specific fields. In our case, we are using Hasura for creating the GraphQL backend which provides filter, sort and pagination arguments. The GraphQL server or API that you use, might provide a different set of arguments that can be used.

#### Multiple arguments on multiple fields: Fetch 1 user and 5 most recent todos for each user

```gql
query {
  users(limit: 1) {
    id
    name
    todos(order_by: { created_at: desc }, limit: 5) {
      id
      title
    }
  }
}
```

Notice that we are passing arguments to different fields. This GraphQL query reads as:

> Fetch users (with limit 1), and their todos (ordered by descending creation time, and limited to 5).

### GraphQL variables: Passing arguments to your queries dynamically

This is great, but we still have a problem. If we want to create a query where we are fetching data with arguments that are provided dynamically, we'd have to create the entire query string again.

This is what we don't want to do:

```js
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

Thankfully, we don't ever have to do this! GraphQL variables are extra variables that you can send in a query so that the "arguments" can be provided dynamically!

### Fetch \$limit number of todos

This is what our GraphQL query would look like:

```gql
query($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
```

In addition to the query above, we send a variables object:

```js
{
   "limit": 10
}
```

Now instead of sending just the query to the GraphQL server, from our client we'll send both the query and the variables. The GraphQL server will use the variable in the right place in the query automatically for us!

Let's try this out in GraphiQL:

1. Head to GraphiQL
2. Write out this query
3. Scroll to the bottom of the page, where you see a smaller panel "Query Variables"
4. Add the query variable as a JSON object

### Summary

- You can now make GraphQL queries
- You know how to pass arguments to your GraphQL queries
- You know how to make your arguments dynamic by using query variables

Next, let's look at writing data and not just fetching data!

## Writing data - Mutations

These are the concepts you should know before you attack mutations (haha):

- [Using GraphiQL](https://hasura.io/learn/graphql/nextjs-fullstack-serverless/intro-to-graphql/2-fetching-data-queries#graphiql)
- [Using query variables](https://hasura.io/learn/graphql/nextjs-fullstack-serverless/intro-to-graphql/2-fetching-data-queries#query-variables)

Now, let's get started with seeing how we can use GraphQL to "write" data. GraphQL mutations are types of GraphQL queries that may result in the state of your backend "mutating" or changing, just like typical 'POST', 'PUT', 'PATCH', 'DELETE' APIs.

### Basic mutations

Since we're using Hasura for our GraphQL API, we get mutations for inserts, updates or deletes that we can use in our app.

Let's try these mutations out in the context of a todo app to see what mutations look like. Mutations that you get from another GraphQL service, say if your API team has built their own, might be different.

#### Create a todo

Let's make an API call to create a todo. As you would have guessed, this will be a critical portion of our todo app. 😉

> Protip: Now let's say we don't know what the name of the mutation to create a todo. GraphiQL to the rescue! Head to GraphiQL and on the right, click on the "docs" tab. Type "todo" there and you'll see a list of GraphQL queries and types that use todo. Read through their descriptions and you'll soon find that `insert_todos` is what you need.

```gql
mutation {
  insert_todos(objects: [{ title: "new todo" }]) {
    returning {
      id
    }
  }
}
```

### Returning data after the mutation

Notice that the data of the todo that is to be inserted is sent as an argument to the insert_todos mutation. But the "fields" of the mutation specify the shape of the response that you want from the server.

Let's say we'd like to get the entire todo object once it's been created as a response:

```gql
mutation {
  insert_todos(objects: [{ title: "new todo" }]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

### Parameterise what you insert

For mutations, we would almost always have to parameterise the arguments! We would rarely, if ever, have a "hardcoded" mutation in our app. This is because the arguments of what data to capture, how to modify or delete something is usually dependent on some user action.

Now that we know how to parameterise using query variables, let's use that:

```gql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!) {
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

```js
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

We'll explore more mutations to update or delete data a little later. This is a good start to grokking mutations!

### Summary

- You can make basic GraphQL mutations
- You can pass dynamic arguments/data to mutations with query variables

Next, let's look at GraphQL subscriptions

## Watching data - Subscriptions

The GraphQL specification allows for something called subscriptions that are like GraphQL queries but instead of returning data in one read, you get data pushed from the server.

This is useful for your app to subscribe to "events" or "live results" from the backend, but while allowing you to control the "shape" of the event from your app.

GraphQL subscriptions are a critical component of adding realtime or reactive features to your apps easily. GraphQL clients and servers that support subscriptions are great because they allow you to build great experiences without having to deal with websocket code!

### Make your first GraphQL subscription

Step 1: Head to [https://hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

Step 2: Write this GraphQL query in the textarea:

```gql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```

Step 3: Click on the play button.

Every time the set of online users change, you'll see the latest set on the response window on the right.

### How do GraphQL subscriptions work?

GraphQL queries and mutations are strings sent to a POST endpoint. What is a GraphQL subscription? That can't happen over a POST endpoint, because a simple HTTP endpoint would just return the response and the connection would close.

**A GraphQL subscription is a subscription query string sent to a websocket endpoint**. And whenever data changes on the backend, new data is pushed over websockets from the server to the client.

### Summary

- You know how to make GraphQL subscriptions

Now that you're comfortable with the basics of using GraphQL, let's start integrating GraphQL APIs with an app!

# Hasura Backend Setup

The first step in the tutorial is to setup the backend with Hasura and create the necessary data models.

## Setup GraphQL Backend with Hasura

Let's start by deploying Hasura.

### One-click deployment on Heroku

The fastest way to try Hasura out is via Heroku.

Click [here](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) to deploy GraphQL Engine on Heroku with the free Postgres add-on

This will deploy Hasura GraphQL Engine on Heroku. A PostgreSQL database will be automatically provisioned along with Hasura. If you don’t have an account on Heroku, you would be required to sign up. Note: It is free to signup and no credit-card is required.

Type in the app name (e.g. `explore-hasura-apollo-nextjs` for this guide), select the region of choice and click on Deploy app button.

## Hasura Console

Once the app has been deployed, you can visit it at [https://explore-hasura-apollo-nextjs.herokuapp.com/console](https://explore-hasura-apollo-nextjs.herokuapp.com/console) - where `explore-hasura-apollo-nextjs` is replaced with the app name you provided in the step above.

## Apply database migrations

Let's get started by creating the tables and relationships for the Realtime todo app.

Download the hasura project with migrations from [here](https://hasura.io/learn/graphql/nextjs-fullstack-serverless/hasura.zip)

First, let's make sure that we have installed our dependencies for this project:

```sh
$ npm install
```

Configure the endpoint to point to the heroku app URL. Open the `hasura/config.yaml` file and set the endpoint value:

```yml
endpoint: https://explore-hasura-apollo-nextjs.herokuapp.com
```

Now let's apply the migrations:

```sh
$ cd hasura/
$ npx hasura migrate apply
```

This will create the tables and relationships for the slack app.

Great! Now navigate to the heroku app - [https://explore-hasura-apollo-nextjs.herokuapp.com](https://explore-hasura-apollo-nextjs.herokuapp.com) for my example - to access the Hasura console.

# Auth0 Setup

## Create Auth0 Application

- Navigate to the [Auth0 Dashboard](https://manage.auth0.com/)
- Signup / Login to the account
- Create a new tenant.
- Click on the `Applications` menu option on the left and then click the `+ Create Application` button.
- In the Create Application window, set a name for your application and select `Single Page Web Applications`. (Assuming the frontend app will be an SPA built on react/vue etc)
- In the `settings` of the application, we will add appropriate (e.g: http://localhost:3000/callback) URLs as `Allowed Callback URLs` and `Allowed Web Origins`. We can also add domain specific URLs as well for the app to work. (e.g: https://myapp.com/callback).

This would be the URL of the frontend app which you will deploy later. You can ignore this, for now. You can always come back later and add the necessary URLs.

## Create Auth0 API

We need to create an API on Auth0 so that we can make the accessToken a valid JWT.

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

Now in the pop-up that appears, give the name of the API and the identifier. We can technically give any value.

Let's say the name is `hasura` and the identifier is `https://hasura.io/learn`.

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

We can let the signing algorithm to be as it is. (RS256)

Click on Create once you are done.

## Custom Claims in Auth0 Rules

[Custom claims](https://auth0.com/docs/scopes/current/custom-claims) inside the JWT are used to tell Hasura about the role of the caller, so that Hasura may enforce the necessary authorization rules to decide what the caller can and cannot do. In the Auth0 dashboard, navigate to [Rules](https://manage.auth0.com/#/rules).

Add the following rule to add our custom JWT claims under `hasura-jwt-claim`:

```js
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";

  // NOTE: Previous examples referred to context.idToken[namespace]...Is this an error?
  context.accessToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

## Connect Hasura with Auth0

In this part, you will learn how to connect Hasura with the Auth0 application that you just created in the previous step.

We need to configure Hasura to use the Auth0 public keys. An easier way to generate the config for JWT is:

- Click on the following link - [https://hasura.io/jwt-config](https://hasura.io/jwt-config)
- For `Select Provider` choose `Auth0`
- Enter `Auth0 Domain Name` (e.g. `demo-explore-hasura-apollo-nextjs.us.auth0.com`)
- Click `Generate Config`

The generated configuration can be used as the value for environment variable `HASURA_GRAPHQL_JWT_SECRET`.

Since we have deployed Hasura GraphQL Engine on Heroku, let's head to Heroku dashboard to configure the admin secret and JWT secret.

Open the "Settings" page for your Heroku app, add a new Config Var called `HASURA_GRAPHQL_JWT_SECRET`, and copy and paste the generate JWT configuration into the value box.

Next, create a new Config Var called `HASURA_GRAPHQL_ADMIN_SECRET` and enter a secret key to protect the GraphQL endpoint. (Imagine this as the password to your GraphQL server).

Great! Now your Hasura GraphQL Engine is secured using Auth0.

## Sync Users with Rules

Auth0 has rules that can be set up to be called on every login request. We need to set up a rule in Auth0 which allows the users of Auth0 to be in sync with the users in our database. The following code snippet allows us to do the same. Again using the Rules feature, create a new blank rule `upsert-user` and paste in the following code snippet:

```js
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;

  // Modify with your Hasura admin secret and URL to the application
  const admin_secret = "demo";
  const url = "https://demo-explore-hasura-apollo-nextjs.us.auth0.com/v1/graphql";

  // Define your GraphQL mutation and query variables object
  const query = `mutation($userId: String!, $nickname: String) {
    insert_users(objects: [{
      id: $userId, name: $nickname
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`
  const variables = { "userId": userId, "nickname": nickname };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

Note: Modify `x-hasura-admin-secret` and `url` parameters appropriately according to your app. Here we are making a simple request to make a mutation into users table.

That’s it! This rule will now be triggered on every successful signup or login, and we insert or update the user data into our database using a Hasura GraphQL mutation.

The above request performs a mutation on the users table with the id and name values.

# Next.js Boilerplate Setup

For this tutorial, the GraphQL backend and the basic app UI is already ready. Our task will be to convert the "static" UI into a working realtime app in Next.js

## Download and run the boilerplate

1. Download the boilerplate from https://hasura.io/learn/graphql/nextjs-fullstack-serverless/boilerplate.zip
2. Unzip and make sure you're in the app-boilerplate directory
3. Install dependencies and run the "static" app

- `yarn install` **OR** `npm install`
- `yarn dev` **OR** `npm run dev`

## Configure the environment variables

Copy the `.env.example` to `.env` and configure the values for Auth0.

The `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_SECRET` are available in your Auth0 application settings and `SESSION_COOKIE_SECRET` can be any random string of at least 32 characters and it is used to encrypt the cookie.

```sh
DOMAIN=http://localhost:3000

# Auth0 API
AUTH0_AUDIENCE=

# Auth0 Application
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=BXyv4qDtBKYxJtLopfY7nj75sJg3p2Ka
```

This is what you should see after the steps above:

![https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

# Configure Apollo Client with Next.js

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

## React Apollo Hooks Installation

Let's get started by installing apollo client & peer graphql dependencies:

```sh
# Make sure you are in the app-boilerplate directory
$ npm i apollo-boost @apollo/react-hooks graphql apollo-link-ws subscriptions-transport-ws
```

## Create Apollo Client Instance

Now let's look at creating the Apollo Client Instance for the app. apollo-boost would have installed various dependencies that are used here.

Open `lib/apolloClient.js` and write the following code:

```js
import fetch from "isomorphic-unfetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import auth0 from "./auth0";
let accessToken = null;
const requestAccessToken = async () => {
  if (accessToken) return;
  const res = await fetch(`${process.env.APP_HOST}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};
// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});
const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: "https://explore-hasura-apollo-nextjs.herokuapp.com/v1/graphql",
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};
const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(
      "wss://explore-hasura-apollo-nextjs.herokuapp.com/v1/graphql",
      {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          await requestAccessToken(); // happens on the client
          return {
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          };
        },
      }
    )
  );
};
export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
```

Let's try to understand what is happening here.

## HttpLink and InMemoryCache

We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running on Heroku. So don't forget to change the uri to match your Hasura instance in Heroku.

At the end, we instantiate ApolloClient by passing in our HttpLink and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client. We are also determining the `ssrMode` and passing it to Apollo.

## WebSocketLink and Client Side

We are creating `WebSocketLink` to be used on the client side. The Authorization headers will be generated by making a request to Auth0 API from the client.

Next let's create the HOC `withApollo` that we will use inside our Next.js page to wrap our page component.

Open `lib/withApollo.js` and add the following code:

```js
import React from "react";
import App from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "./apolloClient";
import auth0 from "./auth0";
// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient = null;
/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
export const initOnContext = (ctx) => {
  const inAppContext = Boolean(ctx.ctx);
  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === "development") {
    if (inAppContext) {
      console.warn(
        "Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n" +
          "Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n"
      );
    }
  }
  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);
  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;
  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }
  return ctx;
};
async function getHeaders(ctx) {
  if (typeof window !== "undefined") return null;
  if (typeof ctx.req === "undefined") return null;
  const s = await auth0.getSession(ctx.req);
  if (s && s.accessToken == null) return null;
  return {
    authorization: `Bearer ${s ? s.accessToken : ""}`,
  };
}
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (initialState, headers) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, headers);
  }
  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers);
  }
  return globalApolloClient;
};
/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo = ({ ssr = true } = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client;
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      // client = initApolloClient(apolloState, undefined);
      client = initApolloClient(apolloState, {});
    }
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };
  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";
    WithApollo.displayName = `withApollo(${displayName})`;
  }
  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        null,
        await getHeaders(ctx)
      ));
      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }
      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }
        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }
          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }
      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();
      return {
        ...pageProps,
        apolloState,
      };
    };
  }
  return WithApollo;
};
```

Note the usage of `getHeaders` where we are making a request to Auth0 to retrieve the accessToken.

We are going to make use of this HOC inside our root page.

Open `pages/index.js` and update the export by adding `withApollo`:

```js
...
import { useFetchUser } from "../lib/user";
import { withApollo } from "../lib/withApollo";

...
export default withApollo()(IndexPage);
```

That's it. Our Next.js app is now configured with Apollo Client to talk to Hasura APIs.

# Queries

Let's integrate a GraphQL query to show the user their personal task list. We will learn the following concepts:

- Fetching data with queries
- Using the `useQuery` hook
- Handle loading/error state

Let's get started!

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
