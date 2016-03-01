# Securing Your Single Page App with JSON Web Tokens

## Introduction to Token Authentication

Now that we are getting more comfortable building APIs and Angular apps, its time that we added authentication to the mix. But before we continue on, answer the following questions.

1. What is authentication?
2. What is authorization?
3. How have you previously implemented authentication?

For that last answer you probably thought about implementing cookies and sessions, which is a great method of implementing auth for a multi-page web app. However it falls short when designing for a multi-client API.

But before we go into that, lets talk about tokens.

### What is a token?

Simply put, a token is a thing that is used as an identifier. Make sense? Lets try again but using a story.

> The King gave the Herald his signet ring made of pure jade.

> "When you find my sister, give her this ring", he said, a serious look on his face. "It shall prove that you carrying a message from me.".

Basically, the ring is a token. It is used as a device to ensure that the message is from the true source instead of an enemy.

### But why do we need tokens?

We need to design a system where we can allow authenticated users from any kind of device (iOS, Android, Web App) to access our API.

At first it would seem that cookies would work here just like it does for any other web app that we have built. Unfortunately, while cookies work great on web apps, they are not so good with iOS and Android apps. This is the main reason to use tokens.

There is another reason, Horizontal Scaling. This involves adding more copies of your API server to handle an increase of users/traffic.

### What kind of token to use?

Since tokens are just things that should be unique and difficult to replicate, there are several choices when it comes to creating them. However one choice is currently the top one. JSON Web Tokens, or JWTs (pronounced jots) for short.

The [main webpage for jwts](http://jwt.io) has more information on what they are, and how they can be useful. However that site is not the easiest to digest. Scotch.io has a good tutorial on [what jwts are](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token).

**Read both of the linked pages and then answer the following questions before moving on.**

1. In your own words, what is a JWT?
2. What are two methods of securing an API? What are the pros and cons of each method?
3. What three parts comprise the structure of a JWT?
4. What data goes in the header?
5. What is a claim? Compare and contrast reserved, and private claims.
6. What is the signature? What stops someone from just making up their own JWT and gaining access to your site?
7. What is a HTTP header?
8. What is Cross-Origin Resource Sharing? Why is this not a problem when using JWTs?

## How to use a JWT

Now that we know what a JWT is, we can begin to secure our API with them. Here are the steps that you need to complete to secure an API with tokens. Note that this is for authentication, we are not covering authorization here.

**Login logic (API perspective)**

1. If the username and password is correct, generate a token
2. Save the token in the database
3. Send the token along with any other information that the client may need to the requestor in a JSON object.

**Middleware logic for protecting a route**

1. Extract the JWT from the headers
2. Verify that the JWT is good. If it is not then send an authentication error back to the client.
2. Get the user info from the database that corresponds to the JWT.
3. If you could not find the JWT in the database, send a unauthenticated error
3. If you got here, then the JWT is good, let the user on in.

**Logout logic**

1. Upon logout, delete the token in the database.

Note that the only new thing here is that you are storing the token in the database and checking that instead of the session. Everything else is very similar to how you implemented cookie-based authentication.

**Exercise**

Create a Express based CRUD API for a library with the following routes. Note that we have not yet built the Angularjs front-end for this api, you will only be able to test it with POSTMAN or some other tool.

To create the JWTs, use the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package.

1. Users should be able to create an account with a username and password, they will get back a token.
2. Users should be able to login with their username and password. In return they will get a token.
3. Users should be able to log out.
4. Logged in users can create a book object. The book object will have a title and an author.
5. Logged in users can edit the book object.
7. Logged in users can get one book.
8. Logged in users can delete a book.
9. Anyone can get all book objects.

## Using JWT protected APIs with Angular

Now that you have a fully working API that is protected with JWTs, it is time for us to create an Angularjs front-end that will use that API.

In general, here is how authentication works with Angular.

1. User fills out a login (or create account) form.
2. On submit, an HTTP request is sent to the API. If the user provided data is good, then a token is returned.
3. The token should be stored in local storage so that the user does not have to log in every time they restart their browser.
4. On every http request, the token should be retrieved and added to the headers.
5. If the token is ever not present for a route that the user needs to be logged in to see, redirect the user to the login route.
6. If the API ever responds with an unauthenticated error, send the user back to the login route.
7. When the user logs out, send them back to the login route.

Lets look at what is required for each of these steps. But first, create a basic angular app with a routing system and the folling routes.

1. login / create account
2. view all books
3. view one book
3. edit a book

Once you have the skeleton of the app up and running, its time to wire everything up.

### Login form

Here is what needs to happen when the user creates an account or logs in.

1. The controller will use the auth service to send an HTTP POST request to the appropriate API endpoint.
2. If the return status is an error, display the error to the user and let them try again.
3. Otherwise, take the JWT that was returned and use the local storage service to store the token in local storage.
5. Redirect the user to the dashboard (the view all books route)

There is a lot of stuff going on here. What you will have to do is create an auth service that includes the method logIn(username, password) that returns a promise.

You will also need to create the local storage service with getter and setter methods. This service can be used for more than storing the users token, but for now that is what we are using it for.

To find out how to manipulate Local Storage, check out the [documentation on MDN](localstorage).

## View all books

For this route, anyone can see the list of books. Do a HTTP request to get the list of books and display them to the screen.

## View one book

The same thing here for one book. Send a GET HTTP request to get the one book that the user wants to see and display it to the screen.

## Edit a book

Here is where auth comes in again. When this route loads, check to make sure that there is a token in local storage using your service.

If there is no token, then display an appropriate error message.

Otherwise display the edit form, and allow the user to make any changes they want.

When they click the save button, send the HTTP request with the token and appropriate changes to the book in question. If the server responds with a 200 status request, then the change was successful!

The documentation for adding a header is on the [$http documentationn page](https://docs.angularjs.org/api/ng/service/$http) under the title **Setting HTTP Headers**.

However if there was an unauthenticated error, delete the token from local storage and redirect the user to the login route.

## Delete a book

Add a button to the book profile page that will allow a logged in user to delete the book. However do not display the button if they are not logged in.

## Logout button

Create a custom directive to display a logout button.

Your directive can have a controller, which means that it can access your auth and local storage services. Use them to determine if the button should be displayed or hidden.

when the button is clicked, use the auth service to send an HTTP request (with the token in the header) to log the user out. Don't forget to delete the token from local storage when successful.

When the user has logged out, send the user to the login route.

# Congrats!

You have created a full-stack application that can scale up to multiple API servers, along with multiple types of clients.

## If you want to learn more

Research the following technologies and answer the following questions below.

* [angular interceptors for $http](https://docs.angularjs.org/api/ng/service/$http)
* [resolve for ngRoute](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider)

1. How can interceptors be used in your app?
2. What benefit would interceptors give you for authentication?
3. What is resolve used for?
4. How could you use resolve for authentication?

## Bonus

* Make the JWT expire after a certain amount of time (lets say 10 days, but the number could be anything)
* Refactor your app to use interceptors to send the jwt tokens in every $http request instead of manually adding them in the auth service.
* Use resolve with ngRoute to not allow users to access the edit book route at all if they are not authenticated.
