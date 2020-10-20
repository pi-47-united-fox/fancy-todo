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
    $("#jumbotron_edit_form").hide()
}

const beforeLogin = () => {
    $(".before-login").show()
    $(".after-login").hide()
    $(".add-form").hide()
    $("#jumbotron_edit_form").hide()
}

const hideAll = () => {
    $(".before-login").hide()
    $(".add-form").hide()

}


const loginApp = (event) => {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()

    //pakai ajax untuk http request ke server
    $.ajax({
        method: 'POST',
        url: 'https://fancy-todo-anime.herokuapp.com/user/login',
        data: { email, password }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(function (err) {
            console.log(err.message)
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
        url: 'https://fancy-todo-anime.herokuapp.com/todos',
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
            console.log(err.message)
        })
}

const removeAnime = (id, event) => {
    console.log(id)
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `https://fancy-todo-anime.herokuapp.com/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((data) => {
            afterLogin()
        })
        .fail((err) => {
            console.log(err)
            console.log('Error.')
        })
        .always(() => {
            $('#add-form').trigger("reset")
        })
}

const updateAnime = (id,event) =>{
    event.preventDefault()
    $(".anime-list").hide()
    $("#jumbotron_edit_form").show()
    $.ajax({
        method: 'GET',
        url: `https://fancy-todo-anime.herokuapp.com/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result =>{
        let data = result
        console.log(data)
        $('#editAnimeForm').empty()
        $('#editAnimeForm').append(`
        <form>
            <h3>Edit your Anime Todos</h3>
            <div class="form-group">
                <label for="edit-title">Title</label>
                <input type="text" class="form-control" id="edit-title" value ="${data.title}">
            </div>
            <div class="form-group">
                <label for="edit-description">Description</label>
                <input type="text" class="form-control" id="edit-description" value ="${data.description}">
            </div>
            <div class="form-group">
                <label for="edit-date">Date</label>
                <input type="date" class="form-control" id="edit-due_date" value ="${data.due_date.substring(0, 10)}">
            </div>
            <div class="form-group">
              <label for="edit-status">Travel Status</label>
              <select class="form-control" id="edit-status">
                <option>Please select one</option>
                <option value="On Progress" ${data.status === "On Progress" ? "selected" : ""}>On Progress</option>
                <option value="Watched" ${data.status === "Watched" ? "selected" : ""}>Watched</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" onclick="putAnime(${data.id}, event)">Update</button>
            <button type="button" class="btn btn-danger" onclick="afterLogin()">Cancel</button>
        </form>
        `)
    })
}

const putAnime = (id,event) => {
    event.preventDefault()
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let due_date = $('#edit-due_date').val()
    let status = $('#edit-status').val()
    $.ajax({
        method: 'PUT',
        url: `https://fancy-todo-anime.herokuapp.com/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    })
        .done(() => {
            afterLogin()
        })
        .fail((err) => {
            console.log(err)
        })
}

const searchHandler = (event) =>{
    event.preventDefault()
    let input = $('#search').val()
    $.ajax({
        method: 'GET',
        url: `https://fancy-todo-anime.herokuapp.com/todos/anime?search=${input}`,
        headers: {
            access_token: localStorage.access_token
        },
    })
        .done(() => {
            $('#search').val('')
            afterLogin()
        })
        .fail((err) => {
            console.log(err)
        })
}


const fetchListAnime = () => {
    $.ajax({
        method: 'GET',
        url: 'https://fancy-todo-anime.herokuapp.com/todos',
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
            <td>${value.due_date.substring(0, 10)}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="updateAnime(${value.id}, event)">Edit</button>
            <button type="button" class="btn btn-danger" onclick="if (confirm('Are you sure?')) { return removeAnime(${value.id}, event) }">Delete</button>
            </td>
          </tr>
          `
                )
            })
        })
        .fail(err => {
            console.log(err.message)
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
        url: 'https://fancy-todo-anime.herokuapp.com/user/googleLogin',
        headers: {
            google_access_token
        }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(err => {
            console.log(err.message)
        })
}


