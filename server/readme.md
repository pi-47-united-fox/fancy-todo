# Todo-RestAPI
My Todo App is an application to manage your schedule. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register
> regist new user
_Request Header_
```
{
  "Content-Type": "application/json"
}
```
_Request Body_
```
{
  "fullname":"<name to get insert into>"
  "email":"<email to get insert into>"
  "password":"<password to get insert into>"
}
```
<b> Success Response :</b>

_Response (201 - Created)_
```
{
  "id":"<id of the new user>"
  "fullname":"<name of the new user>"
  "email":"<email of the new user>"
}
```

<b> Error Response :</b>

_Response (400 - Bad Request)_
```
{
  "message": "Validation errors"
}
```

### POST /login
> logging in as registered user
_Request Header_
```
{
  "Content-Type": "application/json"
}
```
_Request Body_
```
{ 
  "email":"<email to login>"
  "password":"<password to login>"
}
```
<b> Success Response :</b>

_Response (200 - Ok)_
```
{
  "access_token":"<access_token>" 
}
```

<b> Error Response :</b>

_Response (400 - Bad Request)_
```
{
  "message": "Email or Password Error"
}
```


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
<b> Success Response :</b>

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

<b> Error Response :</b>

_Response (400 - Bad Request)_
```
{
  "message": "Validation errors"
}
```

_Response (500 -  Internal Server Error)_
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

<b> Success Response :</b>

_Response (200 - Ok)_
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

<b> Error Response :</b>

_Response (500 - Internal Server Error)_
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

<b> Success Response :</b>

_Response (200 - Ok)_
``` 
{
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
} 
```

<b> Error Response :</b>

_Response (404 - Bad Request)_
```
{
  "message": "Not Found"
}
```

---
### PUT /todos/:id

> Update todo

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
``` 
{ 
    "title": "<posted new title>",
    "description": "<posted new description>",
    "status": "<posted news tatus>",
    "due_date": "<posted new due_date>"
} 
```

<b> Success Response :</b>

_Response (200 - Created)_
``` 
{
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
} 
```
<b> Error Response :</b>

_Response (400 - Bad Request)_
```
{
    "message": "Validation Error"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{ 
    "message": "Internal server error"
}
```

---
### PATCH /todos/:id

> Update todo

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{  
    "status": "<posted new status>"
}
```
<b> Success Response :</b>

_Response (200 - Ok)_
```
{
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

<b> Error Response :</b>

_Response (400 - Bad Request)_
```

{
    "message": "Validation Error
}

```
_Response (404 - Not Found)_
```

{
    "message": "Not Found"
}

```
_Response (500 - Internal Server Error)_
```

{ 
    "message": "Internal server error"
}

```

---
### DELETE /todos/:id
> Delete Todos

_Request Body_
```
Not needed
```
<b> Success Response :</b>
_Response (200 - Ok)_
```
{
    "message": "todo success to delete"
}
```

<b> Error Response :</b>

_Response (404 - Not Found)_
```
{
    "message": "not found"
}
```
_Response (500 -  Internal Server Error)_
```
{
    "message": "Internal server error"
}
```