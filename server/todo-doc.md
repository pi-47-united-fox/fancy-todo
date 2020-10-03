
Anime Todo App
```json
    RESTful endpoint for Anime Todo app CRUD operation.
    JSON-formatted response.

 
RESTful Endpoints

## POST /register
## POST /login
## POST /googleLogin
## GET  /anime

## GET /travel 
## POST /travel
## GET /travel/:id
## PUT /travel/:id
## DELETE /travel/:id


##POST /register 

        Request Header

            Not Needed

        Request Body

        {
            "email": "ridwan@mail.com",
            "password": 123456, 
        }

        Response (200)

        {
            "id": 1,
            "name": "Ridwan",
            "email": "ridwan@mail.com",
        }

        Response (400 - Bad Request)

        {
        "message": "Invalid request."
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

##POST /login 

        Request Header

            Not Needed

        Request Body

        {
            "email": "ridwan@mail.com",
            "password": 123456, 
        }

        Response (200)

        {
            "access_token"
        }

        Response (400 - Bad Request)

        {
        "message": "Invalid request."
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }


##POST /googleLogin

        Request Header

            Not Needed

        Request Body

            Not Needed

        Response (200)

        {
            "access_token"
        }
    
        Response (404 - Unauthorized)

        {
        "message": "you are not authorized"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

## GET  /anime

        Request Header

          {
            "access_token"
          }

        Request Body

            Not Needed

        Response (200)

        {
            "title": "Naruto",
            "description": "Anime Naruto",
            "due_date": "2020-11-20",
            "status": "On Progress"
        }

        Response (404 - Not Found)

        {
        "message": "not found"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }


##GET /todos


        Request Header

        {
        "access_token": "<access_token>"
        }

        Request Body

        not needed

        Response (200)

        [
            {
                "id":1,
                "title": "Naruto",
                "description": "Anime Naruto",
                "due_date": "2020-11-20",
                "status": "On Progress"
            },
            {
                "id":2,
                "title": "One Piece",
                "description": "Anime one piece",
                "due_date": "2020-11-20",
                "status": "On Progress"
            }
        ]

        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (404 - not Found)
        {
        "message": "Not Found"
        }
        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

##POST /todos


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Body

        {
            "title": "Naruto",
            "description": "Anime Naruto",
            "due_date": "2020-11-20",
            "status": "On Progress"
        }

        Response (201 - Created)

        {
            "id":1,
            "title": "Naruto",
            "description": "Anime Naruto",
            "due_date": "2020-11-20",
            "status": "On Progress",
            "UserId": "given by access token.id"
        }

        Response (400)
        {
        "message": "Validation Error"
        }
        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

## GET /todos/:id


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Response (200)

        {
            "id":1,
            "title": "Naruto",
            "description": "Anime Naruto",
            "due_date": "2020-11-20",
            "status": "On Progress",
            "UserId": "given by access token.id"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (404)
        {
        "message": "Error. Not found."
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##PUT /todos/:id

        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Request Body

        {
            "title": "Boruto",
            "description": "Anime Baruto",
            "due_date": "2020-11-20",
            "status": "On Progress",
            "UserId": "given by access token.id"
        }

        Response (200)

        {
            "id": 1,
            "title": "Boruto",
            "description": "Anime Baruto",
            "due_date": "2020-11-20",
            "status": "On Progress",
            "UserId": "given by access token.id"
        }

        Response (400)
        {
        "message": "Validation Error"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }

        Response (404)

        {
        "message": "Error. Not found."
        }

        Response (403)

        {
        "message": "You dont have access"
        }

        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##PATCH /todos/:id

        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Request Body

        {
            "status": "Watched",
        }

        Response (200)

        {
            "id": 1,
            "title": "Boruto",
            "description": "Anime Baruto",
            "due_date": "2020-11-20",
            "status": "Watched",
            "UserId": "given by access token.id"
        }

        Response (400)
        {
        "message": "Validation Error"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }

        Response (404)

        {
        "message": "Error. Not found."
        }

        Response (403)

        {
        "message": "You dont have access"
        }

        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }



##DELETE /todos/:id


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Response (200)
        {
            "message": "Anime has been deleted successfully."
        }

        Response (400)
        {
        "message": "Validation Error"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }

        Response (404)

        {
        "message": "Error. Not found."
        }

        Response (403)

        {
        "message": "You dont have access"
        }

        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

