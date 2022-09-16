function btnClick() {
    const btn = document.getElementById('submit')
    btn.addEventListener('click', changePassword)
}

async function changePassword() {
    let email = document.getElementById('email').value
    let oldPassword = document.getElementById('oldPassword').value
    let newPassword = document.getElementById('newPassword').value

    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "oldPassword": oldPassword,
        "newPassword": newPassword
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:4000/api/merchant/change-password/", requestOptions)
        .then(response => {
            console.log(response);
            window.location.href = "./merchantlogin.html";
        }).catch(error => {
            alert(error)
        })


}

btnClick()