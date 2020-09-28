# fancy-todo
Membuat website untuk manage hal- hal menarik yang akan dilakukan. This app has:

* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
`- GET /todos`
`- GET /todos/:id`
`- POST /todos`
`- PUT /todos/:id`
`- PATCH /todos/:id`
`- DELETE /todos/:id`

### GET /todos

> Get all assets fancy-todo

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "Belajar coding",
    "description": "Mengikuti lecture dan menyelesaikan challenge",
    "status" : false,
    "due_date": "2020-09-30",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Ishoma",
    "description": "Kembalikan energi untuk bisa menyelesaikan coding",
    "status" : false,
    "due_date": "2020-09-30",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### GET /todos/:id

> Get asset fancy-todo by Pk

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```
_Request Params_
```json
{
  "id": "1"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "Belajar coding",
    "description": "Mengikuti lecture dan menyelesaikan challenge",
    "status" : false,
    "createdAt": "2020-09-30",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```

### POST /todos

> Create new asset fancy-todo

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```json
{
  "title": "Livecode",
  "description": "Ujian untuk dapat lulus dari hacktiv",
  "status": false,
  "due_date": "2020-09-30"
}
```

_Response (201 - Created)_
```json
{
  "id": 3,
  "title": "Livecode",
  "description": "Ujian untuk dapat lulus dari hacktiv",
  "status": false,
  "due_date": "2020-09-30",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### PUT /todos/:id

> Put asset fancy-todo by Id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```json
{
  "title": "Livecode",
  "description": "Ujian untuk dapat lulus dari hacktiv",
  "status": false,
  "due_date": "2020-09-30"
}
```

_Response (200 - OK)_
```json
{
  "title": "Belajar Livecode",
  "description": "Review dan belajar untuk livecode",
  "status": false,
  "due_date": "2020-03-20T07:15:12.149Z",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Request"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### PATCH /todos/:id

> Patch asset fancy-todo by Id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```json
{
  "status": false
}
```

_Response (200 - OK)_
```json
{
  "status": true,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Request"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### DELETE /todos/:id

> Delete asset fancy-todo by Id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Params_
```json
{
  "id": 1
}
```

_Response (200 - OK)_
```json
{
  "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```