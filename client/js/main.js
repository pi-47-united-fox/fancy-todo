
const URL = `http://127.0.0.1:3000/`

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentDate = new Date()
$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
        
        // console.log("asdad",$('#weather-currentdate-label').val());
        // $('#weather-currentdate-label').append(`${days[date.getDay()]}`)
        $('#weather-currentdate-label').append(`${days[currentDate.getDay()]} - ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`)
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
    $('#nav-home-btn').addClass("active")
    $('#nav-addTodo-btn').removeClass("active")
    homePage()
})
$('#nav-addTodo-btn').on('click',()=>{
    $('#nav-home-btn').removeClass("active")
    $('#nav-addTodo-btn').addClass("active")
    addFormPage()
})

function homePage(){
    console.log("home");
    hideAll()
    $('#container-content').show()
    $('#content-list').show() 
    $('#logout-btn').show()
    hideFormAdd()
    loadData() 
}

function addFormPage(){ 
    $('#addFormContainer').show() 
}
function hideFormAdd(){
    console.log("asdas");
    $('#addFormContainer').hide()  
}

function afterLogin() {
    console.log("logged in");
    $('#login-btn').hide()
    $('#regist-btn').hide()
    $('#login-container').hide()
    homePage()
    $('#home_menu').show() 
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
    loginPage()
}
function loadWeather(){
    console.log("load");
    $('#loader-img').show()
    $.ajax({
        url: `${URL}API-getweather`,
        method: 'Get' 
    })
        .done(result=>{
            $('#weather-currentdate-label').empty() 
            $('#weather-current-label').empty() 
            $('#weather-currentdate-label').append(`${days[currentDate.getDay()]} - ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`) 
            $('#weather-current-label').append(` 
                ${result[0].weather[0].main} <p id="weather-day-label">${result[0].weather[0].description}</p>
            `)
            console.log(result[0]);
            
            let count = 0
            $('#card-weather-forecast').empty()

            result.forEach(el => {
                if(count>0){ 
                    let date = new Date(el.dt*1000) 
                    $('#card-weather-forecast').append(` 
                    <h6 id="weather-day-label">${days[date.getDay()]} - ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</h6>
                    <h7 id="weather-day-label"> > ${el.weather[0].main} - ${el.weather[0].description}</h7>  
                    <hr>
                    `)
                }
                count++
            });

            $('#loader-img').hide()
        })
        .fail(err=>{
            console.log(err);
        })
        // .always(()=>{

        // })
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
            $('.loader').hide() 
            $('#content-list').empty()
            $('#content-list-current').empty()
            console.log(data);
            let count = 0
            data.forEach(ele=>{
                let newDate = new Date(ele.due_date) 
                if(newDate.getDate() == currentDate.getDate() && newDate.getMonth() == currentDate.getMonth()){
                    count++
                    console.log("todays activity :", count);

                    $('#content-list-current').append(`  
                        <div class="col-8 mt-3">
                            <div class="card flex-col"  >
                                <div class="card-body" id="todo-card-${ele.id}">
                                    <h5 class="card-title">${ele.title}</h5> 
                                    <p class="card-text">${ele.description}</p>
                                    <a href="#" class="card-link" onClick="deleteTodo(${ele.id})">Delete</a>
                                    <a href="#" class="card-link" onClick="editTodo(${ele.id})">Edit Todo</a>
                                </div>
                            </div>
                        </div>
                    `) 
                }
                console.log("epoch time : ",ele.epoch);
                $('#content-list').append(`
                <div class="col mb-3">
                    <div class="card flex-col"  ">
                    <div class="card-body" id="todo-card-${ele.id}">
                        <h5 class="card-title">${ele.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                                ${days[newDate.getDay()]} - 
                                ${newDate.getDate()} 
                                ${months[newDate.getMonth()]} 
                                ${newDate.getFullYear()}</h6>
                        <p class="card-text">${ele.description}</p> 
                        <p class="card-text">Activity Type :${ele.activityType}</p>
                        <a href="#" class="card-link" onClick="deleteTodo(${ele.id})">Delete</a>
                        <a href="#" class="card-link" onClick="editTodo(${ele.id})">Edit Todo</a>
                    </div>
                    </div>
                </div>
                `)
            })
            if(count==0){ 
                $('#content-list-current').append(`
                <h4 class="mt-3">You have no schedule today</h4> <br>
                <a class="btn btn-primary mt-4" onClick="addFormPage()">add new Activity</a>
                `)
                
            }
        })
        .fail()
        .always()
}

function deleteTodo(todoId){
    
    if(confirm("Are you sure you want to delete this?")){ 
        console.log("deleting todo:",todoId);
        $.ajax({
            url:`${URL}todos/${todoId}`,
            method:'Delete',
            headers:{
                access_token:localStorage.access_token
            }
        })
            .done(result=>{
                console.log(result);
                loadData()
            })
            .fail(err=>{
                console.log(err);
            })
    }
    else{
        return false;
    }
}
 

function editTodo(todoId){
    console.log("edit todo:",todoId);
    $('.popup-form').show()
    
    $.ajax({
        url: `${URL}todos/${todoId}`,
        method: "GET",
        headers:{
            access_token:localStorage.access_token
        }
    })
        .done(result => {
            console.log(result);  
            let date = new Date(result.due_date)
            let month = date.getMonth()
            let day = date.getDate()
            if(date.getMonth()<9){ 
                month = `0${month+1}`
            }
            if(date.getDate()<10){ 
                day = `0${day}`
            }
            console.log(`${date.getFullYear()}-${month+1}-${day}`);
            $('#id-edit-input').val(result.id)
            $('#title-edit-input').val(result.title)
            $('#description-edit-input').val(result.description)
            $('#status-edit-input').val(result.status)
            $('#dueDate-edit-input').val(`${date.getFullYear()}-${month+1}-${day}`)
        })
        .fail(err => {
            console.log(err)
            console.log(err.responseJSON.message);
        })
        .always(_ => {
            // $('#title-add-input').val('')
            // $('#description-add-input').val('') 
            // $('#dueDate-add-input').val('')
            // $('#activityType-add-input').val('')
        })
}

$('#submit-edit-input').click(event=>{
    event.preventDefault()
    let id = $('#id-edit-input').val()
    let title = $('#title-edit-input').val()
    let description = $('#description-edit-input').val()
    let status = $('#status-edit-input').val()
    let due_date = $('#dueDate-edit-input').val()
    let activityType = $('#activityType-edit-input').val()
    console.log("id :", id);
    console.log("title :", title);
    console.log("description :", description);
    console.log("status :", status);
    console.log("due_date :", due_date);
    
    $.ajax({
        url:`${URL}todos/${id}`,
        method:`PUT`,
        headers:{ 
            access_token:localStorage.access_token
        },
        data:{ 
            title,
            description,
            status,
            due_date,
            activityType
        }
    })
        .done(result=>{
            $('.popup-form').hide()
            loadData()
            console.log(result);

        })
        .fail(err=>{
            console.log(err);
        })
})
$('#cancel-edit-input').click(event=>{
    event.preventDefault() 
    console.log("cancel");
    $('.popup-form').hide() 
})

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
            $('#title-add-input').val('')
            $('#description-add-input').val('') 
            $('#dueDate-add-input').val('')
            $('#activityType-add-input').val('')
            hideFormAdd()
            loadData()
        })
        .fail(err => { 
            console.log(err)
            console.log(err.responseJSON.message);
        })
        .always(_ => {
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
    loginPage()

});

function loginPage(){
    $('#log-nav').addClass("active")
    $('#regist-nav').removeClass("active")
    $('#regist-form').hide()
    $('#login-form').show()
}

// form regist
$('#regist-btn').on('click', () => {
    registPage()
});

function registPage(){ 
    $('#regist-nav').addClass("active")
    $('#log-nav').removeClass("active")
    $('#login-form').hide()
    $('#regist-form').show()
}

//login & regist form
$('#regist-form-btn').on('click', () => {
    const fullname = $('#fullname-form-regist').val()
    const email = $('#email-form-regist').val()
    const password = $('#pass-form-regist').val()
    console.log("process regist");
    if ( fullname && email && password) {
        console.log(fullname, email, password);
        $.ajax({
            url: `${URL}register`,
            method: "POST",
            data: {
                fullname,
                email,
                password
            }
        })
            .done(result => {
                // console.log(result);
                // localStorage.setItem('access_token', result.access_token) //set token di client
                console.log('berhasil mendaftar', result)
                loginPage()
            })
            .fail(err => {
                console.log(err)
                console.log(err.responseJSON.message);
            })
            .always(_ => {
                $('#fullname-form-regist').val('')
                $('#email-form-regist').val('')
                $('#pass-form-regist').val('')
            })
    }
})
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