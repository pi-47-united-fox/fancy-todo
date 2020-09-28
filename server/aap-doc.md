# Fancy Todo App Server
Fancy Todo App is an application to manage your activity. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos
> Get all assets

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "title" : "makan",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03"
}

```

_Response (201)_
```json

  {
    "id" : 1,
    "title" : "makan",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  

```

_Response (400 - Invalid Input)_
```
{
  "message": "Invalid validation errors"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Invalid validation errors"
}
```
---
### GET /todos

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Response (200-)_
```json
[
{
    "id" : 1,
    "title" : "makan",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
},

{
    "id" : 2,
    "title" : "<input_title>",
    "description" : "<input_decription>",
    "status" : "<input_status>",
    "due_date" : "<input_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },

]
```

_Response (500 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
### GET /todos/:id
> Get all assets

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```json

{
    "id" : 1,
    "title" : "makan",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03"
}

```

_Response (404)_
```json
{
  "message": "error not found"
}
```
---
### PUT /todos/:id
> Get all assets

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "title" : "minum",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03"
}

```

_Response (200)_
```json

  {
    "id" : 1,
    "title" : "minum",
    "description" : "makan siang bareng temen",
    "status" : false,
    "due_date" : "2020-10-03",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Invalid validation errors"
}
```

### PATCH /todos/:id
> Get all assets

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "status" : true,  
}

```

_Response (200)_
```json

  {
    "id" : 1,
    "title" : "minum",
    "description" : "makan siang bareng temen",
    "status" : true,
    "due_date" : "2020-10-03",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Invalid validation errors"
}
```

---
### DELETE /todos/:id

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Response (200-)_
```json

{
    "message" : "todo"
},


```

_Response (404 - Bad Request)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "error not found"
}
```



