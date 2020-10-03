var serverURL = 'http://localhost:3000'
var todoCurrentId = null

$('#signInForm').hide()

$(document).ready(function () {
    // Handler for ready called
    // @ Cek token ? show Dasboard : show Home Page Form
    // console.log('OKE Masuk.....');
    if (localStorage.access_token) {
        userLogedIn()
    } else {
        userLogedOut()
    }
});

$('#btn-signOut').click(function () {
    // hapus token
    // tampilkan HomePage1
    localStorage.removeItem('access_token')
    signOut()
    $('body').removeAttr('style')
    userLogedOut()
})

function showSignUpForm(e) {
    e.preventDefault()
    $('#signInForm').hide()
    $('#signUpForm').show()
}

function showSignInForm(e) {
    e.preventDefault()
    $('#signInForm').show()
    $('#signUpForm').hide()
}

// LOGIN LOGOUT ===============================

function userLogedIn() {
    fetchTodo()
    fetchWeather()
    fetchUserData()
    $('#homePage1').hide();
    $('#mainDashboard1').show();
    $('#addTodo').hide();
    $('.user-logedin-nav').show();
    $('#halo-name').text(localStorage.user_name);
};

function userLogedOut() {
    $('#mainDashboard1').hide();
    $('.user-logedin-nav').hide()
    $('#homePage1').show();
};

function signIn(e) {
    e.preventDefault()

    var email = $('#emailSI').val();
    var password = $('#passwordSI').val();
    // validasi ke 2 sebelum hit ke server
    if (email == '' || password == '') {
        // Diisi sesuatu notifikasi
        console.log ('HOHOHOHOOHO')

    } else {
        // Unutk submit ke server pakai AJAX (HTTP Request)
        $.ajax({
            method: "POST",
            url: serverURL + "/login",
            data: {
                email, password
            }
        }).done(result => {
            // console.log(result, 'Success LogedIn');
            // localStorage.access_token = result.access_token
            localStorage.setItem('access_token', result.access_token)
            localStorage.setItem('user_name', result.user_name)
            userLogedIn()
        }).fail(err => {
            $('#wrong-pw').remove();
            $("#showNotifLogin").append(`
            <div class="alert alert-warning" id="wrong-pw" role="alert">
            ${err.responseJSON.message}
            </div>
            `);
            // console.log(err.responseJSON.message)
        })
    }
};

// SIGN UP

function signUp(e) {

    

    e.preventDefault()
    var email = $('#emailSU').val();
    var password = $('#passwordSU').val();
    var password_n = $('#passwordSU-2nd').val();
    // validasi ke 2 sebelum hit ke server
    if (email == '' || password == '') {
        // Diisi sesuatu notifikasi
        console.log ('HOHOHOHOOHO')
    } else if (password !== password_n) {
        $('#wrong-pw-2').remove();
        $("#notifikasiSignUp").append(`
        <div class="alert alert-warning" id="wrong-pw-2" role="alert">
        Password Tidak Sama
        </div>
        `);
    } else {
        // Unutk submit ke server pakai AJAX (HTTP Request)
        $.ajax({
            method: "POST",
            url: serverURL + "/register",
            data: {
                email, password
            }
        }).done(result => {
            // console.log(result, 'Success LogedIn');
            // localStorage.access_token = result.access_token
            // localStorage.setItem('access_token', result.access_token)
            showSignInForm(e)
        }).fail(err => {
            console.log(err)
        }).always(() => {
    
        })
    }

};





// * OPERATION CRUD TODO

// READ ==========================================

function fetchTodo() {
    $.ajax({
        method: "GET",
        url: serverURL + "/todos",
        headers: {
            access_token: localStorage.access_token
        }
    }).done(todoList => {
        // console.log (todoList)
        $('#todoList').empty()
        $.each(todoList, function (i, e) {
            // console.log(e)
            // $('#todoList').append(`
            //     <div class="card" style="width: 40rem; margin-bottom: 2rem">
            //         <div class="card-body" id=todoCardBody_${e.id}>
            //         <div id=todoCardValue_${e.id}>
            //             <h5 class="card-title">${e.title}</h5>
            //             <h6 class="card-subtitle mb-2 text-muted">${e.due_date.split('T')[0]}</h6>
            //             <p class="card-text">${e.description}</p>
            //             <a href="#" onclick='editTodoForm(${e.id})' class="card-link" id="editTodo">Edit</a>
            //             <a href="#" onclick='editTodoStatus(${e.id})' class="card-link" id="setStatus">Selesai</a>
            //             <a href="#" onclick='delTodo(${e.id})' class="card-link" id="delTodo">Hapus</a>
            //         </div>
            //         </div>
            //     </div>`
            // );
            let checkbox = `<input type="checkbox" id="status-${e.id}" onclick="changeStatus(${e.id}, '${e.status}')" `
            if (e.status == 'finished') {
                checkbox += `checked>`
            } else {
                checkbox += `>`
            }
            $('#todoList').append(`
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    ${checkbox}
                </div>
                </div>
                <div class="card" style="width: 40rem">
                    <div class="card-body" id=todoCardBody_${e.id}>
                    <div id=todoCardValue_${e.id}>
                        <h5 class="card-title">${e.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${e.due_date.split('T')[0]}</h6>
                        <p class="card-text">${e.description}</p>
                        <a href="#" onclick='editTodoForm(${e.id})' class="card-link" id="editTodo">Edit</a>
                        <a href="#" onclick='delTodo(${e.id})' class="card-link" id="delTodo">Hapus</a>
                    </div>
                    </div>
                </div>
            </div>`)

        });
    })
}

// DELLETE ==================================
function delTodo(id) {
    // id.preventDefault()
    $.ajax({
        method: "delete",
        url: serverURL + "/todos/" + id,
        headers: {
            access_token: localStorage.access_token
        }
    });
    fetchTodo()
}

// ADD ==================================
function addTodoForm() { // button
    $('#addTodo').show();
}

function cancleAdd(e) { // button
    e.preventDefault()
    $('#addTodo').hide();
}

function addTodo(e) { // ke server
    e.preventDefault()
    $.ajax({
        method: "post",
        url: serverURL + "/todos",
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title: $('#titleAdd').val(),
            due_date: $('#dueDateAdd').val(),
            description: $('#descriptionAdd').val()
        }
    }).done(result => {
        // belum nemu ide
        fetchTodo()
        $('#addTodo').hide()
    }).fail(err => {
        console.log(err, "ERROR")
    }).always(() => {
        $('#titleAdd').val('')
        $('#dueDateAdd').val('')
        $('#descriptionAdd').val('')
        todoCurrentId = null
    })
}

// EDIT ==================================

function cancleEdit(event) {
    event.preventDefault()
    // $(`#formEdit`).empty();
    $(`#todoCardValue_${todoCurrentId}`).show();
    $(`#formEdit${todoCurrentId}`).remove();
    // $(`#formEdit${todoCurrentId}`).empty()
}

function editTodoForm(todoId) {
    todoCurrentId = todoId
    $.ajax({
        method: "get",
        url: serverURL + "/todos/" + todoCurrentId,
        headers: {
            access_token: localStorage.access_token
        }
    }).done(data => {
        // $(`#formEdit${todoCurrentId}`).remove()
        // console.log(data.due_date.split('T')[0])
        $(`#todoCardValue_${todoCurrentId}`).hide();
        $(`#todoCardBody_${todoCurrentId}`).append(`
        <form onsubmit="editTodo(event)" id="formEdit${todoCurrentId}">
        <div class="row">
            <div class="col">
            <input type="text" class="form-control title" placeholder="Title" id="titleEdit" value="${data.title}">
            </div>
            <div class="col">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${data.due_date.split('T')[0]}">
            </div>
        </div>
        <div class="form-group">
            <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${data.description}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Edit</button>
            <button onclick="cancleEdit(event)" class="btn btn-danger">Cancel</button>
        </form>
        `);
    }).fail(err => {
        console.log(err, 'ERROR')
    })
}

function editTodo(e) {
    e.preventDefault()
    var title = $('#titleEdit').val();
    var due_date = $('#dueDateEdit').val();
    var description = $('#descriptionEdit').val();
    $.ajax({
        method: "PUT",
        url: serverURL + "/todos/" + todoCurrentId,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title, due_date, description
        }
    }).done(() => {
        console.log('Selesai Edit')
        fetchTodo()
        $(`#formEdit`).hide();
        $(`#todoCardValue_${todoCurrentId}`).show();
    }).fail(err => {
        console.log(err, 'ERROR')
    }).always(() => {
        $('#titleEdit').val('');
        $('#dueDateEdit').val('');
        $('#descriptionEdit').val('')
    })
}

// EDIT STATUS =================================

function changeStatus(id, status) {
    // var status = $(`#status-${id}`)
    // console.log ('Sebelum Edit', status)
    
    var newStatus = ''
    if (status == "unfinished") {
        newStatus = 'finished'
    } else {
        newStatus = 'unfinished'
    }
    // console.log (newStatus)
    
    $.ajax({
        method: "patch",
        url: serverURL + "/todos/" + id,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: newStatus
        }
    }).done((data) => {
        // console.log('Selesai Edit', data.status)
        // userLogedIn()
    }).fail(err => {
        console.log(err, 'ERROR')
    })
}

// GOOGLE ==============================================
function onSignIn(googleUser) {

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var {id_token} = googleUser.getAuthResponse();
    console.log (id_token)

    $.ajax({
        method: "POST",
        url: serverURL + '/google-login',
        headers: {
            google_access_token: id_token
        }
    }).done(result => {
        console.log (result)
        localStorage.setItem('access_token', result.access_token)
        userLogedIn()
        console.log(result)
    }).fail (err => {
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


// 3rd Party API ==================================
function fetchWeather () {
    $.ajax({
        method: "GET",
        url: serverURL + "/w",
        headers: {
            access_token: localStorage.access_token
        }
    }).done (result => {
        // console.log (result)
        $('#cuaca').empty();
        $('#cuaca').append(`
        <div class="weather-card card" data-toggle="tooltip" data-placement="top" title="Untuk mengubah lokasi buka pengaturan user"> <span class="weather-icon icon"><img class="img-fluid" src="${result.current.weather_icons[0]}" /></span>
            <div class="weather-title title">
                <p>${result.location.name}</p>
            </div>
            <div class="weather-temp">${result.current.temperature}<sup>&deg;</sup></div>
            <div class="weather-row row">
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">General</div>
                    <div class="weather-value value">${result.current.weather_descriptions[0]}</div>
                </div>
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">Cloud</div>
                    <div class="weather-value value">${result.current.cloudcover}</div>
                </div>
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">Pressure</div>
                    <div class="weather-value value">${result.current.pressure}</div>
                </div>
            </div>
        </div>
        `);
    }).fail (err => {
        console.log (err)
    }).always (() => {
        console.log ('masuk Weather Ajax')
    })
}

// TO EDIT USER DATA
function fetchUserData () {
    $.ajax({
        method: 'GET',
        url: serverURL + "/fetch",
        headers: {
            access_token: localStorage.access_token
        }
    }).done (result => {
        // console.log (result)
        $('#user_nameEd').val(localStorage.user_name);
        $('#emailEd').val(result.email);
        $('#locationEd').val(result.location);
        if (result.bg_img !== 'no_image') {
            $('body').attr('style', `background: url(${result.bg_img}); background-size: cover;`)
        }
    }).fail (err => {
        console.log (err)
    }).always (() => {
        console.log ('masuk fetchUserData')
    })
}

function saveEdit (event) {
    event.preventDefault()
    var user_name = $('#user_nameEd').val();
    var email = $('#emailEd').val();
    var location = $('#locationEd').val();
    var bg_keyname = $('#bgKeynameEd').val();
    // 
    $.ajax({
        method: "PUT",
        url: serverURL + '/edit',
        headers: {
            access_token: localStorage.access_token
        },
        data : {
            user_name,
            email,
            location,
            bg_keyname
        }
    }).done (result => {
        console.log ('SUCCESS, save edit')
        // localStorage.removeItem('access_token')
        localStorage.setItem('access_token', result.access_token)
        // localStorage.removeItem('user_name')
        // localStorage.setItem('user_name', result.user_name)
        userLogedOut()
        userLogedIn()
    }).fail (err => {
        console.log ('MASUK Error EDIT',err)
    }).always (() => {
        console.log ('masuk save edit')
    })
}