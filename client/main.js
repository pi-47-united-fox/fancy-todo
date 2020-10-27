
let datas = []

$(document).ready(function(){
    console.log('reaady tiap refresh')
    if(localStorage.access_token){
        afterLogin()
    }else{
        beforeLogin()
    }
})


// login google start   
function onSignIn(googleUser) {
    console.log('masukgooglelogin2')
  
    var id_token = googleUser.getAuthResponse().id_token;
      $.ajax({
        method:'POST',
        url:'http://localhost:2000/googlelogin',
        headers:{
          google_access_token:id_token
        }
      })
      .then(result=>{
        localStorage.setItem('userId',result.userId)
        localStorage.setItem('access_token',result.access_token)
      afterLogin()
      })
      .fail(err=>{
        console.log(err)
      })
    }
// login google  end


// logout google start
 
function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

// logout google end


$("#btn-logout").click(function(){
    localStorage.removeItem('access_token')
    signOutGoogle()
    beforeLogin()
})

$("#btn-register").click(function(){
    $("#register-form").show()
    $("#login-form").hide()
})

$("#btn-login").click(function(){
    $("#register-form").hide()
    $("#login-form").show()
})


function afterLogin(){
    $(".after-login").show()
    $(".before-login").hide()
    $("#btn-logout").show()
    $("#btn-login").hide()
    $("#btn-register").hide()
    fetchDatas()
}


function beforeLogin(){
    $(".before-login").show()
    $(".after-login").hide()
    $("#btn-logout").hide()
    $("#btn-login").show()
    $("#btn-register").show()
    $("#register-form").hide()
}



function registerUser(event){
    event.preventDefault()
    let email = $("#emailregister").val()
    let password = $("#passwordregister").val()
    console.log(email,password)

    $.ajax({
        method:'POST',
        url:'http://localhost:2000/register',
        data:{
            email,password
        }
    })
    .done(result=>{
        $("#register-form").hide()
        $("#login-form").show()
    })
    .fail(err=>{
        console.log(err)
    })
    
}

function loginApp(event){
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email,password)

    //ajax untuk request ke server

    $.ajax({
        method:'POST',
        url:'http://localhost:2000/login',
        data:{
            email,
            password
        }
    })
    .done(result=>{
        console.log(result,'logged in')
        localStorage.setItem('access_token',result.access_token)
        afterLogin()
    })
    .fail((error)=>{
        console.log(error,"error")
    })
    .always((complete)=>{
        console.log(complete,"complete")
    })
}

function editStatusTodo(id){
    let namaPoke = $("#add-pokemon").val()
    $.ajax({
        method:'PATCH',
        url:`http://localhost:2000/todos/${id}`,
        headers:{
            access_token:localStorage.access_token
        },
        data:{
            status:'sudah tertangkap'
        }
    })
    .done(result=>{
        fetchDatas()
        $("#data-pokemon-home").show()
        console.log(result)
    })
    .fail(err=>{
        console.log(err)
    })
}

function deleteTodo(id){
    $.ajax({
        method:'DELETE',
        url:`http://localhost:2000/todos/${id}`,
        headers:{
            access_token:localStorage.access_token
        }
    })
    .done(result=>{
        fetchDatas()
        $("#data-pokemon-home").show()
        console.log(result)
    })
    .fail(err=>{
        console.log(err)
    })
}




function fetchDatas(){
    $.ajax({
        method:'GET',
        url:'http://localhost:2000/todos',
        headers:{
            access_token:localStorage.access_token
        }
    })
    .done(result=>{
        console.log(result)
        datas = result
        $("#data-pokemon").empty()
       $.each(datas, function(key,value){
           $("#data-pokemon").append(`
           <div class="col-4 mb-5" style="text-align:center;">
            <div class="card" style="width: 18rem;">
                <img src="${value.imageurl}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <p class="card-text">status : ${value.status}</p>
                <p class="card-text">Maximal tangkap sebelum tanggal : ${value.due_date}</p>
                <button type="button" class="btn btn-primary" onClick="editStatusTodo(${value.id})">Selesai tangkap</button>
                <button type="button" class="btn btn-danger" onClick="deleteTodo(${value.id})">Delete</button>
                </div>
            </div>
           </div>
       `)
       })
    })
    .fail((error)=>{
        console.log(error,"error")
    })
    .always((complete)=>{
        console.log(complete,"complete")
    })
}


function addPokemon(event){
    event.preventDefault()
    let namaPoke = $("#add-pokemon").val()
    $("#data-pokemon-home").hide()
    $.ajax({
        method:'POST',
        url:`http://localhost:2000/todos?pokemon=${namaPoke}`,
        headers:{
            access_token:localStorage.access_token
        }
    })
    .done(result=>{
        fetchDatas()
        $("#data-pokemon-home").show()
        $("#add-pokemon").val("")
    })
    .fail(err=>{
        console.log(err)
    })
}