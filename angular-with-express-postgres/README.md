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
