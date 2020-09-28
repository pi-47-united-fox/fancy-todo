# Fancy TODO App Server

Fancy TODO App is an application to manage your day to day activity. This app has :

-   RESTful endpoint for asset's CRUD operation
-   JSON formatted response

&nbsp;

## RESTful endpoints

### GET /todos

> Get all todos

_Request Header_

```
not needed
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
        "due_date": "<todo due date>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due date>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (500 - Bad Request)_

```
not needed
```

---

### GET /todos/:id

> Get Todo Based on id

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": <id that match params>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (404 - Not Found)_

```
{
    "message": "Not Found"
}
```

---

### POST /todos

> Create A Todo

_Request Header_

```
{
    "Content-Type": "application/json"
}
```

_Request Body_

```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (201 - Created)_

```
{
    "id": <given id by system>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
{
    "message": "<validation error message>"
}
```

_Response (500 - Internal Server Error)_

```
not needed
```

---

### PUT /todos/:id

> UPDATE title, description, status, due_date of Todo BASED on id

_Request Header_

```
{
    "Content-Type": "application/json"
}
```

_Request Body_

```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (200)_

```
{
    "id": <id that match params>,
    "title": "<updated todo title>",
    "description": "<updated todo description>",
    "status": "<updated todo status>",
    "due_date": "<updated todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_

```
{
    "message": "<validation error message>"
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
not needed
```

---

### PATCH /todos/:id

> UPDATE status of Todo BASED on id

_Request Header_

```
{
    "Content-Type": "application/json"
}
```

_Request Body_

```
{
    "status": "<todo status>"
}
```

_Response (200)_

```
{
    "id": <id that match params>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<updated todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_

```
{
    "message": "<validation error message>"
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
not needed
```

---

### DELETE /todos/:id

> Delete Todo Based on id

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "todo success to delete"
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
not needed
```

---
