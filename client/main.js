$( document ).ready(function() {
   console.log('refresh!')
   if (localStorage.access_token) {
       afterLogin()
       console.log('aaa')
   }
   else {
       beforeLogin()
       console.log('bbb')
   }
  });

  function loginApp(event) {
    event.preventDefault()
      let email = $("#emailLogin").val()
      let password = $("#passwordLogin").val()
      console.log(email, password)

      $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
        data: { 
          email, 
          password
        }
      })
        .done(result=> {
          console.log('sukses')
          localStorage.access_token = result.access_token
          afterLogin()
        })
        .fail(function(err) {
          alert( "error" );
        })
      }
      function registerApp() {
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
                console.log(response);
                localStorage.setItem('access_token', response.access_token)
                afterLogin()
    
            })
            .fail((error) => {
                console.log('error', error);
            })
    }

  function afterLogin() {
    $(".after-login").show()
    $(".before-login").hide()
    $(".register").hide()
  
  }
  function beforeLogin() {
    $(".before-login").show()
    $(".after-login").hide()
    $(".register").hide()
  }
  function register() {
    $(".before-login").hide()
    $(".after-login").hide()
    $(".register").show()
}


  $('#btn-register').on('click', (event) => {
    event.preventDefault()
    registerApp()
})
$('#btn-login').on('click', (event) => {
    event.preventDefault()
    loginApp()
})

$('#a-register').on('click', (event) => {
    event.preventDefault()
    register()

})
$('#a-cancel').on('click', (event) => {
    event.preventDefault()
    login()

})
$('#logout-btn').click(() => {
    // localStorage.removeItem('access_token')
    signOut()
    $('#emailLogin').val('')
    $('#passwordLogin').val('')
    localStorage.clear()
    login()
})
