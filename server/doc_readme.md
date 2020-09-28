# Fancy Todo App Server
Fancy Todo App is an application to manage your task. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
## TOC
<!-- TOC -->

- [Fancy Todo App Server](#fancy-todo-app-server)
  - [TOC](#toc)
  - [RESTful endpoints](#restful-endpoints)
    - [GET /todos](#get-todos)

<!-- /TOC -->

&nbsp;

## RESTful endpoints

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