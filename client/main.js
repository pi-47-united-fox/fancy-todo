$(document).ready(() => {
	if (localStorage.access_token) {
		afterLogin();
	} else {
		beforeLogin();
	}
});

const beforeLogin = () => {
	$(".before-login").show();
	$(".after-login").hide();
};

const afterLogin = () => {
	$(".before-login").hide();
	$(".after-login").show();
};

const hideall = () => {
	$(".before-login").hide();
	$(".after-login").hide();
};

const login = (event) => {
	event.preventDefault();
	$("#loginError").remove();
	const email = $("#email").val();
	const password = $("#password").val();
	$.ajax({
		url: "http://localhost:3000/login",
		method: "POST",
		data: { email, password },
	})
		.done(({ access_token }) => {
			$("registerEmail").val();
			localStorage.access_token = access_token;
			$("#loginForm")[0].reset();
			afterLogin();
		})
		.fail(({ responseJSON }) => {
			console.log(responseJSON.message);
			$("#loginError").append(responseJSON.message);
			beforeLogin();
		});
};

$(document).ready(() => {
	$("#logout").click(() => {
		localStorage.clear();
		signOut();
		beforeLogin();
	});
});

const signOut = () => {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
	});
};

$(document).ready(() => {
	$("#registerShow").click(() => {
		hideall();
		$("#registerDiv").load("./register.html");
	});
});

const register = (event) => {
	event.preventDefault();
	const userData = {
		email: $("#registerEmail").val(),
		password: $("#registerPassword").val(),
		first_name: $("#first_name").val(),
		last_name: $("#last_name").val(),
		gender: $("input[name='gender']:checked").val(),
	};
	$.ajax({
		url: "http://localhost:3000/register",
		method: "POST",
		data: userData,
	})
		.done((result) => {
			console.log(result);
			$("#registerForm").remove();
			beforeLogin();
		})
		.fail((err) => {
			console.log(err);
		});
};

const onSignIn = (googleUser) => {
	const token = googleUser.getAuthResponse().id_token;
	console.log(token);
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/googlesign",
		data: { token },
	}).done(({ access_token }) => {
		localStorage.access_token = access_token;
		afterLogin();
	});
};
