const homeUrl = "http://localhost:3000"

$(document).ready(() => {
    if (localStorage.access_token) {
        fetchTodo()
        afterLogin()

    } else {
        beforeLogin()
    }

})

// ++++++LOGIN+++++++++++++

$("#login").submit(function (ev) {
    ev.preventDefault()
    // alert("ok")
    let email = $("#inputEmail").val()
    let password = $("#inputPassword").val()
    $.ajax({
        method: "post",
        url: `${homeUrl}/login`,
        data: {
            email: `${email}`,
            password: `${password}`
        }
    })
        .done(response => {
            localStorage.setItem("access_token", response.access_token)
            fetchTodo()
            afterLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#login').trigger("reset")

        })
})

//++++ADD NEW TODO++++

$("#add-todo").submit((ev) => {
    ev.preventDefault()
    let title = $("#inputTitle").val()
    let description = $("#inputDescription").val()
    let due_date = $("#inputDate").val()
    let status = $("input[type=radio][name=status]:checked").val()
    let restaurant = $("#inputResto").val()
    console.log(title, description, due_date, status, restaurant)

    $.ajax({
        method: "POST",
        url: `${homeUrl}/todos?food=${restaurant}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    })
        .done(data => {
            console.log(data)
            fetchTodo()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#add-todo').trigger("reset")
        })
})


//+++++LOGOUT+++++++

$("#logoutNav").click(() => {
    beforeLogin()
    signOut()
    localStorage.clear()
})

//++++++++DELETE++++++++++++

const deleteTodo = (id) => {

    $.ajax({
        method: "DELETE",
        url: `${homeUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(data => {
            fetchTodo()
        })
        .fail(err => {
            console.log(err)
        })
}
//++++++UPDATE TO +++++++++
const updateTodo = (id,) => {

    editTodo()
    let value = {}
    $.ajax({
        method: "GET",
        url: `${homeUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(result => {
            // console.log(result)
            value.title = result.title,
                value.description = result.description,
                value.status = result.status,
                value.due_date = result.due_date

            console.log(value)
            $("#edit-todo").empty()
            $("#edit-todo").append(`
            <h1>Edit New todos</h1>
            <form  class="mx-auto">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editTitle">Title</label>
                        <input type="text" class="form-control" id="editTitle" name="title" value="${value.title}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editDescription">Description</label>
                        <input type="textbox" class="form-control" id="editDescription" name="descripton" value="${value.description}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="editDate">Date</label>
                        <input type="date" class="form-control" id="editDate" name="due_date" 
                        value="${value.due_date.substring(0, 10)}">
                    </div>
                </div>

                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Status</legend>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="editStatus" value="done" ${value.status === true ? "checked" : ""}>
                            <label class="form-check-label" for="status1">
                                Done
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="editStatus2" value="undone" ${value.status === false ? "checked" : ""}>
                            <label class="form-check-label" for="status2">
                                Undone
                            </label>
                        </div>

                    </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="">Restaurant</label>
                    <input class="form-control" type="text" id="editResto" placeholder="Optional">
                </div>
            </div>
            <button type="submit" class="btn btn-danger" onclick="putTodo(${result.id}, event)">Add Tod</button>
            </form>
            <div class="mt-3">
                <button class="btn btn-danger" onclick="afterLogin()">See List Todo</button>
            </div>
            `)

        })
}

//+++++++PUT+++++
function putTodo(id, event) {
    event.preventDefault()
    let title = $("#editTitle").val()
    let description = $("#editDescription").val()
    let status = $("input[type=radio][name=status]:checked").val()
    let due_date = $("#editDate").val()
    console.log(id, title, description, status, due_date)
    $.ajax({
        method: "PUT",
        url: `${homeUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(result => {
            console.log(result)
            fetchTodo()
            afterLogin()
        })
        .fail(err => {
            console.log(err)
        })
}

//++++++++GET ALL TODO +++++++++++

const fetchTodo = () => {

    $.ajax({
        method: "GET",
        url: `${homeUrl}/todos`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(dataTodo => {
            $("#listTodo").empty()
            dataTodo.forEach(el => {
                $("#listTodo").append(`
    <div class="col-sm-4 mb-3">
    <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
        <div class="card-header">${el.title}</div>
                    <div class="card-body">
                            <h5 class="card-title">${new Date(el.due_date)}</h5>
                            <p class="card-text">${el.description}.</p>
                            <label for="true">Status</label>
                            <p>${el.status === true ? "done" : "undone"}</p>
                            <div>
                            <div class="card-footer bg-transparent border-dark">
                                <div class="my-auto">
                                    <button type="button" class="btn btn-warning btn-sm mx-3" id="hide" onclick="updateTodo(${el.id})">Update</button>
                                    <button type="button" class="btn btn-warning btn-sm my-1" id="show" onclick="deleteTodo(${el.id})">Delete</button>
                                </div>
                 </div>
        
             </div>
         </div>
     </div>`)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

//+++++REGISTER++++++
$("#newRegister").submit((ev) => {
    ev.preventDefault()
    let email = $("#registerEmail").val()
    let name = $("#registerName").val()
    let password = $("#registerPassword").val()
    console.log(email, name, password)
    $.ajax({
        method: "POST",
        url: `${homeUrl}/register`,
        data: {
            email,
            name,
            password
        }
    })
        .done(resp => {
            succesLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#newRegister').trigger("reset")
        })
})

function beforeLogin() {

    $("#main-page").hide()
    $("#form-login").show()
    $("#formRegister").hide()
    $("#logoutNav").hide()
    $("#addTodo").hide()
    $("#succesLogin").hide()
}

function afterLogin() {

    $("#main-page").show()
    $("#form-login").hide()
    $("#formRegister").hide()
    $("#logoutNav").show()
    $("#loginNav").hide()
    $("#registerNav").hide()
    $("#addTodo").hide()
    $("#succesLogin").hide()
    $("#editTodo").hide()
}

function gotoRegister() {
    $("#main-page").hide()
    $("#form-login").hide()
    $("#formRegister").show()
}


//+++BUTTON ADD NEW TODO ++++
let addNewTodo = () => {
    $("#addTodo").show()
    $("#main-page").hide()
}

let editTodo = () => {
    $("#addTodo").hide()
    $("#main-page").hide()
    $("#editTodo").show()

}

let succesLogin = () => {
    beforeLogin()
    $("#succesLogin").show()
    $("#form-login").hide()
    $("#header").hide()

}

// ++++login Goole+++
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token)
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/googlelogin`,
        headers: {
            google_access_token
        }
    })
        .done(result => {
            localStorage.setItem("access_token", result.access_token)
            afterLogin()
        })
        .fail(err => {

        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}