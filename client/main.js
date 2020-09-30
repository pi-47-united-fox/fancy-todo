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
      let email = $("#email").val()
      let password = $("#password").val()
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
  
  function afterLogin() {
    $(".after-login").show()
    $(".before-login").hide()
  }
  function beforeLogin() {
    $(".before-login").show()
    $(".after-login").hide()

  }
  
