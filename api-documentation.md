
# RESTful endpoints
`-POST /todos`
`-GET /todos`
`-GET /todos/:id`
`-PUT /todos/:id`
`-PATCH /todos/:id`
`-DELETE /todos/:id`


## POST /todos 
> Membuat todo
### _Request Header_
```
{
    "Content-Type": "application/json"
}
```    
### _Request Body_
```       
{
    "id":1,
    "title":"Nugas",
    "description:"Kelarin Challenge",
    "status:"Belum selesai",
    "due_data:"2020-09-29T12:17:16.572Z"
}
```
### _Response (201 - Created)_
```
{
    "id":1,
    "title":"Nugas",
    "description:"Kelarin Challenge",
    "status:"Belum selesai",
    "due_data:"2020-09-29T12:17:16.572Z",
    "createdAt":"2020-09-28T12:17:16.572Z",
    "updatedAt":"2020-09-28T12:17:16.572Z"
}
```
### _Response (400)_
```
{
    "message":"Invalid Request"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```



## GET /todos 
> Mengambil semua data todo
### _Request Header_
```
{
        
}
```
### _Requset Body_
```
{
    not needed
}
```
### _Responese (200)_
```
[
    {
        "id":1,
        "title":"Nugas",
        "description:"Kelarin Challenge",
        "status:"Belum selesai",
        "due_data:"2020-09-29T12:17:16.572Z",
        "createdAt":"2020-09-28T12:17:16.572Z",
        "updatedAt":"2020-09-28T12:17:16.572Z"
    }
]
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```


## GET /todos/:id
> Mengambil detail todo berdasarkan id
### _Request Header_
```
{

}
```    
### _Request Params_
```       
{
    "id":"1"
}
```
### _Request Body_
```       
{

}
```

### _Response (200)_
```
{
    "id":1,
    "title":"Nugas",
    "description:"Kelarin Challenge",
    "status:"Belum selesai",
    "due_data:"2020-09-29T12:17:16.572Z",
    "createdAt":"2020-09-28T12:17:16.572Z",
    "updatedAt":"2020-09-28T12:17:16.572Z"
}
```
### _Response (404)_
```
{
    "message:"error not found"
}
```

## PUT /todos/:id

### _Request Header_
```
{
    "Content-Type": "application/json"
}
```    
### _Request Params_
```       
{
    "id":"1"
}
```
### _Request Body_
```       
{
    "title":"Nugas Edit",
    "description:"Kelarin Challenge",
    "status:"Belum selesai",
    "due_data:"2020-09-30T12:17:16.572Z"
}
```
### _Response (200)_
```
{
    "title":"Nugas Edit",
    "description:"Kelarin Challenge",
    "status:"Belum selesai",
    "due_data:"2020-09-30T12:17:16.572Z",
    "createdAt":"2020-09-28T12:17:16.572Z",
    "updatedAt":"2020-09-29T12:17:16.572Z"
}
```
### _Response (404)_
```
{
    "message":"Error Not Found"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## PATCH /todos/:id
### _Request Header_
```
{
  "Content-Type": "application/json"
}
```  
### _Request Params_
```       
{
    "id":"1"
}
```  
### _Request Body_
```       
{
    "status":"Sudah Selesai"
}
```
### _Response (200)_
```
{
    "title":"Nugas Edit",
    "description:"Kelarin Challenge",
    "status:"Sudah selesai",
    "due_data:"2020-09-30T12:17:16.572Z",
    "createdAt":"2020-09-28T12:17:16.572Z",
    "updatedAt":"2020-09-29T12:17:16.572Z"
}
```
### _Response (404)_
```
{
    "message":"Error Not Found"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## DELETE /todos/:id
### _Request Header_
```
{

}
```  
### _Request Params_
```       
{
    "id":"1"
}
```
### _Request Body_
```       
{

}
```
### _Response (200)_
```
{
    "message":"ToDO success to delete"
}
```
### _Response (404)_
```
{
    "message":"Error Not Found"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```