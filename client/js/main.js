$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    } else {
        beforeLogin()
    }
})

function hideAll(){ 
    $('#loader').hide()
    $('#login-btn').hide()
    $('#regist-btn').hide()
    $('#login-container').hide()
    $('#logout-btn').hide()
    $('#content-list').val('') 
    $('#content-list').hide() 
    $('#container-content').hide()
    $('#regist-form').hide()
    $('#login-form').hide()
    $('#content-form-add').hide()
}
//navigation-home
$('#nav-home-btn').on('click',()=>{
    console.log("home");
    hideAll()
    $('#container-content').show()
    $('#content-list').show() 
    $('#logout-btn').show()
    loadData()
})
$('#nav-addTodo-btn').on('click',()=>{
    console.log("add");
    hideAll()
    $('#container-content').show()
    $('#content-form-add').show()
    $('#logout-btn').show() 
})

function afterLogin() {
    console.log("logged in");
    $('#login-btn').hide()
    $('#regist-btn').hide()
    $('#login-container').hide()
    $('#logout-btn').show()
    $('#container-content').show()
    $('#home_menu').show()
    loadData()
}

function beforeLogin() {
    console.log("logged out"); 
    $('#home_menu').hide()
    $('#logout-btn').hide()
    $('#content-list').empty()
    $('#container-content').hide()
    $('#login-btn').show()
    $('#regist-btn').show()
    $('#login-container').show()
}

function loadData(){
    console.log("fetching data");
    console.log(localStorage.access_token);
    $.ajax({
        url: `${URL}todos`,
        method: "Get",
        headers:{
            access_token:localStorage.access_token
        }
    })
        .done(data=>{
            $('#loader').hide() 
            $('#content-list').empty()
            console.log(data);
            data.forEach(ele=>{
                $('#content-list').append(`
                <div class="col mb-3">
                    <div class="card flex-col" style="width: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">${ele.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${ele.due_date}</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                    </div>
                </div>
                `)
            })
        })
        .fail()
        .always()
}

$('#submit-add-input').on('click', (event)=>{
    event.preventDefault()
    let title = $('#title-add-input').val()
    let description = $('#description-add-input').val()
    let status = "doing"
    let due_date = $('#dueDate-add-input').val()
    let activityType = $('#activityType-add-input').val()

    $.ajax({
        url: `${URL}todos`,
        method: "POST",
        headers:{
            access_token:localStorage.access_token
        },
        data: {
            title,
            description,
            status,
            due_date,
            activityType
        }
    })
        .done(result => {
            console.log(result); 
        })
        .fail(err => {
            console.log(err)
            console.log(err.responseJSON.message);
        })
        .always(_ => {
            $('#title-add-input').val('')
            $('#description-add-input').val('') 
            $('#dueDate-add-input').val('')
            $('#activityType-add-input').val('')
        })
})

$('#logout-btn').on('click', () => {
    console.log("process logout");
    // $('#content-list').val("asdsad")
    localStorage.clear()
    signOut()
    beforeLogin()
});

// form login
$('#login-btn').on('click', () => {
    $('#regist-form').hide()
    $('#login-form').show()

});

// form regist
$('#regist-btn').on('click', () => {
    $('#login-form').hide()
    $('#regist-form').show()
});

//login & regist form
$('#regist-form-btn').on('click', () => {
    const $fullname = $('#fullname-form-regist').val()
    const $email = $('#email-form-regist').val()
    const $password = $('#pass-form-regist').val()
    console.log("process regist");
    if ($fullname && $email && $password) {
        console.log($fullname, $email, $password);
    }
})
const URL = `http://127.0.0.1:3000/`
$('#login-form-btn').on('click', (event) => {
    const email = $('#email-form-login').val()
    const password = $('#pass-form-login').val()
    console.log("process login");
    event.preventDefault()
    if (email && password) {
        $.ajax({
            url: `${URL}login`,
            method: "POST",
            data: {
                email,
                password
            }
        })
            .done(result => {
                console.log(result);
                localStorage.setItem('access_token', result.access_token) //set token di client
                console.log('berhasil login', result)
                afterLogin()
            })
            .fail(err => {
                console.log(err)
                console.log(err.responseJSON.message);
            })
            .always(_ => {
                $('#email').val('')
                $('#password').val('')
            })
        // console.log($email, $password);
    }
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token); 
    $.ajax({
        url: `${URL}google-login`,
        method: "POST",
        data: {
            id_token,
        }
    })
        .done(result => { 
            console.log('berhasil login', result)
            localStorage.setItem('access_token', result.access_token) //set token di client
            afterLogin()
        })
        .fail(err => {
            console.log(err)
            // console.log(err.responseJSON.message);
        })
        .always(_ => {
            $('#email').val('')
            $('#password').val('')
        })
}


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }