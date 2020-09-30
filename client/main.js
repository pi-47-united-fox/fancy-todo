$(document).ready(function () {
    //console.log("ready!");
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

// const addForm = () =>{
//     $("#btn-add").show()

// }

const loginApp = (event) => {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()
    //console.log(email,password)

    //pakai ajax untuk http request ke server
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: { email, password }
    })
        .done(result => {
            //console.log(result,'sukses login')
            localStorage.setItem('access_token', result.access_token)
            afterLogin()
        })
        .fail(function (err) {
            //alert("error")
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
            //console.log(result)
            $("#anime-list").empty()
            $.each(result, (key, value) => {
                $("#anime-list").append(`
            <tr>
            <th scope="row">${value.title}</th>
            <td>${value.description}</td>
            <td>${value.status}</td>
            <td>${value.due_date}</td>
          </tr>
          `
                )
            })
        })
        .fail(err => {
            alert(err.responseJSON.message)
        })
}

function signOut(){
    localStorage.removeItem('acces_token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

}

$("#btn-logout").click(() => {
    localStorage.clear()
    //localStorage.removeItem('acces_token')
    signOut()
    $("#email").val('')
    $("#password").val('')
    beforeLogin()
})

$("#btn-add").click(()=>{
    $(".add-form").show()
    $(".anime-list").hide()
})

$("#btn-home").click(()=>{
    $(".anime-list").show()
    $(".add-form").hide()
})



function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    //console.log(id_token)

    $.ajax({
        method:'POST',
        url: 'http://localhost:3000/user/googleLogin',
        headers:{
            google_access_token
        }
    })
    .done(result=>{
        //console.log(result,'xsxsxss')
        localStorage.setItem('access_token',result.access_token)
        afterLogin()
    })
    .fail(err=>{
        alert(err)
    })
}


  