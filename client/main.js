$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        beforeLogin()
    }
})

// before-after login functionalities
function afterLogin(){
    $("#register").hide()
    $("#loginForm").hide()
    $("#HomeNav").show()
    $("#RegisterNav").hide()
    $("#NewTodoNav").show()
    $("#logout").show()

}

function beforeLogin(){
    $("#register").hide()
    $("#loginForm").show()
    $("#HomeNav").hide()
    $("#RegisterNav").show()
    $("#NewTodoNav").hide()
    $("#logout").hide()
}

function showRegisterForm() {
    $("#register").show()
    $("#loginForm").hide()
}

function showLoginForm() {
    $("#register").hide()
    $("#loginForm").show()
}

$("#logout").click(function () {
    localStorage.removeItem('access_token')
    beforeLogin()
    // signOut() //google sign out
})

// user login
function login(event) {
    event.preventDefault()
    let email = $('#input_email').val()
    let password = $('#input_password').val()
    // console.log(email, password)
    // afterLogin()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
        .done(result => {
            // console.log(result)
            localStorage.access_token = result.access_token
            afterLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
        .always(() => {
            console.log('Complete')
            // $('#loginForm').trigger("reset")
        })
}

// user register
function register(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    // console.log(name, email, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
        .done(() => {
            // console.log(result)
            beforeLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
        .always(() => {
            console.log('Complete')
            // $('#registerForm').trigger("reset")
        })
}