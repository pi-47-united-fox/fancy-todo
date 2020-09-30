
let datas = []

$(document).ready(function(){
    console.log('reaady tiap refresh')
    if(localStorage.access_token){
        afterLogin()
    }else{
        beforeLogin()
    }
})


$("#btn-logout").click(function(){
    localStorage.removeItem('access_token')
    beforeLogin()
})


function afterLogin(){
    $(".after-login").show()
    $(".before-login").hide()
    fetchDatas()
}


function beforeLogin(){
    $(".before-login").show()
    $(".after-login").hide()
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
           <div class="col-sm">
            <div class="card" style="width: 18rem;">
                <img src="${value.imageurl}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <p class="card-text">${value.due_date}</p>
                <a href="#" class="btn btn-primary">Mark here if you catched the pokemon</a>
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