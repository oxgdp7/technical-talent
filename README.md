# technical-talent

This project is intended to be used by recruiters to screen potential
applicants. The user is asked to choose from a selection of blobs:

![Drag and drop screen](https://private-user-images.githubusercontent.com/72282582/327816740-26f8c052-d287-4cc2-969a-39d5f537dd22.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ3NTMxNzksIm5iZiI6MTcxNDc1Mjg3OSwicGF0aCI6Ii83MjI4MjU4Mi8zMjc4MTY3NDAtMjZmOGMwNTItZDI4Ny00Y2MyLTk2OWEtMzlkNWY1MzdkZDIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTAzVDE2MTQzOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI0ZjllZmY0MWU4YTc2MzdmMjZiMDIwNjY4MTNjZjBiZmY4ZGJmOWY2NjFmOTMxY2E2NzI2Y2QxOGJhNjhjOTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.rnBUa8qtnTnaUGzp_BHFzfNssNiGmRD6W2pvVd_7E1w)

Then, the game plays out. The player can see this by looking at the animation
screen:

![Blobs standing in a field, some are sleeping, others are working](https://private-user-images.githubusercontent.com/72282582/327816903-fb02ffbb-d442-47fe-82ea-9de6a3bde960.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ3NTMxNzksIm5iZiI6MTcxNDc1Mjg3OSwicGF0aCI6Ii83MjI4MjU4Mi8zMjc4MTY5MDMtZmIwMmZmYmItZDQ0Mi00N2ZlLTgyZWEtOWRlNmEzYmRlOTYwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTAzVDE2MTQzOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTAxNjk3M2YzYWNkNjQ5Mjg0NDBlOGU3YjY2YTkyYThiNzk3ODk4MDU4NDM3OWYzODk5OGRlM2MwOWUxNWIwZmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.b_dygdRY9bxpwt7BOU5NokrDtuNCG8QOv9VlYJVRqHk)

Once the user has chosen their input, they will submit this to the server which
will calculate their score. This will be displayed to the recruiter:

![Recruiter portal showing players' scores](https://private-user-images.githubusercontent.com/72282582/327819424-e703eb45-500a-497c-9002-62ed79034fbb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ3NTM2MTYsIm5iZiI6MTcxNDc1MzMxNiwicGF0aCI6Ii83MjI4MjU4Mi8zMjc4MTk0MjQtZTcwM2ViNDUtNTAwYS00OTdjLTkwMDItNjJlZDc5MDM0ZmJiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTAzVDE2MjE1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ1ZmIzZDcwY2RkM2EwZjJkOTdjYWRmOTY1OWNkZGQ3ZDJlYmJiMDk5NjBhN2FjMjc4OTg5ODEzNmY1ZGM1MjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.hQsrzaa0jGscVexdQM3unQmF0JM-NeNVlz3y_gSNCjM)

There is also a screen to display visualisations of this:

![Frequency chart of user score and pie chart of whether players have been emailed](https://private-user-images.githubusercontent.com/72282582/327819424-e703eb45-500a-497c-9002-62ed79034fbb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQ3NTM2MTYsIm5iZiI6MTcxNDc1MzMxNiwicGF0aCI6Ii83MjI4MjU4Mi8zMjc4MTk0MjQtZTcwM2ViNDUtNTAwYS00OTdjLTkwMDItNjJlZDc5MDM0ZmJiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTAzVDE2MjE1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ1ZmIzZDcwY2RkM2EwZjJkOTdjYWRmOTY1OWNkZGQ3ZDJlYmJiMDk5NjBhN2FjMjc4OTg5ODEzNmY1ZGM1MjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.hQsrzaa0jGscVexdQM3unQmF0JM-NeNVlz3y_gSNCjM)

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
