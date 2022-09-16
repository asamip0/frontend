function onBtnClick() {
    const btn = document.getElementById("loginBtn")

    btn.addEventListener("click", loginMarchent)

}
async function loginMarchent() {
    const id = document.getElementById("mail").value;
    const password = document.getElementById("pw").value;


    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": id,
        "password": password

    });


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:4000/api/merchant/login", requestOptions)
        .then(response => {
            redirect(response)
        })

    .catch(error => alert(error));
}


async function redirect(response) {

    let a = await response.json();

    if (a.token) {

        window.location.href = "./createpayment.html";
        localStorage.setItem('tokenM', a.token);


    } else {
        alert(a.message)
    }
}

onBtnClick();