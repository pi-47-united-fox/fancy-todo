## Restful Endpoints
` - GET /todos `
` - POST /todos `
` - GET /todos/:id `
` - DELETE /todos/:id `
` - PUT /todos/:id `
` - PATCH /todos/:id `


## GET /todos
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
not needed

- Response(200)
[
    {
        "id": 1,
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "status": "Uncompleted"
        "due_date": "2020-09-29",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    },
    {
        "id": 2,
        "title": "Berburu Brontosaurus",
        "description": "Berburu brontosaurus, menggunakan DIY kapak dari batu meteor.",
        "due_date": "2020-01-29",
        "status": "Completed",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    }
]
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}

## POST /todos
- Request header:
{
    "access_token": "<your access token>"
}

- Request body
    {
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "due_date": "2020-09-29",
    }

- Response(200)
    {
        "id": 1,
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "status": "Uncompleted",
        "due_date": "2020-09-29"
    }
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}


## GET /todos/:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
id = +req.params.id

- Response(200)
{
    "id": 1,
    "title": "Memandikan Tyrex",
    "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
    "status": "Uncompleted",
    "due_date": "2020-09-29",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}

- Response (400 - Bad Request)
{
  "message": "Validation Error"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}

## DELETE /todos/:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
id = +req.params.id

- Response(200)
{ 
    "message": "Delete success"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}

- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}


## PUT /todos:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body
    {
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "status": "Uncompleted"
        "due_date": "2020-09-29",
    }

- Response(200)
    {
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "status": "Uncompleted",
        "due_date": "2020-09-29"
    }
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}

- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}


## PATCH /todos:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body
    {
        "status": "Completed"
    }

- Response(200)
    {
        "title": "Memandikan Tyrex",
        "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
        "status": "Completed",
        "due_date": "2020-09-29"
    }
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}

- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}



## USERS ====================================================

## POST /register
- Request header:
{
    "Content-type": "application/json"
}

- Request body
    {
        "email": "hawk@aulia.com",
        "password": "123456"
    }

- Response(200)
    {
        "id": 1,
        "email": "aulia@hakim.com"
    }

- Response (400 - Bad Request)
{
  "message": "Invalid request"
}

## POST /login
- Request header:
{
    "Content-type": "application/json"
}

- Request body
    {
        "email": "aulia@hakim.com",
        "password": "123456"
    }

- Response(200)
    {
        "id": 1,
        "email": "aulia@hakim.com"
    }

- Response (400 - Bad Request)
{
  "message": "Invalid request"
}

## GET /users/:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
id = +req.params.id

- Response(200)
[
  {
    "id": 1,
    "title": "Memandikan Tyrex",
    "description": "Jadwalnya memandikan tyrex, jangan lupa menggosok gigi.",
    "status": "Uncompleted",
    "due_date": "2020-09-29",
    "UserId: 1
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "Memberi makan Tyrex",
    "description": "Jadwalnya kasih makan tyrex, jangan lupa menggosok gigi setelahnya.",
    "status": "Uncompleted",
    "due_date": "2020-09-29",
    "UserId: 1
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]

- Response (400 - Bad Request)
{
  "message": "Validation Error"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}




