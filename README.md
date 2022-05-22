******************************************** NETFLIX BACKEND APP *****************************************

Created the API for a Netflix App

Building the Backend using NodeJS + Express.

BACKEND WITH FULL CRUD OPERATION

/media
POST Media
GET Media (list) (reviews included)
GET Media (single) (with reviews)
UPDATE Media
DELETE Media

POST Poster to single media
/media/:id/poster

THE REVIEW OPERATION

/media/:id/reviews

POST Review to media

DELETE Review of media

Export single media as PDF with reviews
/media/:id/pdf

Search media by title (if it's not found in your search in OMDB and sync with your database) UsING Axios


Example:

Searching for Movie Title

exists in my media.json ?

    return movie in response

else

    search that query (batman) in omdbapi

        exist in omdb ?

            put in media.json (push inside of our collection)

            return in response

        else

            return not found

DEPLOYED USING HEROKU

Link : https://netflix-backend-md5.herokuapp.com/media
