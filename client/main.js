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
	showAllTodo();
};

const hideall = () => {
	$(".before-login").hide();
	$(".after-login").hide();
};

// LOGIN AND LOGOUT
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
			$("#loginError").append(responseJSON.message);
			beforeLogin();
		});
};

const onSignIn = (googleUser) => {
	const token = googleUser.getAuthResponse().id_token;
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/googlesign",
		data: { token },
	}).done(({ access_token }) => {
		localStorage.access_token = access_token;
		afterLogin();
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

// TO HIDE AND SHOW REGISTER
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
			$("#registerForm").remove();
			beforeLogin();
		})
		.fail((err) => {
			console.log(err);
		});
};

const showAllTodo = () => {
	$.ajax({
		url: "http://localhost:3000/todos",
		method: "GET",
		headers: {
			access_token: localStorage.access_token,
		},
	})
		.done((result) => {
			$("#main-page-title").text("My Manga List");
			$(".row").empty();
			result.forEach((el) => {
				const status = el.status ? "Finished" : "Reading";
				$(".row").append(`
				<div class="card m-1" style="width: 17rem" id="todos-${el.id}">
					<img class="card-img-top" style="height: 20rem" src="${el.img_url}" alt="manga cover ${el.title}" />
					<div class="card-body">
						<h5 class="card-title">${el.title}</h5>
						<p class="card-text">${el.description}</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">Due Date: ${el.due_date}</li>
						<li class="list-group-item">Status: ${status}</li>
						<li class="list-group-item">Rating: ${el.score}</li>
					</ul>
					<div class="card-body">
						<button class="btn btn-outline-secondary" 
							type="button" onclick="deleteTodo(event, ${el.id})">Delete</button>
						<button class="btn btn-outline-secondary" 
							type="button" onclick="changeStatusTodo(event, ${el.id}, ${el.status})">Change Status</button>
					</div>
				</div>
				`);
			});
		})
		.fail((err) => {
			console.log(err);
		});
};

const deleteTodo = (event, id) => {
	event.preventDefault();
	$.ajax({
		url: `http://localhost:3000/todos/${id}`,
		method: "DELETE",
		headers: {
			access_token: localStorage.access_token,
		},
	})
		.done(() => {
			showAllTodo();
		})
		.fail((err) => {
			console.log(err);
		});
};

const changeStatusTodo = (event, id, status) => {
	event.preventDefault();
	$.ajax({
		url: `http://localhost:3000/todos/${id}`,
		method: "PATCH",
		headers: {
			Content_Type: "application/json",
			access_token: localStorage.access_token,
		},
		data: {
			status: status ? false : true,
		},
	})
		.done(() => {
			showAllTodo();
		})
		.fail((err) => {
			console.log(err);
		});
};

const searchManga = (event) => {
	event.preventDefault();
	const title = $("#search-manga").val();

	$.ajax({
		url: "http://localhost:3000/jikan/search",
		method: "POST",
		headers: {
			access_token: localStorage.access_token,
		},
		data: { title },
	})
		.done((result) => {
			$("#main-page-title").text("Search Result");
			$(".row").empty();
			result.forEach((el) => {
				$(".row").append(`
				<div class="card m-1" style="width: 17rem">
					<img class="card-img-top" style="height: 20rem" src="${el.image_url}" alt="manga cover ${el.title}" />
					<div class="card-body">
						<h5 class="card-title">${el.title}</h5>
						<p class="card-text">${el.synopsis}</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">Rating: ${el.score}</li>
						<li class="list-group-item">Status: <br>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="status-${el.title}" value="true">
								<label class="form-check-label" for="status-${el.title}">Finished</label>
					  		</div>
					  		<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="status-${el.title}" value="false">
								<label class="form-check-label" for="status-${el.title}">Reading</label>
					  		</div>
						</li>
						<li class="list-group-item">Due Date: 
							<input type="date" class="form-control-inline" id="dueDate-${el.title}">
						</li>
					</ul>
					<div class="card-body">
						<button 
							class="btn btn-outline-secondary" 
							type="button" 
							onclick="addManga(event, '${el.title}', '${el.synopsis}', '${el.image_url}', '${el.score}')"
						>
							Add to List
						</button>
					</div>
				</div>
				`);
			});
		})
		.fail((err) => {
			console.log(err);
		});
};

const addManga = (event, title, description, img_url, score) => {
	event.preventDefault();
	$.ajax({
		url: "http://localhost:3000/todos",
		method: "POST",
		headers: {
			access_token: localStorage.access_token,
		},
		data: {
			title,
			description,
			img_url,
			score,
			status: $(`input[name="status-${title}"]:checked`).val(),
			due_date: $(`input[id="dueDate-${title}"]`).val(),
		},
	})
		.done(() => {
			showAllTodo();
		})
		.fail((err) => {
			console.log(err);
		});
};
