# Todo-RestAPI
My Todo App is an application to manage your schedule. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints


### POST /todos

> Create new todos

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation errors"
}
```

_Response (500)_
```
{
    "message": "Internal server error"
}
```
---

### GET /todos

> Get all todos

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500)_
```
{
    "message": "Internal server error"
}
```
---

### GET /todos/:id

> Get todo

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - Bad Request)_
```
{
  "message": "Not Found"
}
```

---
### PUT /todos/:id

> Put todo

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  { 
    "title": "<posted new title>",
    "description": "<posted new description>",
    "status": "<posted news tatus>",
    "due_date": "<posted new due_date>"
  }
}
```

_Response (200)_
```
[
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (400)_
```
[
  {
    "message": "Validation Error
  }
]
```
_Response (404)_
```
[
  {
    "message": "Not Found"
  }
]
```
_Response (500)_
```
[
  { 
    "message": "Internal server error"
  }
]
```

---
### PATCH /todos/:id

> Put todo

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  {  
    "status": "<posted new status>"
  }
}
```

_Response (200)_
```
[
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (400)_
```
[
  {
    "message": "Validation Error
  }
]
```
_Response (404)_
```
[
  {
    "message": "Not Found"
  }
]
```
_Response (500)_
```
[
  { 
    "message": "Internal server error"
  }
]
```

---
### DELETE /todos/:id
> Delete Todos

_Response (200)_
```
[
    {
        "message": "todo success to delete"
    }
]
```
_Response (404)_
```
[
    {
        "message": "not found"
    }
]
```
_Response (500)_
```
[
    {
        "message": "Internal server error"
    }
]
```