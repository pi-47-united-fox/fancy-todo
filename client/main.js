$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        beforeLogin()
    }
});

const afterLogin = () => {
    fetchListAnime()
    $(".after-login").show()
    $(".before-login").hide()
    $(".add-form").hide()
}

const beforeLogin = () => {
    $(".before-login").show()
    $(".after-login").hide()
}


const loginApp = (event) => {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()

    //pakai ajax untuk http request ke server
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: { email, password }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(function (err) {
            alert(err.responseJSON.message)
        })
}

const addHandler = (event) => {
    event.preventDefault()
    let obj = {
        title: $("#title").val(),
        description: $("#description").val(),
        due_date: $("#due_date").val()
    }
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data: obj,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            $("#title").val('')
            $("#description").val('')
            $("#due_date").val('')
            fetchListAnime()
            $(".anime-list").show()
            $(".add-form").hide()

        })
        .fail(err => {
            alert(err.responseJSON.message)
        })
}


const fetchListAnime = () => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            $("#anime-list").empty()
            $.each(result, (key, value) => {
                $("#anime-list").append(`
            <tr>
            <th scope="row">${value.title}</th>
            <td>${value.description}</td>
            <td>${value.status}</td>
            <td>${value.due_date}</td>
            <td>
            <button type="button" class="btn btn-danger btn-deleteHandler" id=${value.id}>Delete</button>
            </td>
          </tr>
          `
                )
            })
        })
        .fail(err => {
            alert(err.responseJSON.message)
        })
}


function signOut() {
    localStorage.removeItem('acces_token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

}

$("#btn-logout").click(() => {
    localStorage.clear()
    signOut()
    $("#email").val('')
    $("#password").val('')
    beforeLogin()
})

$("#btn-add").click(() => {
    $(".add-form").show()
    $(".anime-list").hide()
})

$("#btn-home").click(() => {
    $(".anime-list").show()
    $(".add-form").hide()
})



function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/googleLogin',
        headers: {
            google_access_token
        }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(err => {
            alert(err)
        })
}


