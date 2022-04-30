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

# Project Planning

## Roles (not strict)

1. Front end lead: Zack Barbari
2. Back end lead: Zhehao Wang
3. Database lead: Zhenkai Zhu
4. Maps and Graphics: Rachel Thomas/David Karash
5. Documentation: David Karash

## Group Meeting 1
Discuss general project idea, settle on dashboard/pandemic tracker
Assign rough roles to group
General planning for where we should start working

## Group Meeting 2 (Check-in)
Met with Sam (TA) to discuss our ideas and scope of the project
Approved project ideas
Questions: 
How could we use a database/login info for this project in a useful way?
Ideas: visual preferences, email notifs, location preferences
What do we want to do about diseases that have limited information?
Ideas: continue looking but may be able to leave blank for now

## Group Meeting 3
Schedule conflicts/last minute things meant this meeting only half happened but Rachel/David/Zhenkai discussed where to go next and things to work on