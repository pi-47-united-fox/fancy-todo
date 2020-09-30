let todo = []

$(document).ready(function () {
    if (localStorage.access_token) {
        console.log("berhasil masuk homepage");
        afterLogin()
    } else {
        beforeLogin()
        // console.log("berhasil masuk login");

    }
});



function afterLogin() {
    fetchTodos()
    $('#login').hide()
    $('#register').hide()
    $('#listTodo').show()

}

function beforeLogin() {
    $('#login').show()
    $('#register').hide()
    $('#listTodo').hide()

}

function loginApp() {
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
        .done(result => {
            console.log(result, '<----sukses login')

        })
        .fail((error) => {
            console.log('error', error);
        })
}

function fetchTodos() {

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos/',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            result.forEach(data => {
                $('#todoTable').append(`
                <tr>
                                <td>${data.title}</td>
                                <td>${data.description}</td>
                                <td>${data.status}</td>
                                <td>${data.due_date}</td>
                                <td>
                                    <p data-placement="top" data-toggle="tooltip" title="Edit"><button
                                            class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal"
                                            data-target="#edit"><span
                                                class="glyphicon glyphicon-pencil">Edit</span></button>
                                    </p>
                                </td>
                                <td>
                                    <p data-placement="top" data-toggle="tooltip" title="Delete"><button
                                            class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal"
                                            data-target="#delete"><span
                                                class="glyphicon glyphicon-trash">Delete</span></button>
                                    </p>
                                </td>
                            </tr>
                `)
            });
        })
        .fail((error) => {
            console.log('error', error);
        })
}

$('#btn-login').on('click', (event) => {
    event.preventDefault()
    loginApp()
})