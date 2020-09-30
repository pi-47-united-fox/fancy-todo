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
{
    "access_token": "<access token>"
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
        "due_date": "<todo due date>",
        "UserId: "<creator user id>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due date>",
        "UserId: "<creator user id>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

---

### GET /todos/:id

> Get Todo Based on id

_Request Header_

```
{
    "access_token": "<access token>"
}
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
    "UserId: "<creator user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

---

### POST /todos

> Create A Todo

_Request Header_

```
{
    "Content-Type": "application/json",
    "access_token": "<access token>"
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
    "UserId: "<creator user id>",
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
{
    "message": "<error messages>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

---

### PUT /todos/:id

> UPDATE title, description, status, due_date of Todo BASED on id

_Request Header_

```
{
    "Content-Type": "application/json",
    "access_token": "<access token>"
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
    "UserId: "<creator user id>",
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

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

---

### PATCH /todos/:id

> UPDATE status of Todo BASED on id

_Request Header_

```
{
    "Content-Type": "application/json",
    "access_token": "<access token>"
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
    "UserId: "<creator user id>",
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

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

---

### DELETE /todos/:id

> Delete Todo Based on id

_Request Header_

```
{
    "access_token": "<access token>"
}
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

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

---

### POST /register

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
    "email": "<user email>",
    "password": "<user password>",
    "first_name": "<user first name>",
    "last_name": "<user last name>",
    "gender": "<user gender>"
}
```

_Response (201 - Created)_

```
{
    "id": <given id by system>,
    "email": "<user email>"
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
{
    "message": "<error messages>"
}
```

---

### POST /login

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
    "email": "<user email>",
    "password": "<user password>",
}
```

_Response (201 - Created)_

```
{
    "access_token": "<generated accesss token>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "<Invalid email or password>"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

---

### GET /jikan/search

> Search manga through jikan API

_Request Header_

```
{
    "access_token": "<access token>",
    "Content-Type": "application/json"
}
```

_Request Body_

```
{
    "title": "<search query>"
}
```

_Response (200)_

```
[
    {
        "title": "<Manga title>",
        "image_url": "<Manga image link>",
        "score": <Manga score>,
        "synopsis": "<Manga description>"
    },
    {
        "title": "<Manga title>",
        "image_url": "<Manga image link>",
        "score": <Manga score>,
        "synopsis": "<Manga description>"
    }
]
```

_Response (500 - Internal Server Error)_

```
{
    "message": "<error messages>"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "You do not have access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Data Not Found"
}
```
