$(document).ready(() => {
    if (localStorage.access_token) {
        homePage()
    } else {
        loginPage()
    }
})

//VIEW --------------------------------------

const loginPage = () => {
    console.log('ini login page');

    $('#loginPage').show()
    $('#registerPage').hide()
    $('#homePage').hide()
    $('#sideNav').hide()




}

const registerPage = () => {
    $('#loginPage').hide()
    $('#registerPage').show()


}

const homePage = () => {
    $('#loginPage').hide()
    $('#registerPage').hide()
    $('#homePage').show()
    $('#sideNav').show()
    fetchData()
    weather()


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
$('#btn-logout').click((event) => {
    event.preventDefault()
    console.log('apa gitu');
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


// Edit todo BUTTON
$('#btn-updateTodo').on('click', (event) => {
    event.preventDefault()
    updateTodo()


})





//ACTION---------------------------------------------------------

const userRegister = () => {
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()

    // console.log(email, password);
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
            $('#list').empty()
            result.forEach(data => {
                let check
                if (data.status === false) {
                    check = ''
                } else {
                    check = 'checked'
                }
                $('#list').append(`
                <div class="card " id="card">
                <div class="header">
                    <div>
                        <h5 class="card-title">${data.title}</h5>
                        <h7>${formatDate(data.due_date)}</h7>
                    </div>
                </div>
                <div class="card-body" >
                    <p class="card-text">${data.description}</p>
                </div>
                <div class="form-check">
                <input type="checkbox" class="form-check-input" id="updateStatus" ${check} onclick="updateStatus(${data.id})">
                <label class="form-check-label" for="exampleCheck1">Complite?</label>
                </div>
                <div class="cardButton">
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#edit" onClick="edit(${data.id})">Edit</a>
                    <a href="#" class="btn btn-danger" id="btn-delete" onclick="deleteTodo(${data.id})">delete</a>
                </div>
                `)

            });
        })
        .fail((error) => {
            console.log('error', error);
        })
}


// GET EDIT 
const edit = (id) => {
    console.log('ini edit', id);
    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#dueDate').val()
    console.log(title, description, due_date);

    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            console.log(formatDate(result.due_date));
            console.log(result);
            $('#editTitle').val(result.title)
            $('#editDescription').val(result.description)
            $('#editDueDate').val(formatDate(result.due_date))
            $('#idedited').val(result.id)

        })
        .fail(err => {
            $('#title').val('')
            $('#description').val('')
            $('#due_date').val('')
        })
}

//POST EDIT
const updateTodo = () => {
    let title = $('#editTitle').val()
    let description = $('#editDescription').val()
    let due_date = $('#editDueDate').val()
    let id = $('#idedited').val()
    console.log(`berhasil edit ${id}`);
    console.log(`berhasil edit ${title}`);


    console.log(title, description, due_date);

    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title: title,
            description: description,
            due_date: due_date
        }
    })
        .done(result => {
            console.log(result);
            homePage()
        })
        .fail(err => {
            console.log(err);
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
            fetchData()
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
    // console.log(id);

    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: "DELETE",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            // console.log('berhasil terhapus', result)
            fetchData()
        })
        .fail(err => {
            console.log(err)
        })
}



const weather = () => {
    $('#weather-location-label').empty()
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/weather`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },

    })
        .done(response => {

            $('#weather-location-label').append(`
            <h2>${response.temp}&#8451;</h2>
            ${response.location}
            `)

        })
        .fail(err => {
            console.log(err);
        })
}

//FORMATED DATE
function formatDate(date) {
    var now = new Date(date);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return today = now.getFullYear() + "-" + (month) + "-" + (day)
}


//EDIT STATUS TODO

function updateStatus(id) {
    console.log(id);
    let status = $('#updateStatus').val()
    console.log(status);
    if ($(this).is(":checked")) {
        //'checked' event code
        status = false
    } else {
        status = true
    }

    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: "PATCH",
        data: {
            status
        },
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(result => {
            // console.log(result);
            fetchData()

        })
        .fail(err => {
            console.log(err)
        })

}

