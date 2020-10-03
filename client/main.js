$(document).ready(() => {
    if (localStorage.access_token) {
        homePage()
    } else {
        loginPage()
    }
})

//VIEW --------------------------------------

const loginPage = () => {
    $('#loginPage').show()
    $('#registerPage').hide()
    $('#todo').hide()


}

const registerPage = () => {
    $('#loginPage').hide()
    $('#registerPage').show()
    $('#todo').hide()


}

const homePage = () => {
    $('#loginPage').hide()
    $('#registerPage').hide()
    $('#homePage').show()
    $('#sideNav').show()


    fetchData()


}

//BUTTON -------------------------------------------

//REGISTER from login page
$('#a-register').on('click', (event) => {
    event.preventDefault()
    registerPage()

})

//CANCEL from register page
$('#a-back').on('click', (event) => {
    event.preventDefault()
    loginPage()

})

//REGISTER BUTTON
$('#btn-register').on('click', (event) => {
    event.preventDefault()
    userRegister()

})

//login BUTTON
$('#btn-login').on('click', (event) => {
    event.preventDefault()
    userLogin()

})


//logout BUTTON
$('#btn-logout').click(() => {
    // localStorage.removeItem('access_token')
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
    localStorage.clear()
    loginPage()
})

//CREATE todo BUTTON
$('#btn-addTodo').on('click', (event) => {
    event.preventDefault()
    addTodo()

})

//DELETE todo BUTTON





//ACTION---------------------------------------------------------

const userRegister = () => {
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()

    console.log(email, password);
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }

    })
        .done(response => {
            console.log(response, '<-----ini respon register');
            loginPage()
        })
        .fail((error) => {
            console.log('error', error);
        })

}


//Fungsi LOGIN
const userLogin = () => {
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()
    console.log(email, password);

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            homePage()

        })
        .fail((error) => {
            console.log('error', error);
        })

}


//fungsi Fetch DATA
const fetchData = () => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos/',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            console.log(result);
            result.forEach(data => {
                $('#list').append(`
                <div class="card " id="card">
                <div class="header">
                    <div>
                        <h5 class="card-title">${data.title}</h5>
                    </div>
                </div>
                <div class="card-body" >
                    <p class="card-text">${data.description}</p>
                </div>
                <div class="cardButton">
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#editModal" data-whatever="@mdo">Edit</a>
                    <a href="#" class="btn btn-danger" id="btn-delete" onclick="deleteTodo(${data.id})">delete</a>
            </div>
                `)

            });
        })
        .fail((error) => {
            console.log('error', error);
        })
}

//CREATE TODO
const addTodo = () => {
    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#dueDate').val()
    console.log(title, description, due_date);

    $.ajax({
        method: "POST",
        url: `http://localhost:3000/todos/`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(result => {
            $('#title').val('')
            $('#description').val('')
            $('#due_date').val('')
            homePage()
        })
        .fail(err => {
            $('#title').val('')
            $('#description').val('')
            $('#due_date').val('')
        })

}


//DELETE TODO
function deleteTodo(id) {
    console.log(id);

    $.ajax({
        url: `${URL}http://localhost:3000/todos/${id}`,
        method: "DELETE",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        params: {
            id: id
        }
    })
        .done(result => {
            console.log('berhasil terhapus', result)
            fetchData()
        })
        .fail(err => {
            console.log(err)
        })
}