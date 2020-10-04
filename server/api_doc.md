# fancy-todo

####
GET /todos
Get all todos

Request Header
not needed

Request Body

not needed

Response (200)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  },
  {
     "id": 2,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (400 - Bad Request)

{
  "message": "Invalid request"
}

####
POST /todos
create todos

Request Header
not needed

Request Body
```json
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

Response (201)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (500 - Bad Request)

{
  "message": "Invalid request"
}

####
GET /todos/:id
find todo by Id

Request Header
not needed

Request Body
not needed


Response (200)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (500 - Bad Request)

{
  "message": "Invalid request"
}

####
PUT /todos/:id
edit all attributes by id

Request Header
not needed

Request Body
```json
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```


Response (201)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (500 - Bad Request)

{
  "message": "Invalid request"
}

PATCH /todos/:id
edit "status" by id

Request Header
not needed

Request Body
```json
{
    "status": "<todo status>"
}
```


Response (201)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (500 - Bad Request)

{
  "message": "Invalid request"
}

####
DELETE /todos/:id
delete todo by id
Request Header
not needed

Request Body
not needed


Response (201)

```json
[
  {
    "id": 1,
    "title": "Belajar REST API",
    "description": "belajar menggunakan rest api",
    "due_date": 10-10-2020 
  }
]
```
Response (500 - Bad Request)

{
  "message": "Invalid request"
}

