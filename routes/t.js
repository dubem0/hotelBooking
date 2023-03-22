how do i store user id after login on the browser express node and ejs

In order to store the user ID after login on the browser using Express, Node, and EJS, you can use cookies or sessions.

Here's an example of how to implement it using cookies:

Install the cookie-parser middleware using npm:
Copy code
npm install cookie-parser
Require the cookie-parser and add it to your Express app:
javascript
Copy code
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
Set the cookie with the user ID when the user logs in:
javascript
Copy code
app.post('/login', (req, res) => {
  // authenticate user

  const userId = 123; // replace with actual user ID

  res.cookie('userId', userId);

  res.redirect('/dashboard');
});
Retrieve the user ID from the cookie on subsequent requests:
javascript
Copy code
app.get('/dashboard', (req, res) => {
  const userId = req.cookies.userId;

  // retrieve user data using the user ID

  res.render('dashboard', { user });
});
Note that cookies can be modified by the client, so it's important to validate the user ID on the server side to ensure that the user is authorized to access the requested resources.

Alternatively, you can use sessions to store the user ID. Here's an example of how to implement it using the express-session middleware:

Install the express-session middleware using npm:
Copy code
npm install express-session
Require the express-session middleware and add it to your Express app:
javascript
Copy code
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'mysecret', // replace with a secret key
  resave: false,
  saveUninitialized: true
}));
Set the user ID in the session when the user logs in:
javascript
Copy code
app.post('/login', (req, res) => {
  // authenticate user

  const userId = 123; // replace with actual user ID

  req.session.userId = userId;

  res.redirect('/dashboard');
});
Retrieve the user ID from the session on subsequent requests:
javascript
Copy code
app.get('/dashboard', (req, res) => {
  const userId = req.session.userId;

  // retrieve user data using the user ID

  res.render('dashboard', { user });
});



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="main-form">
        <form action="/auth" class="form" method="POST">
            <p class="heading">Signup</p>
            <input type="text" name="username" id="username" class="input" placeholder="Username">
            <input type="password" name="password" id="password" class="input" placeholder="Password">
            <input type="email" name="email" id="email" class="input" placeholder="email">
            <input type="tel" name="phone" id="phone" pattern="(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}(?!\d)" class="input" placeholder="Phone">
            <button class="btn" type="submit">Signup</button>
        </form>
        <a href="/login">Already have an account? login</a>
    

    </div>
</body>
</html>