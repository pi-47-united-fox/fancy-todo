
const homeUrl = "http://localhost:3000"

$(document).ready(() => {
    if (localStorage.access_token) {
        fetchTodo()
        afterLogin()

    } else {
        beforeLogin()
    }

})

// ++++++LOGIN+++++++++++++

$("#login").submit(function (ev) {
    ev.preventDefault()
    // alert("ok")
    let email = $("#inputEmail").val()
    let password = $("#inputPassword").val()
    $.ajax({
        method: "post",
        url: `${homeUrl}/login`,
        data: {
            email: `${email}`,
            password: `${password}`
        }
    })
        .done(response => {
            localStorage.setItem("access_token", response.access_token)
            fetchTodo()
            afterLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#login').trigger("reset")

        })
})

//++++ADD NEW TODO++++

$("#add-todo").submit((ev) => {
    ev.preventDefault()
    console.log("oke")
    let title = $("#inputTitle").val()
    let description = $("#inputDescription").val()
    let due_date = $("#inputDate").val()
    let status = $("input[type=radio][name=status]:checked").val()
    let restaurant = $("#inputResto").val()
    console.log(title, description, due_date, status, restaurant)

    $.ajax({
        method: "POST",
        url: `${homeUrl}/todos?food=${restaurant}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    })
        .done(data => {
            console.log(data)
            fetchTodo()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#add-todo').trigger("reset")
        })
})




//+++++LOGOUT+++++++

$("#logoutNav").click(() => {
    beforeLogin()
    localStorage.clear()
})

//++++++++DELETE++++++++++++

const deleteTodo = (id) => {

    $.ajax({
        method: "DELETE",
        url: `${homeUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(data => {
            fetchTodo()
        })
        .fail(err => {
            console.log(err)
        })
}

//++++++++GET ALL TODO +++++++++++

const fetchTodo = () => {

    $.ajax({
        method: "GET",
        url: `${homeUrl}/todos`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(dataTodo => {
            $("#listTodo").empty()
            dataTodo.forEach(el => {
                $("#listTodo").append(`<div class="col-sm-4 mb-3">
       <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
             <div class="card-header">${el.title}</div>
             <div class="card-body">
                 <h5 class="card-title">${new Date(el.due_date)}</h5>
                 <p class="card-text">${el.description}.</p>
                 <label for="true">Status</label>
                 <p>${el.status === true ? "done" : "undone"}</p>
                 <div>
                 <div class="card-footer bg-transparent border-dark">
                    <div class="my-auto">
                        <button type="button" class="btn btn-warning btn-sm mx-3" id="hide" >Update</button>
                        <button type="button" class="btn btn-warning btn-sm my-1" id="show" onclick="deleteTodo(${el.id})">Delete</button>
                    </div>
                 </div>
        
             </div>
         </div>
     </div>`)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

//+++++REGISTER++++++
$("#newRegister").submit((ev) => {
    ev.preventDefault()
    let email = $("#registerEmail").val()
    let name = $("#registerName").val()
    let password = $("#registerPassword").val()
    console.log(email, name, password)
    $.ajax({
        method: "POST",
        url: `${homeUrl}/register`,
        data: {
            email,
            name,
            password
        }
    })
        .done(resp => {
            succesLogin()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            $('#newRegister').trigger("reset")
        })
})

function beforeLogin() {

    $("#main-page").hide()
    $("#form-login").show()
    $("#formRegister").hide()
    $("#logoutNav").hide()
    $("#addTodo").hide()
    $("#succesLogin").hide()
}

function afterLogin() {

    $("#main-page").show()
    $("#form-login").hide()
    $("#formRegister").hide()
    $("#logoutNav").show()
    $("#loginNav").hide()
    $("#registerNav").hide()
    $("#addTodo").hide()

}

function gotoRegister() {
    $("#main-page").hide()
    $("#form-login").hide()
    $("#formRegister").show()
}


//+++BUTTON ADD NEW TODO ++++
let addNewTodo = () => {
    $("#addTodo").show()
    $("#main-page").hide()
}

let succesLogin = () => {
    beforeLogin()
    $("#succesLogin").show()
}