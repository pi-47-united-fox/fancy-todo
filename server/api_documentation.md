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
  "access_token": "<your access token>",
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

### POST /register

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
  "username": "<name to get insert into>",
  "email": "<email to get insert into>",
  "password" : "<password to get insert into>"

}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "username": "<name to get insert into>",
  "email": "<email to get insert into>",
  "password" : "<password to get insert into>",
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

### POST /login

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
  "email": "<email to get insert into>",
  "password" : "<password to get insert into>"

}
```

_Response (201 - Created)_
```json
{
   "acess_token": "<jwt acess token user>"
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

### GET //resto?search=query

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>",
  "api-key" : "<api key for access>"
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
   "restaurant": {
            "R": {
                "has_menu_status": {
                    "delivery": -1,
                    "takeaway": -1
                },
                "res_id": 7411048,
                "is_grocery_store": false
            },
            "apikey": "fb21e803d67c86145e20b125d10b05fa",
            "id": "7411048",
            "name": "Mie Cakalang",
            "url": "https://www.zomato.com/jakarta/mie-cakalang-lebak-bulus?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
            "location": {
                "address": "Pasar Karinda, Jl. Karang Tengah Raya No. 4, Lebak Bulus, Jakarta",
                "locality": "Pasar Karinda, Lebak Bulus",
                "city": "Jakarta",
                "city_id": 74,
                "latitude": "-6.3059770000",
                "longitude": "106.7820940000",
                "zipcode": "",
                "country_id": 94,
                "locality_verbose": "Pasar Karinda, Lebak Bulus, Jakarta"
            },
            "switch_to_order_menu": 0,
            "cuisines": "Bakmi, Manado",
            "timings": "10 AM to 8 PM",
            "average_cost_for_two": 75000,
            "price_range": 1,
            "currency": "IDR",
            "highlights": [
                "Breakfast",
                "Dinner",
                "No Alcohol Available",
                "Takeaway Available",
                "Lunch",
                "Cash",
                "Indoor Seating"
            ],
            "offers": [],
            "opentable_support": 0,
            "is_zomato_book_res": 0,
            "mezzo_provider": "OTHER",
            "is_book_form_web_view": 0,
            "book_form_web_view_url": "",
            "book_again_url": "",
            "thumb": "https://b.zmtcdn.com/data/pictures/8/7411048/9a398cf86f23d2c35db2345318db48b1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
            "user_rating": {
                "aggregate_rating": "3.4",
                "rating_text": "Average",
                "rating_color": "CDD614",
                "rating_obj": {
                    "title": {
                        "text": "3.4"
                    },
                    "bg_color": {
                        "type": "lime",
                        "tint": "500"
                    }
                },
                "votes": 10
            },
            "all_reviews_count": 4,
            "photos_url": "https://www.zomato.com/jakarta/mie-cakalang-lebak-bulus/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
            "photo_count": 30,
            "menu_url": "https://www.zomato.com/jakarta/mie-cakalang-lebak-bulus/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
            "featured_image": "https://b.zmtcdn.com/data/pictures/8/7411048/9a398cf86f23d2c35db2345318db48b1.jpg",
            "has_online_delivery": 0,
            "is_delivering_now": 0,
            "store_type": "",
            "include_bogo_offers": true,
            "deeplink": "zomato://restaurant/7411048",
            "is_table_reservation_supported": 0,
            "has_table_booking": 0,
            "events_url": "https://www.zomato.com/jakarta/mie-cakalang-lebak-bulus/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
            "phone_numbers": "021 7693029, 0816 985415, 0812 89692511",
            "all_reviews": {
                "reviews": [
                    {
                        "review": []
                    },
                    {
                        "review": []
                    },
                    {
                        "review": []
                    },
                    {
                        "review": []
                    }
                ]
            },
            "establishment": [
                "Quick Bites"
            ],
            "establishment_types": []
        }
    },
]
```

_Response (500 - Internal Server Errors)_
```json
{
  "message": "errors status code 500"
}
```
---
