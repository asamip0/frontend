function submitBtnClick() {
    const btn = document.getElementById("submitBtn");

    btn.addEventListener("click", loginAdmin);
}



async function loginAdmin() {


    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'manual'
    };

    await fetch("http://localhost:4000/api/admin/login", requestOptions)
        .then(response => {
            redirect(response)
        })

    .catch(error => console.log('error', error));

}

async function redirect(response) {



    let a = await response.json();




    if (a.token) {

        window.location.href = "./create.html";
        localStorage.setItem('token', a.token);


    } else {
        alert(a.message)
    }
}







submitBtnClick();