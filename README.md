# technical-talent

## Recruiter Page

To run the recruiters page, first run:
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

## Adding new levels

To add a new level, first create a new level files in game/src/pages and then
fill out the level with the details you want. Use level1 as a template for this
as it contains comments and explanations of certain things.

Then, to let this level be accessed, you will need to add it to game/src/app.js,
copying level1 as before. To add a button that lets you select it, you will need
to again copy the format for level1 in game/src/components/NavBar.js.

To add the level to the backend, you will need to go to logic/levels.py and
copy the template from level1 (remember to ensure the values are the same as for
the js files).
