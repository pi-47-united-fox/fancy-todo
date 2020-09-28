# fancy-todo
Membuat website untuk manage hal- hal menarik yang akan dilakukan
```json

RESTful endpoints
JSON formatted

## RESTful End

GET /todos:
    -   Request header: 
    -   Request body: 
            Not Needed
    -   Response (200):
        ```json
            [
               {
                    "id": 1,
                    "name": "Learn API",
                    "description": "Belajar API",
                    "status": "uncompleted",
                    "due_date": "2020-03-20T07:15:12.149Z",
                    "createdAt": "2020-03-20T07:15:12.149Z",
                    "updatedAt": "2020-03-20T07:15:12.149Z",
                },
                {
                    "id": 2,
                    "name": "Learn write documentation",
                    "description": "nulis dokumentasi",
                    "status": "uncompleted",
                    "due_date": "2020-03-20T07:15:12.149Z",
                    "createdAt": "2020-03-20T07:15:12.149Z",
                    "updatedAt": "2020-03-20T07:15:12.149Z",
                }
            ]
    
    - Response (404 - Not found):
        {
            "message": "Invalid request"
        }

POST /todos :

    -   Request header: 
    -   Request body: 
            {
                "name": "Learn API",
                "description": "API",
            }
    -   Response (201 - Created):
        ```json
            [
               {
                    "id": 1,
                    "name": "Learn API",
                    "description": "API",
                    "status": "uncompleted",
                    "due_date": "2020-03-20T07:15:12.149Z",
                    "createdAt": "2020-03-20T07:15:12.149Z",
                    "updatedAt": "2020-03-20T07:15:12.149Z",
                }
            ]
    
    - Response (404 - Not Found):
        {
            "message": "Not found"
        }

GET /todos/:id:
    -   Request header: 
    -   Request parameter: 
            [
               {
                    "id": 1,
                }
            ]
    -   Response (200):
        ```json
            [
               {
                    "id": 1,
                    "name": "Learn API",
                    "description": "Belajar API",
                    "status": "uncompleted",
                }
            ]
    
    - Response (404 - not found):
        {
            "message": "Invalid request"
        }

PATCH /todos/:id :

    -   Request header: 
    -   Request parameter: 
            [
               {
                    "id": 1,
                }
            ]
    -   Req body: 
            [
               {
                    "name": "Learn API",
                    "description": "Belajar API",
                    "status": "completed",
                }
            ]
    -   Response (200):
        ```json
            [
                {
                    "massage": "Edit Success"
                }
            ]
    
    - Response (404 - not found):
        {
            "message": "Invalid request"
        }

DELETE /todos/:id :
    -   Request parameter: 
    [
        {
            "id": 1,
        }
    ]

    - Response (200):
        [
            {
                "massage": "Delete Success"
            }
        ]

    - Response (404):
        [
            {
                "massage": "Not Found"
            }
        ]

    