let baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    if (localStorage.access_token) {
        dashboard()
    } else {
        loginPage()
    }
})

function register(event) {
    event.preventDefault()
    let email = $("#reg-email").val()
    let password = $("#reg-password").val()
    $.ajax({
            method: 'POST',
            url: baseUrl + '/register',
            data: { email, password }
        })
        .done((result) => {
            localStorage.setItem('access_token', result.access_token)
            loginPage()
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            console.log("complete");
        })
}

function loginApp(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email, password);

    $.ajax({
            method: 'POST',
            url: baseUrl + '/login',
            data: { email, password }
        })
        .done((result) => {
            console.log(result);
            localStorage.setItem('access_token', result.access_token)
            dashboard()
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            console.log("complete");
        })
}

function editTodo(event) {
    event.preventDefault()
    let title = $('#editTitle').val()
    let description = $('#editDescription').val()
    let status = $('#editStatus').val()
    let due_date = $('#editDue_date').val()
    $.ajax({
            method: 'PUT',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                due_date
            }
        })
        .done(result => {
            console.log(result);
            getTodos()
        })
        .fail(function(error) {
            console.log(error);
        })
}

function deleteTodo(id) {
    $.ajax({
            method: 'DELETE',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(result => {
            console.log(result);
            getTodos()
        })
        .fail(function(error) {
            console.log(error);
        })
}

function getTodos() {
    $.ajax({
            method: 'GET',
            url: baseUrl + '/todos',
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(result => {
            console.log(result);
            Todos = result
            $("#todoList").empty()
            $.each(Todos, (key, value) => {
                $("#todoList").append(`
                <tbody>
                <tr>
                        <td>
                            <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox1" name="options[]" value="1">
                                <label for="checkbox1"></label>
                            </span>
                            </td>
                        <td>${value.title}</td>
                        <td>${value.description}</td>
                        <td>${value.status}</td>
                        <td>${value.due_date}</td>
                        <td>
                            <a href="#" onClick="editTodo(${value.id})" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#" onClick="deleteTodo(${value.id})" class="delete"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                        </tr>
                </tbody>
                `)
            })
        })
        .fail(function(error) {
            console.log(error);
        })
}

function createTodo(event) {
    event.preventDefault()
    let title = $('#create-title').val()
    let description = $('#create-description').val()
    let status = $('#create-status').val()
    let due_date = $('#create-due_date').val()

    $.ajax({
            method: 'POST',
            url: baseUrl + '/todos',
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                status,
                due_date
            }
        })
        .done(data => {
            $('#create-title').val('')
            $('#create-description').val('')
            $('#create-status').val('')
            $('#create-due_date').val('')
            getTodos()
        })
        .fail(err => {
            console.log(err);
        })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}

$(".btn-logout").click(function() {
    localStorage.removeItem('access_token')
    signOut()
    $("#email").val('')
    $("#password").val('')
    loginPage()
})

$(".register-btn").click(function() {
    register()
})

$(".btn-add").click(() => {
    $(".create").show()
    $(".dashboard").hide()
    $(".user-todo-list").show()
})

function dashboard() {
    getTodos()
    $('.register').hide()
    $(".after-login").show()
    $(".before-login").hide()
    $(".btn-logout").show()
    $(".add-todos").show()
    $(".dashboard").show()
    $(".register-btn").hide()
    $(".btn-login").hide()
    $(".create").hide()
    $(".edit").hide()
}

function loginPage() {
    $(".before-login").show()
    $(".after-login").hide()
    $(".btn-logout").hide()
    $(".add-todos").hide()
    $(".dashboard").hide()
    $(".register").hide()
    $(".register-btn").show()
    $(".btn-login").hide()
    $(".create").hide()
    $(".edit").hide()
}

function registerBtn() {
    $('.register').show()
    $('.before-login').hide()
    $('.after-login').hide()
    $('.register-btn').hide()
    $(".create").hide()
    $(".edit").hide()
}

$.ajax({
        method: "get",
        url: `${baseUrl}/holiday`,
        headers: {
            token: localStorage.getItem('access_token')
        }
    })
    .done(function(data) {
        console.log(data)
        data.response.holidays.forEach(function(element) {
            if (element.type[0] === "National holiday")
                $('#holiday').prepend(`
                    <div class="card text-white bg-primary mb-5" style="width: 20rem;">
                    <div class="card-body m-auto">
                        <p class="card-title d-flex justify-content-center">Tanggal</p>
                        <p class="card-text d-flex justify-content-center">${element.date.iso}</p>
                        <p class="card-title d-flex justify-content-center">Hari ini meperingati</p>
                        <p class="card-title d-flex justify-content-center"><strong>${element.name}</strong></p>
                        <p class="card-text d-flex justify-content-center">Keterangan</p>
                        <p class="card-text d-flex justify-content-center">${element.description}</p>
                        <a href="#" class="btn btn-sm btn-info d-flex justify-content-center" id="${element.date.iso}">Mark this Date !</a>
                    </div>
                </div>
            `)
        })

    })
    .fail(function(err) {
        console.log(err)
    })

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: 'POST',
            url: `${baseUrl}/googleLogin`,
            headers: {
                google_access_token: id_token
            }
        })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            dashboard()
        })
        .fail(error => {

        })
}