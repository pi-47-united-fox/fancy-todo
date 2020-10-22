# fancy-todo
Membuat website untuk manage musik untuk hal- hal menarik yang akan dilakukan. This app has:

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
`- POST /register`
`- POST /login`
`- POST /googleLogin`

### GET /todos

> Get all assets fancy-todo

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
    "title": "Mendengarkan musik Barat",
    "description": "Hits musik by Artist",
    "status" : false,
    "due_date": "2020-10-30",
    "artist": "Taylor Swift",
    "UserId": 1
  },
  {
    "id": 2,
    "title": "Dengerin lagu galau",
    "description": "Setel musik hits buat galau galauin nih",
    "status" : false,
    "due_date": "2020-12-12",
    "artist": "Raisa",
    "UserId": 1
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
  "access_token": "<your access token>"
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
    "title": "Mendengarkan musik Barat",
    "description": "Hits musik by Artist",
    "status" : false,
    "due_date": "2020-10-30",
    "artist": "Taylor Swift",
    "link": "https//linklagunyadari3rdAPI.com",
    "image": "link image dari 3rd API",
    "song": "judul lagu dari 3rd API",
    "UserId": 1
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
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": 1,
  "title": "Mendengarkan musik Barat",
  "description": "Hits musik by Artist",
  "status" : false,
  "due_date": "2020-10-30",
  "artist": "Taylor Swift",
  "UserId": 1
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "Mendengarkan musik Barat",
  "description": "Hits musik by Artist",
  "status" : false,
  "due_date": "2020-10-30",
  "artist": "Taylor Swift",
  "link": "https//linklagunyadari3rdAPI.com",
  "image": "link image dari 3rd API",
  "song": "judul lagu dari 3rd API",
  "UserId": 1,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
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
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": 1,
  "title": "Mendengarkan musik Barat",
  "description": "Hits musik by Artist",
  "status" : false,
  "due_date": "2020-10-30",
  "artist": "Taylor Swift",
  "link": "https//linklagunyadari3rdAPI.com",
  "image": "link image dari 3rd API",
  "song": "judul lagu dari 3rd API",
  "UserId": 1,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (200 - OK)_
```json
{
  "id": 1,
  "title": "Mendengarkan musik Indonesia",
  "description": "Hits musik by Artist",
  "status" : false,
  "due_date": "2020-11-05",
  "artist": "Kangen Band",
  "link": "https//linklagunyadari3rdAPI.com",
  "image": "link image dari 3rd API",
  "song": "judul lagu dari 3rd API",
  "UserId": 1,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
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
  "access_token": "<your access token>"
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

### DELETE /todos/:id

> Delete asset fancy-todo by Id

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

### POST /register

> Create new asset fancy-todo

_Request Body_
```json
{
  "email": "todo@gmail.com",
  "password": "rahasia",
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "email": "todo@gmail.com"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### POST /login

> Create new asset fancy-todo


_Request Body_
```json
{
  "email": "todo@gmail.com",
  "password": "<your hash password from bcrypt>"
}
```

_Response (200 - AccessToken)_
```json
{
  "access_token": "<your token from jwt>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### POST /users/googleLogin

> Login Google Auth


_Request Body_
```json
{
  "email": "<your google mail account>",
  "password": "<your google mail password>"
}
```

_Response (200 - AccessToken)_
```json
{
  "access_token": "<your token from jwt>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```