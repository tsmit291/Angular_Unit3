## Using Angular with Express and Postgres to Persist Data

## Overview

So far, you've been using Angular all on its own, spinning up `html` files and
working with the client side only. This exercise introduces us to how
Angular can be integrated into a full stack application using Express and Postgres.

__What will our new file structure look like?__

```
├── bin
├── node_modules
├── public
    ├── images
    ├── index.html
    ├── javascripts
        ├── app.js
        ├── controllers
        └── services
    ├── stylesheets
        └── main.css
    └── views
├── routes
└── views
├── .gitignore
├── app.js
├── package.json

```

## Objectives
* Be able to CRUD from Angular to Postgres
* Be able to use Angular in a full stack application
* Know the difference between client side routes and server side routes
* Be able to send and recieve data by making api calls from your client side to your server side


### Set Up
1. New up an Express App named pirates
```sh
express pirates --git
cd pirates
npm install
```
1. Install Angular and Bootstrap using Bower
```sh
cd public/
bower init (just hit enter a few times)
bower install angular bootstrap --save
```

1. Set up your file structure (you should be in your public directory)
```sh
touch index.html
touch javascripts/app.js
mkdir javascripts/controllers
mkdir javascripts/services
mkdir views  
```

1. Wire it all up
  1. in `bower_components` grab the file paths for `bootstrap/dist/css/bootstrap.min.css`
  and `angular/angular.min.js` and add them to your `index.html`
    1. Add a simple bootstrap branding header to your app, replacing the image with a glyphicon of your choosing.

      __EXAMPLE:__
      ```html
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              <span class="glyphicon glyphicon-eye-close"></span>
            </a>
          </div>
        </div>
      </nav>
    ```
    1. Add a simple Angular expression to your `index.html`
    ```js
    {{ 1 + 3 }}
    ```
  1. `cd../` back up to your app's root directory
  1. start nodemon
  1. confirm that everything is wired up and then:
```sh
git status
git add -A
git commit -m "initial commit"
```

### Add an Angular Module and Wire Up a Controller
1. Name your angular app `ng-app='pirates'`
1. In `javascripts/app.js` instantiate your angular module `var app = angular.module('pirates', [])`
1. Create a `PiratesController`
  1. add a `$scope` variable to your controller and replace `{{ 1 + 3 }}` with your
  variable to confirm your controller is wired up.
1. What other steps do you need to take to wire up your new Angular module and controller?
1. Confirm that things are wired up:
```sh
git status
git add -A
git commit -m "instantiate pirates module"
```

### Using Partials and Routing

#### Part I - Partials
1. add `pirates.html` to your `public/views` directory
1. In `pirates.html` add `<h1>Pirates</h1>`

#### Part II - Routing in Angular
1. In your `public` directory `bower install angular-route --save`
1. Include the `angular-route.min.js` script in your `index.html`
1. add `ngRoute` to your app module `var app = angular.module('pirates', ['ngRoute'])`
1. Config your routes to render `pirates.html` when a user visits `/`
1. What else do we need to add to `index.html` for this to work?
1. Confirm that things are wired up:
1. `git status` `git add -A` `git commit -m "wire up angular routes"`

### Let's Check In

By now, you should have a basic Angular app that uses one controller and renders
one partial using angular-route ($routeProvider). If you're stuck, you can check
some of your files [here]('example_code.md') . BUT first _really_ try and debug
this yourself. Are there any helpful errors in the console? Read carefully.

## Setting Up Our Database

Remember the backend?? It's been a minute. Let's revisit.
We are going to use `knex` to connect to a local `postgres` database and seed some initial
data to get us up and running.

### Configuing our local postgres connection using knex
```sh
npm install --save knex pg
knex init
mkdir db
touch db/knex.js
```

Using `knex` config your app to a local `postgres` database called `pirates_development`

### Seeding the Database (write the code you wish to see)
Let's start with our seed file and let the errors guide our way to spinning up
the migration schema we need.

__#1 Create a `pirates` seed file with three objects with the following properties:__

Go to the `knex` docs and look up `seeds`. Run the command that will spin up a seed
file and directory for you. Then, add 3 objects with the following properties to your
seed file.

* name
* posion
* acessory

__EXAMPLE PIRATE OBJECT__

```js
{
  name: 'Anne Bonney',
  poison: 'Rum',
  accessory: 'hot temper'
  image_url: 'http://2.bp.blogspot.com/-WSKMEi_MH5U/U-AdUnMNuvI/AAAAAAAABI8/fv0BXLICx8c/s1600/Anne_Bonny_color.jpg'
}
```

__#2 Using error driven development to get us there__

We don't yet have a table or a schema for our seeds. But if we push forward our
error messages will tell us what our app needs and we can just give it what it wants.
This requires less thinking :)

Use the `knex` docs to look up the CLI command to seed your database. Then, follow the
error messages until you've successfully seeded your local database with 3 pirate
objects.

__NOTE:__ Your app should use migrations to spin up your schema and create your table.

__#3 Confirm__

Ok, go confirm that your database and seeds are set up just the way you want. How
can you do this?

```sh
pirates_development=# select * from pirates;
 id |      name       | poison  | accessory  | image_url      | created_at | updated_at | 
----+-----------------+---------+------------+----------------+-------------------------+
  1 | Anne Bonney     | Rum     | hot temper | some_image.jpg |            |
  2 | One Eyed Willie | Whiskey | eye patch  | some_image.jpg |            |
  3 | Blackbeard      | Rum     | peg leg    | some_image.jpg |            |
(3 rows)
```

__THEN:__
```sh
git status
git add -A
git commit -m "seed pirates"
```

### Displaying Pirates in the View

__Excellent. Now we're on to showing our pirats in `pirates.html`.__

Here's a checklist of the things we'll need to do to make this happen:

1. Make a call to an Express route and get all of our pirates
  * `$http` makes a client side request to an Express route
  * Express route makes a call to our database and sends a `json` response
2. Assign the response to a `$scope` variable that we can use in our view
3. In our view, iterate through our array of pirates and display the following:
  * name
  * title
  * author
  * description
  * created at
  * add some bootstrap along the way to make it look nice

Let's start from the top.

#### Step 1: Making a call to our Express route using an Angular Service

To keep things simple and just focus on the nuts and bolts here, we're going to
keep all of our code in `app.js`. Let's add a service that will make our database
call for us.

__NOTE__: Remember when you created functions outside of your Express routes
that made your database calls for you and just passed the response back to your
route? Using a service in Angular is similar, in that we do this to keep our code
neatly organized, practicing "single responsibility and separation of concerns".
There's also a concept in MVC of keeping your controllers "skinny". Do some Googling
later and read more about that.

__Adding a service to `app.js` - I'm going to give you this one for free__

```
app.factory('PostsService', function ($http) {
  return {
    all: function() {
      return $http.get('/api/posts').then(function (response) {
        return response.data;
      })
    }
  }
})

```

Ok, I gave you the code for free, but take a minute to look it over and really
see what's happening here. What does my `PostsService` do?

_No, seriously, what is it doing? I'll wait._

The truth is, our service isn't doing much, it's the function inside that's doing
all the heavy lifting. The service itself is simply returning an __object__. That
object has a __property__ on it whose __value__ is a __function__. That function is making
an __http request__ to our backend! And because this is a full stack app, we can just
make that call to `/api/posts` (or whatever your route is named). Isn't that nice
and clean? Our `all` function has one itty bitty responsibility - to go get all of our posts.

__Wait, what? We don't have an Express route called `/api/posts`__

You're right. Go make one. You've done this before. You're just back in your Express
routes making a call to your database and getting a response. But instead of rendering
a page, your going to send back `json`.

* Delete the `users.js` route, we're not going to use it.
* Rename `index.js` to `api.js`
* What changes do you need to make in your Express `app.js` to make this route a
working route. You've done this a million times by now.

__In `api.js`:__

* connect to your database (see `seed.js` if you need help)
* connect to our posts collection (see `seed.js` if you need help)
* add a get route for `/posts`
* make a call to your database and retrieve all of our posts (use a promise)
* then use `render.json(response)` to give the data to your front end.

__How do you know if you've done it right?__

Go to `http://localhost:3000/api/posts`. You should see a `json` object of your
posts.

#### Step 2: Assign the response to a `$scope` variable

Ok. We have a service that makes a call to our backend to get all of our posts
from the database. Now, let's use that service in our `PostsController` to serve
our posts to the view.

What we'll need to do:

* inject `PostsService` into our `PostsController` so we can use it
* call the `all` function in our controller to get the posts
* assign the result to a `$scope` variable so we can access our posts in the view

Right now, you're `PostsController` should look like this:

```
// app.js
app.controller('PostsController', function ($scope) {

})
```
Not much going on there, which is kind of nice. We can just focus on making this
one thing happen right now (getting the posts to our view!).

* Inject `PostsService` into our controller.
* Call the `all` function to retrieve our posts (use a promise here too)
  - __remember:__ Our service returns an _object_ that has a _property_ `all` that
  is a _function_. So, how do we call that function here?
* Declare a `$scope` variable called `posts` and set its value to the response
you get from calling the `all` function.

Ok, your controller should now look something like this:

```
// app.js

app.controller('PostsController', function ($scope, PostsService) {
  PostsService.all().then(function (posts) {
    $scope.posts = posts;
  })
})
```

__Confirm that your function is getting back the `json` response from your backend__

What's the simplest way to do this? `console.log` the response you're getting from
the invoked function and confirm that you've got your post objects.

#### Step 3: Iterate through our posts in the view

By now, you've done this many many times. The heavy lifting is done and all you
have to do is display the fruits of your labor.

__In our view, iterate through our array of posts and display the following:__
  * image
  * title
  * author
  * description
  * created at (remember, Angular has directives to help you format this)
  * add some bootstrap along the way to make it look nice


__NOTE:__ Notice how using a `seed.js` file helped us to get a lot of things up
and running in our app without having to have full CRUD functionality from the get go.

__How could you better organize this code now that you have an idea how things work and what you want to do?__

* in your `javascripts` directory `mkdir controllers`
* `touch controllers/posts_controller.js`
* in your `javascripts` directory `mkdir services`
* `touch services/posts_service.js`

__Now just move the chunks of code into their respective files and make sure everything still works. There's one detail left here that I haven't mentioned. I'll let you figure it out. If things aren't working, remember to go into your browser console and check for helpful errors.__

### Woo hoo! You've done it!

Ok, well sort of :D Let's keep going.

### Take what we've done so far and apply it. CRUD

We've already done READ. See if you can wire up the rest.

Here's your check list. All of this should be in your wheelhouse.

__1. Add a form so users can add new posts.__

__2. Send form data to your back end__
  * add another function to your PostsService that sends the data to an Express route.
    What's a good name for that function? How about `create`?
  * create an Express route. What `http` verb do we use to post data? What
    should the path be?

__Next, do delete or update. Stay calm and think things through. Have fun and explore.
Make mistakes and don't worry about them!__
