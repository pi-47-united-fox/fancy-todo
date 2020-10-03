# Fancy Todo
Fancy todo app is a newer and fancier way to arrange todo list inputted by users.
This app has the following features:
* RESTful endpoint for todo's CRUD operation.
* JSON-formatted response.

&nbsp;

## RESTful Endpoints
- POST /login
- POST /register
- POST /googleLogin
- GET /todos
- POST /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos/:id
- PUT /todos/:id/music

### POST /register 

_Request Header_
```
Not Needed
```
_Request Body_
```json
    {
        "email": "safrul@mail.com",
        "password": 123456, 
    }
```
_Response (200)_
```json
    {
        "id": 1,
        "email": "safrul@mail.com",
    }
```
_Response (400 - Bad Request)_
```json
    {
    "message": "Invalid request."
    }
```
_Response (500 - Internal Server Error)_
```json
    {
    "message": "Internal Server Error."
    }
```
### POST /login 

_Request Header_
```
Not Needed
```
_Request Body_
```json
  {
      "email": "safrul@mail.com",
      "password": 123456, 
  }
```
_Response (200)_
```json
  {
    "access_token"
  }
```
_Response (400 - Bad Request)_
```json
  {
  "message": "Invalid request."
  }
```
Response (500 - Internal Server Error)
```json
  {
  "message": "Internal Server Error."
  }
```

### POST /googleLogin

_Request Header_
```
Not Needed
```
_Request Body_
```
Not Needed
```
_Response (200)_
```json
{
  "access_token"
}
```
_Response (404 - Unauthorized)_
```json
{
  "message": "you are not authorized"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```
### GET /todos
> Get all todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "title": "Make a todo app",
        "description": "Make a fancy app for the first portofolio",
        "status": "on progress",
        "due_date": "3 October 2020"
    },
    {
        "id": 2,
        "title": "Sleep",
        "description": "Should you fancy a nap",
        "status": "on progress",
        "due_date": "28 September 2020"
    }
]
```
_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request."
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### POST /todos
> Create a new todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```json
{
    "title": "Eat some meals",
    "description": "Pizzas for lunch and dinner",
    "status": "on progress",
    "due_date": "3 October 2020"
}
```

_Response (201 - Created)_
```json
{
    "id": <given by the system>,
    "title": "Eat some meals",
    "description": "Pizzas for lunch and dinner",
    "status": "on progress",
    "due_date": "3 October 2020"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### GET /todos/:id
> Get a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 1
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "Make a todo app",
    "description": "Make a fancy app for the first portofolio",
    "status": "on progress",
    "due_date": "3 October 2020"
}
```

_Response (404)_
```json
{
  "message": "Error. Not found."
}
```
### PUT /todos/:id
> Update the whole attributes of a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 1
}
```

_Request Body_
```json
{
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "done",
    "due_date": "2 October 2020"
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "done",
    "due_date": "2 October 2020"
}
```

_Response (400)_
```json
{
  "message": "Validation error."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### PATCH /todos/:id
> Update only 'status' attributes of a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 1
}
```

_Request Body_
```json
{
    "status": "on progress",
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "status": "on progress",
    "due_date": "3 October 2020"
}
```

_Response (400)_
```json
{
  "message": "Validation error."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### DELETE /todos/:id
> Delete a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 1
}
```

_Response (200)_
```json
{
    "message": "A todo has been deleted successfully."
}
```

_Response (404)_
```json
{
  "message": "Error. Not found."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```
### PUT /todos/:id/music
> Update only 'track' attributes of a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 1
}
```

_Request Body_
```json
{
    "track": "retrieved from 3rd party API",
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "Create a todo app",
    "description": "Create a fancy todo app this week!",
    "track": "retrieved from 3rd party API",
    "status": "on progress",
    "due_date": "3 October 2020"
}
```

_Response (400)_
```json
{
  "message": "Validation error."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```