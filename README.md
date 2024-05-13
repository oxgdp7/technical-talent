# technical-talent

This project is intended to be used by recruiters to screen potential
applicants. The user is asked to choose from a selection of blobs:

![Drag and drop screen](https://github.com/oxgdp7/technical-talent/assets/72282582/8fdd6fec-eead-4632-a326-d72a863e64c1)

Then, the game plays out. The player can see this by looking at the animation
screen:

![Blobs standing in a field, some are sleeping, others are working](https://github.com/oxgdp7/technical-talent/assets/72282582/d136b9db-4184-49d7-a2c9-8d7d03a37978)

Once the user has chosen their input, they will submit this to the server which
will calculate their score. This will be displayed to the recruiter:

![Recruiter portal showing players' scores](https://github.com/oxgdp7/technical-talent/assets/72282582/805c7c4e-465d-430f-8923-c2ea3b81cf5e)

There is also a screen to display visualisations of this:

![Frequency chart of player scores and pie chart of whether players have been emailed](https://github.com/oxgdp7/technical-talent/assets/72282582/4e62a6c7-dba1-4941-81ac-020633373ef2)

## Recruiter Page

To run the recruiters page, first run:
### `python app.py --start`

(To restart the server, run:)
### `python app.py`

Which initalises all the databases. Then, run:

### `flask --app recruiterpage run --debug -p 8000`

The username is "username" and password is "password"

Run `test_data.py` to add dummy data to the DB for the recruiter webpage.

You may need to install packages by running
### `pip install -r requirements.txt`

## Game

You will need to download node js first. Then, in the game folder run:
### `npm install`

To install all packages and then run:
### `yarn start`

To get the login system to work, you will need to add a .env file to the game/
directory and add:
### `REACT_APP_GOOGLE_CLIENT_ID={A valid google cloud ID}`

## Adding new levels

To add a new level, first create a new level files in game/src/pages (copy and
paste level1 and change the level argument) and then fill out game/src/levels
with the details you want. Refer to the level1 comments for help.

Then, to let this level be accessed, you will need to add it to game/src/app.js,
copying level1 as before. To add a button that lets you select it, you will need
to again copy the format for level1 in game/src/components/NavBar.js.

To add the level to the backend, you will need to go to logic/levels.py and
copy the template from level1 (remember to ensure the values are the same as for
the js files).
