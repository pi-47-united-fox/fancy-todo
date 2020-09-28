# Todos App Server
Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
` - GET /todos `
` - POST /todos `
` - GET /todos/:id `
` - PUT /todos/:id `
` - PATCH /todos/:id `
` - DELETE /todos/:id `

### GET /todos

> Get all todos

_Request Body_
```json
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": "on going",
    "do_date": "2020-09-28",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Makan",
    "description": "Mengisi perut yang mulai keroncongan",
    "status": "on going",
    "do_date": "2020-09-28",
    "createdAt": "2020-09-28T07:15:12.149Z",
    "updatedAt": "2020-09-28T07:15:12.149Z",
  }
]
```

_Response (500 - Failed Request)_
```json
{
  "message": "failed request"
}
```
---

### POST /todos

> Create new todos

_Required_
 - validasi tidak boleh memasukan tanggal yang sudah lewat dari hari ini

_Request Body_
```json
{
  "title": "Solat",
  "description": "Mengerjakan kewajiban sebagai Muslim",
  "status": "on going",
  "due_date": "2020-09-28"
}
```

_Response (201 - Created)_
```json
{
  "id": 3,
  "title": "Solat",
  "description": "Mengerjakan kewajiban sebagai Muslim",
  "status": "on going",
  "due_date": "2020-09-28",
  "createdAt": "2020-09-28T07:15:12.149Z",
  "updatedAt": "2020-09-28T07:15:12.149Z",
}
```

_Response (400 - Error validation)_
```json
{
  "message": "validation errors"
}
```

_Response (500 - Server Problem)_
```json
{
    "message": "Server Error"
}
```
---
### GET /todos/:id

> Find todo by id

_Request Params_
```json
{
    "id": 1
}
```

_Request Body_
```json
not needed
```

_Response (200 - Finded)_
```json
{
    "id": 1,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": "on going",
    "do_date": "2020-09-28",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (500 - failed request)_
```json
{
    "message": "failed request"
}
```

---
### PUT /todos/:id

> Update todo by id

_Request Params_
```json
{
    "id": 2
}
```

_Request Body_
```json
{
    "title": "Makan",
    "description": "Mengisi perut yang mulai keroncongan",
    "status": "on going",
    "do_date": "2020-09-28"
}
```

_Response (200 - Updated)_
```json
{
    "id": 1,
    "title": "Makan",
    "description": "Sudah kenyang",
    "status": "done",
    "do_date": "2020-09-28",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```


_Response (400 - validation errors)_
```json
{
    "message": "tanggal tidak boleh lewat dari hari ini"
}
```


_Response (404 - not found)_
```json
{
    "message": "todo not found"
}
```

_Response (500 - server error)_
```json
{
    "message": "server error"
}
```

### PATCH /todos/:id

> Update todo by id

_Request Params_
```json
{
    "id": 3
}
```

_Request Body_
```json
{
    "status": "on going",
}
```

_Response (200 - Updated)_
```json
{
    "id": 3,
    "title": "Solat",
    "description": "Mengerjakan kewajiban sebagai Muslim",
    "status": "done",
    "due_date": "2020-09-28",
    "createdAt": "2020-09-28T07:15:12.149Z",
    "updatedAt": "2020-09-28T07:15:12.149Z",
}
```


_Response (400 - validation errors)_
```json
{
    "message": "tanggal tidak boleh lewat dari hari ini"
}
```


_Response (404 - not found)_
```json
{
    "message": "todo not found"
}
```

_Response (500 - server error)_
```json
{
    "message": "server error"
}
```
### DELETE /todos/:id

> Delete todo by id

_Request Params_
```json
{
    "id": 1
}
```

_Request Body_
```json
not needed
```

_Response (200 - Deleted)_
```json
{
    "message": "todo succes to delete"
}
```

_Response (404 - not found)_
```json
{
    "message": "todo not found"
}
```

_Response (500 - server error)_
```json
{
    "message": "server error"
}
```

### POST /register

> Register user

_Request Body_
```json
{
    "email" : "ibx@hacktiv8.com",
    "password" : "123456"
}
```

_Response (201)_
```json
[
  {
    "id": 1,
    "email" : "ibx@hacktiv8.com"
  }
]
```

_Response (400 - errors)_
```json
{
  "message": "errors"
}
```
---

### POST /login

> Login user

_Request Params_
```json
{
    "email" : "ibx@hacktiv8.com"
}
```

_Request Body_
```json
{
    "email" : "ibx@hacktiv8.com",
    "password" : "123456"
}
```

_Response (200)_
```json
[
  {
    "access_token" : "<access_token>"
  }
]
```

_Response (401 - errors)_
```json
{
  "message": "errors"
}
```
---
