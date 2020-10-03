$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    } else {
        beforeLogin()
    }
});

// -----------------button------------

$("#btn-home").click(function () {
    $("#todolist").hide()
    $("#afterLogin").show()
});

$("#btn-register").click(function () {
    $("#register").show()
    $("#login").hide()
});

$("#btn-login").click(function () {
    $("#register").hide()
    $("#login").show()
});

$("#btn-logout").click(function () { // token dihapus --> tampilkan form login
    localStorage.clear()
    $("#email").val()
    $("#password").val()
    signOutGoogle()
    beforeLogin()
});

// ---------------------after-before login-------------

function afterLogin() {
    fetchTodo()
    $(".after-login").show()
    $(".before-login").hide()
    $("#btn-logout").show()
    $('#register').hide()
    $('#btn-register').hide()
    $('#addTodos').show()
}

function beforeLogin() {
    $(".after-login").hide()
    $(".before-login").show()
    $("#btn-logout").hide()
    $('#register').hide()
    $('#btn-login').show()
    $('#btn-register').show()
    $('#addTodos').hide()
}


// ---------------------function Login-------------

function loginApp(event) {
    event.preventDefault()
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email, password
        }
    })
    .done(result => {
        console.log(result.UserId, "Success login")
        // localStorage.access_token = result.access_token
        localStorage.setItem('UserId',result.UserId)
        localStorage.setItem('access_token', result.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log("error", error)
    })
}

function registerApp(event) {
    event.preventDefault()
    let email = $("#register-email").val()
    let password = $("#register-password").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
    .done(result => {
        console.log(result,'Result register')
        $('#login').show()
        $('#register').hide()
    })
    .fail(err => {
        console.log("Error register", err)
    })
}

// ----------------- function Data Manipulation -----------------
function fetchTodo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        let Todos = result
        $("#todolist").empty()
        $.each(Todos, function(key, value){
            console.log(value.id)
            $("#todolist").append(`
        <div class="col-4 mb-2">
      <div class="card" style="width: 18rem;">
        <img src="${value.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${value.title}</b></h5>
          <p class="card-text">${value.description}</p>
          <p class="card-text">Artist: <b>${value.artist}</b></p>
          <p class="card-text">Song: <b>${value.song}</b></p>
          <a href="${value.link}" class="btn btn-primary">Dengerin musiknya</a><br>
          <br>
          <button class="btn btn-primary" onclick="deleteTodo(${value.id})">Delete</button>
          <button class="btn btn-primary" onclick="putTodo">Done</button>
        </div>
      </div>
    </div>
    `)
        })
    })
    .fail(err => {
        console.log("error", err)
    })
}

function addTodos(event) {
    event.preventDefault()
    let title = $("#title").val()
    let description = $("#description").val()
    let due_date = $("#due_date").val()
    let artist = $("#artist").val()
  
    $.ajax({
      method:'POST',
      url:'http://localhost:3000/todos',
      data:{
          title : title,
          description: description,
          due_date: due_date,
          artist: artist,
          UserId : localStorage.UserId
      },
      headers:{
        access_token:localStorage.access_token
      }
    })
    .done(result=>{
      console.log(result)
    })
    .fail(err =>{
      console.log(err)
    })
}

function deleteTodo(input){
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/todos/${input}`,
      headers: {
          access_token: localStorage.access_token
      }
    })
    .done(result=>{
      console.log(result)
      fetchTodo()
    })
    .fail(err=>{
      console.log(error, 'error')
    })
}

function putTodo(){

}

function patchTodo(){

}

// ---------------------login Google---------------

function onSignIn(googleUser) {
    console.log('masuk googleloginclient')
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers: {
            google_access_token : id_token
        }
    })
    .done(result => {
        localStorage.setItem('UserId',result.UserId)
        localStorage.setItem('access_token',result.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log('error', err)
    })
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}