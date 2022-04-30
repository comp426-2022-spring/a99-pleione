# ENDPOINTS

## server.js

1. `/` is the home landing page when the site is run, greeting the user and
   prompting them to login.  Clicking login will take them to `/login`

2. `/login` Prompts the user for a username and password, or offers
   registration if they do not have an account.  Posting to login with
   invalid credentials will redirect to `/wrongPW`

3. `/home` is the main landing page for the site, user is given access once
   they successfully login.

4. `/wrongPW` users will be redirected here if they enter an invalid login,
   and will be prompted to try again or register.  

5. `/register` is used to register a new user with the database.  If the user
   tries to create a username that already exists, they will be redirected to
    `/error` to try again.

6. `/error` used if a user tries to register a username that already exists
   in the database.  Prompts them to try again with a different user.