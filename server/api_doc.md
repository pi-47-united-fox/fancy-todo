# My Fancy ToDo Server
My Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
- 'POST /todos'
- 'GET /todos'
- 'GET /todos/:id'
- 'PUT /todos/:id'
- 'PATCH /todos/:id'
- 'DELETE /todos/:id'


### POST /todos

> Create new todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020",
}
```

_Response (201 - create)_
```json
{
    "id": 1,
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020" ,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### GET /todos

> get all todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "have a breakfast" ,
    "description": "no carbo",
    "status": false,
    "due_date": "1 Oktober 2020",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
    },
    {
    "id": 2,
    "title": "go to office" ,
    "description": "bike to work",
    "status": false,
    "due_date": "1 Oktober 2020",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
    }
]
```

_Response (500 - Internal Server Error)_

```

### GET /todos/:id

> find by Id

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

_Response (200)_
```json
{
  "id": 1,
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_

### PUT /todos/:id

> update/replace todo

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


_Response (200)_
```json
{
  "id": 1,
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (500 - Internal Server Error)_
```

### PATCH /todos/:id

> update/modify todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Params_
```json
{
    "status": false
}

_Response (200)_
```json
{
  "id": 1,
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Bad request)_
```json
{
  "message": "Validation errors"
}
```

_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_


### DELETE /todos/:id

> Delete Todo

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

_Response (200)_
```json
{
  "id": 1,
  "title": "have a breakfast" ,
  "description": "no carbo",
  "status": false,
  "due_date": "1 Oktober 2020",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```


_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_







