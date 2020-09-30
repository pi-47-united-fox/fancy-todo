
Fancy todo app is a newer and fancier way to arrange todo list inputted by users. This app has the following features:
```json
    RESTful endpoint for todo's CRUD operation.
    JSON-formatted response.

 
RESTful Endpoints

    GET /todos
    POST /todos
    GET /todos/:id
    PUT /todos/:id
    PATCH /todos/:id
    DELETE /todos/:id

GET /todos

    Get all todos

Request Header

{
  "access_token": "<access_token>"
}

Request Body

not needed

Response (200)

[
    {
        "id": 1,
        "title": "Boku No Hero Academia",
        "description": "nonton habis kelar tugas",
        "status": "unwatched",
        "due_date": "2020-10-10",
    },
    {
        "id": 2,
        "title": "Naruto",
        "description": "anime tentang ninja",
        "status": "unwathched",
        "due_date": "2020-10-10"
    }
]

Response (400 - Bad Request)

{
  "message": "Invalid request."
}

Response (500 - Internal Server Error)

{
  "message": "Internal Server Error."
}

POST /todos

    Create a new todo

Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
    "title": "One Piece",
    "description": "anime bajak laut",
    "status": "unwatched",
    "due_date": "2020-10-10",
    
}

Response (201 - Created)

{
    "id": <given by the system>,
    "title": "One Piece",
    "description": "anime bajak laut",
    "status": "unwatched",
    "due_date": "2020-10-10",
    "UserId": "given by access token.id"
}

Response (500 - Internal Server Error)

{
  "message": "Internal Server Error."
}

GET /todos/:id

    Get a particular todo from a given id

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
    "id": 1,
    "title": "Make a todo app",
    "description": "Make a fancy app for the first portofolio",
    "status": "on progress",
    "due_date": "3 October 2020"
}

Response (404)

{
  "message": "Error. Not found."
}

PUT /todos/:id

    Update the whole attributes of a particular todo from a given id

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
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "done",
    "due_date": "2 October 2020"
}

Response (200)

{
    "id": 1,
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "done",
    "due_date": "2 October 2020"
}

Response (400)

{
  "message": "Validation error."
}

Response (500 - Internal Server Error)

{
  "message": "Internal Server Error."
}

PATCH /todos/:id

    Update the whole attributes of a particular todo from a given id

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
    "status": "on progress",
}

Response (200)

{
    "id": 1,
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "on progress",
    "due_date": "3 October 2020"
}

Response (400)

{
  "message": "Validation error."
}

Response (500 - Internal Server Error)

{
  "message": "Internal Server Error."
}

DELETE /todos/:id

    Delete a particular todo from a given id

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
    "message": "A todo has been deleted successfully."
}

Response (404)

{
  "message": "Error. Not found."
}

Response (500 - Internal Server Error)

{
  "message": "Internal Server Error."
}