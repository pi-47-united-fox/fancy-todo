# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status" : "<status to get insert into>",
  "due_date" : "<date given by system>"

}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation errors"
}
```

_Response (500 - INTERNAL SERVER ERROR)_
```json
{
  "message": "errors status code 500"
}
```

### GET /todos

> Get all assets

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
    "title": "<asset name>",
    "description": "<asset description>",
    "status": "<asset description>",
    "due_date": "<asset description>"
  }
]
```

_Response (500 - Internal Server Errors)_
```json
{
  "message": "errors status code 500"
}
```
---

### GET /todos/:id

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  {
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status" : "<status to get insert into>",
  "due_date" : "<date to get insert into>"
  }
```

_Response (200)_
```json
[
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
]
```

_Response (404 - Not Found)_
```json
{
  "message": "errors not found"
}
```
---

### PUT /todos/:id

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  {
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status" : "<status to get insert into>",
  "due_date" : "<date to get insert into>"
  }
```

_Response (200)_
```json
[
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
]
```

_Response (400 - Not Found)_
```json
{
  "message": "validation errors"
}

_Response (404 - Not Found)_
```json
{
  "message": "errors not found"
}
```

_Response (500 - Internal Server Errors)_
```json
{
  "message": "errors status code 500"
}
```
---

### PATCH /todos/:id

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  {
  "status" : "<status to get insert into>"
  }
```

_Response (200)_
```json
[
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
]
```

_Response (400 - Not Found)_
```json
{
  "message": "validation errors"
}

_Response (404 - Not Found)_
```json
{
  "message": "errors not found"
}
```
### DELETE /todos/:id

> Get all assets

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
  "message" : "todo success to delete"
}
]
```
_Response (404 - Not Found)_
```json
{
  "message": "errors not found"
}
```
_Response (500 - Internal Server Errors)_
```json
{
  "message": "errors status code 500"
}
```
---