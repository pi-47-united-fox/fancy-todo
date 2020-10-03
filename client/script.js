let Todo = []
let Food = []
baseUrl = 'http://localhost:3000'
userFullName = ''

$(document).ready(function () {
    console.log("kuyyy!");
    //cek token
    if (localStorage.access_token) {
        afterLogin()
    } else {
        firstPage()
        // beforeLogin()
    }
});

function firstPage() {
    $(".afterLogin").hide()
    $(".beforeLogin").hide()
    $(".firstPage").show()
    $(".formAdd").hide()
}

function beforeLogin() {
    $(".afterLogin").hide()
    $(".beforeLogin").show()
    $(".firstPage").hide()
    $(".formAdd").hide()
    $(".formEdit").hide()
}

function afterLogin() {
    $(".afterLogin").show()
    $(".beforeLogin").hide()
    $(".firstPage").hide()
    $(".formAdd").hide()
    $(".formEdit").hide()
    fetchData()
    getUserName()
}

function addForm() {
    $(".afterLogin").hide()
    $(".beforeLogin").hide()
    $(".firstPage").hide()
    $(".formAdd").show()
    $(".formEdit").hide()
    $(".btn-food-search").click(function () {
        $(".table-toggle").fadeToggle();
    });
}
function editForm() {
    $(".afterLogin").hide()
    $(".beforeLogin").hide()
    $(".firstPage").hide()
    $(".formAdd").hide()
    $(".formEdit").show()

    $(".btn-food-search").click(function () {
        $(".table-toggle").fadeToggle();
    });
}

function loginApp(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email, password)
    localStorage.setItem('username', email)

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: { email, password }
    })
        .done((res) => {
            console.log(`login sucesss`, res)
            // cara1
            // localStorage.access_token = res.access_token
            // cara2
            localStorage.setItem('access_token', res.access_token)
            afterLogin()
        })
        .fail((err) => {
            console.log(`cannot login`, err)
        })
        .always(function () {
            console.log(`compleate!`)
        })
}

$("#logout").click(() => {
    localStorage.removeItem(`access_token`)
    $("#email").val('')
    $("#password").val('')
    beforeLogin()
    signOut()
})

//fetch data user todo
function fetchData() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // console.log(result)
            Todo = result
            $("#list-todo").empty()

            //forEach ajax
            $.each(Todo, (key, value) => {
                console.log(value, 'value')

                let stat = 'Done'
                if (value.status == false) {
                    stat = 'Progress'
                }
                $("#list-todo").append(`
       
                <div class="card ml-5 mb-5">
                <h5 class="card-header">${stat}</h5>
                <div class="card-body">
                    <h5 class="card-title">${value.title}</h5>
                    <p class="card-text">description : <br> ${value.description}</p>
                    <p class="card-title">date : ${value.due_date}</p>
                    <p class="card-title">${value.food}</p>
                    <p class="card-title"readonly>${value.link}</p>
                    <p class="card-title"readonly>${value.location}</p>
                    <button class="btn btn-light" onclick="editForm(${value.id})">Edit</button>
                    <button class="btn btn-light" onclick="deleteData(event,${value.id})">Remove</button>
                </div>
                </div>
                `)
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteData(event, id) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        data: { id },
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(res => {
            console.log(`berhasil delete data`)
            afterLogin()
        })
        .fail(err => {
            console.log(`err saat delete`, err)
        })
}


function fetchFood() {
    let search = $("#search").val()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/resto?search=${search}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // console.log(result)
            Food = result
            idFood = null
            $("#search").empty()
            $("#list-food").empty()
            //forEach food
            $.each(Food, (key, value) => {
                console.log(value, 'value')
                console.log(value.restaurant.name)
                console.log(value.restaurant.id)
                idFood = value.restaurant.id

                $("#list-food").append(`
            <tr>
                <td>${value.restaurant.name}</td>
                <td>${value.restaurant.cuisines}</td>
                <td>${value.restaurant.average_cost_for_two}K</td>
                <td>${value.restaurant.location.locality_verbose}</td>
            </tr>
            `)

                $(".select-food").append(`
            <option value="${value.restaurant.name}">${value.restaurant.name}</option >
            `)

                $(".input-location").append(`
            <option value="${value.restaurant.location.locality_verbose}">${value.restaurant.location.locality_verbose}</option >
            `)

                $(".input-price").append(`
            <option value="${value.restaurant.average_cost_for_two}">${value.restaurant.average_cost_for_two}K</option >
            `)
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function editFoodForm(id) {
    let search = $("#search").val()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // console.log(result)
            console.log(id)
            Food = result
            idFood = null

            //forEach food
            $.each(Food, (key, value) => {
                console.log(value, 'value')

                $(".input-edit").append(`
            <div class="container formEdit">
            <h1>Search Food</h1>
            <!--Food Search-->
            <div class="form-group">
                <input type="text" class="form-control" id="search" placeholder="masukin query disini">
                <button class="btn btn-dark btn-food-search mt-3" onclick="fetchFood()">Search Food</button>
            </div>
            <br>
            <h2>Edit Eativity</h2>
            <form>
                <!--title-->
                <div class="form-group mt-3">
                    <label for="exampleFormControlInput1">Ttitle</label>
                    <input type="text" class="form-control" id="title-edit" value="${value.title}" placeholder="mau makan mi ayam">
                </div>
                <!--status-->
                <div class="form-group mt-3">
                    <label for="exampleFormControlInput1">Ttitle</label>
                    <input type="text" class="form-control" id="status-edit" value="${value.title}" placeholder="mau makan mi ayam">
                </div>
                <!--food-->
                <label for="exampleFormControlSelect1">Food Name</label>
                <select class="form-control select-food" id="food-edit">
                <option value="${value.food}">value="${value.food}"</option >
                </select>
                <!--location-->
                <label for="exampleFormControlSelect1">Location</label>
                <select class="form-control input-location" id="location-edit">
                <option value="${value.location}"">value="${value.location}"</option >
                </select>
                <!--link-->
                <label for="exampleFormControlSelect1">Price</label>
                <select class="form-control input-price" id="link-edit">
                <option value="${value.link}">value="${value.link}"</option >
                </select>
                <!--descriptiom-->
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea class="form-control" id="description-edit" rows="3"
                        placeholder="coba tulis disini keteranganya" value="${value.description}"></textarea>
                </div>
                <button type="submit" onclick="editData(${value.id})" class="btn btn-success">Submit</button>
                <button onclick="afterLogin()" class="btn btn-danger">Cancel</button>
            </form>
        </div>
            `)
            })

        })
        .fail(err => {
            console.log(err)
        })
}

// http://localhost:3000/todos/3
function editData(id) {
    let title = $("#title-edit").val()
    let description = $("#description-edit").val()
    let food = $("#food-edit").val()
    let location = $("#description-edit").val()
    let link = $("#link-edit").val()
    let status = $("#status-edit").val()

    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status: status,
            due_date: new Date(),
            food: food,
            location: location,
            link: link
        }
    })
        .done((res) => {
            // $(append)
            // localStorage.removeItem(`access_token`)
            console.log(`edit data success`, res)
            afterLogin()
        })
        .fail((err) => {
            console.log(`cannot edit`, err)
        })
}

function addData(event) {
    event.preventDefault()
    let title = $("#title").val()
    let description = $("#description").val()
    let food = $("#food").val()
    let location = $("#description").val()
    let link = $("#link").val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status: false,
            due_date: new Date(),
            food: food,
            location: location,
            link: link
        }
    })
        .done((res) => {
            // $(append)
            // localStorage.removeItem(`access_token`)
            console.log(`adding data success`, res)
            afterLogin()
        })
        .fail((err) => {
            console.log(`cannot add`, err)
        })
}

function headerUser() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/login`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // console.log(result)
            Todo = result
            $("#select-food").empty()
            //forEach ajax
            $.each(Todo, (key, value) => {
                console.log(value, 'value')
                $("#list-todo").append(`

                <div class="col-4 mb-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${value.title}</h5>
                        <p class="card-title">${value.due_date}</p>
                        <p class="card-text">${value.description}</p>
                        <p class="card-text">Status ${value.status}</p>
                        <a href="#" class="btn btn-primary">Read</a>
                    </div>
                </div>
            </div>
                `)
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers: {
            google_access_token
        }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(err => {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function getUserName() {
    console.log(`get full name function`)
    $("#user-name").empty()
    $("#user-name").append(`
        <h1 class="display-3">Hallo! ${(localStorage.username).split('@').slice(0, 1)}</h1>
        `)
}