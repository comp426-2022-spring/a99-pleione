# ENDPOINTS

# server.js

1. `/` is the home landing page when the site is run, greeting the user and prompting them to login.  Clicking login will take them to `/login`
2. `/login` Prompts the user for a username and password, or offers registration if they do not have an account.  Posting to login with invalid credentials will tell the user that their login failed and prompt them to try again.
3. `/home` is the main landing page for the site, user is given access once they successfully login.