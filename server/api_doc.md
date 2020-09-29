<h1 style="text-align: center"> Fancy Todo App Server </h1>
Fancy Todo App is an application to manage your task. This app has :

- RESTful endpoint for Todo's CRUD operation
- RESTful endpoint for Users's CR operation
- JSON formatted response

<!-- &nbsp; -->
<!-- ---
# TOC

--- -->

&nbsp;

# RESTful endpoints

## Todo
### GET /todos
> Get all todos data (datatype array - of object)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

<!-- b. _Request Body_
```json
not needed
``` -->

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "Learn NodeJS",
    "description": "Learn Node JS from Udemy Course",
    "status": "finished",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "PR on Fancy Todo",
    "description": "Open an PR to complete task in pi-47-united-fox",
    "status": "unfinished",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error "
}
```

### GET /todos/:id
> Get todos data by id (datatype object)

_Request Params_
```json
{
  "id": "1"
}
```

<!-- b. _Request Body_
```json
not needed
``` -->

_Response (200)_
```json
{
    "id": 1,
    "title": "Learn NodeJS",
    "description": "Learn Node JS from Udemy Course",
    "status": "unfinished",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error not found"
}
```

---

### POST /todos/

> Create new list of todo

<!-- _Request Header_
```json
{
  "access_token": "<your access token>"
}
``` -->

_Request Body_
* validate : tidak bisa input 'due_date' melebihi hari ini
```json
{
  "title": "Learn Socket",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
}
```

_Response (202 - OK)_
```json
{
  "id": 3,
  "title": "Learn Socket",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
  "status": "unfinished",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```


---

### PUT /todos/:id

> Replace todo (data) by id from input user

_Request Params_
```json
{
  "id": 3
}
```

_Request Body_
```json
{
  "title": "Learn Socket YT",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
  "status": "unfinished"
}
```

_Response (200 - OK)_
```json
{
  "title": "Learn Socket YT",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### PATCH /todos/:id

> Modify todo (data) by id from input user

_Request Params_
```json
{
  "id": 3
}
```

_Request Body_
```json
{
  "status": "finished"
}
```

_Response (200 - OK)_
```json 
{
  "id": 3,
  "title": "Learn Socket YT",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
  "status": "finished",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### DELETE /todos/:id

> Delete todo from the list by id

_Request Params_
```json
{
  "id": 3
}
```

_Response (200 - OK)_
<!-- * Jika mau membalikkan data yang dihapus -->
<!-- ```json
{
  "id": 3,
  "title": "Learn Socket YT",
  "description": "Watch tutorial from youtube about socket",
  "due_date": "2020-10-20T07:15:12.149Z",
  "status": "finished",
  "createdAt": "2020-10-20T07:15:12.149Z",
  "updatedAt": "2020-10-20T07:15:12.149Z",
}
``` -->
<!-- * hanya membalikkan message saja tanpa data -->
```json
{
  "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

## User
### POST /register

> Create User by min requirement `(email, password)`

_Request Body_
* validate : tidak bisa input 'due_date' melebihi hari ini
```json
{
  "email": "random-sample-mail@mail.com",
  "password": "thisMustBePassword123"
}
```

_Response (202 - OK)_
```json
{
  "id": 4,
  "email": "random-sample-mail@mail.com",
  "password": "$2a$10$9rtP9xtcj9y0fNb6GdCWy.ZdHbOQwE.ysvQm8JgfJWtuugNhnoXxS",
  "updatedAt": "2020-09-28T13:30:00.213Z",
  "createdAt": "2020-09-28T13:30:00.213Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /login

> Find User by requirement `(email, password)`

_Request Body_
* validate : tidak bisa input 'due_date' melebihi hari ini
```json
{
  "email": "random-sample-mail@mail.com",
  "password": "thisMustBePassword123"
}
```

_Response (202 - OK)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYW5kb20tc2FtcGxlLW1haWxAbWFpbC5jb20iLCJpYXQiOjE2MDEyOTk2ODN9.16x-3S2zGwLkBhB0IK44fr9fIpgO_i4iozPadlsIKdA"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```