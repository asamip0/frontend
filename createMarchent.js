function onBtnClick() {
    const btn = document.getElementById("create")

    btn.addEventListener("click", createMarchent)
}


function handleDisplayFormBtn() {
    const btn = document.getElementById("createBtnDisplay")

    btn.addEventListener("click", displayForm)
}


function displayActiveMerchants() {
    fetchActiveMerchants();
}


async function setResponse(response) {
    let activeMerchants = await response.json();
    let div = document.getElementById("activeM")
    let table = document.getElementById('table');

    activeMerchants.activeMerchants.forEach((element, index) => {
        let row = document.createElement('tr');

        let sn = document.createElement('td');
        let name = document.createElement("td");
        let email = document.createElement("td");
        let Phone = document.createElement("td");
        let key = document.createElement("td");


        sn.innerHTML = index + 1;
        name.innerHTML = element.name;
        email.innerHTML = element.email;
        Phone.innerHTML = element.phone;
        key.innerHTML = element.privateKey;



        table.appendChild(row);
        row.appendChild(sn);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(Phone);
        row.appendChild(key);
    });



}

function fetchActiveMerchants() {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem('token'));


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    fetch("http://localhost:4000/api/merchant/activeMerchants", requestOptions)
        .then(response => setResponse(response))

    .catch(error => console.log('error', error));

}


function displayForm() {


    let form = document.getElementById("createM")

    const btn = document.getElementById("createBtnDisplay");

    if (btn.innerHTML == "Create Merchant") {

        document.getElementById("h11").innerHTML = "Create Merchant";

        document.getElementById("activeM").style.display = "none"

        form.style.display = "block";

        btn.innerHTML = "Active Merchant"
    } else {
        document.getElementById("h11").innerHTML = "Active Merchant";


        btn.innerHTML = "Create Merchant";

        document.getElementById("activeM").style.display = "block"


        form.style.display = "none";
    }
}

async function createMarchent() {


    const name = document.getElementById("fname").value;
    const email = document.getElementById("ea").value;
    const phone = document.getElementById("pn").value;
    const add = document.getElementById("address").value;
    const mid = document.getElementById("mid").value;
    const pkey = document.getElementById("pkey").value;


    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem('token'));

    var raw = JSON.stringify({
        "name": name,
        "address": add,
        "phone": phone,
        "email": email,
        "privateKey": pkey,
        "merchantId": mid,

    });
    console.log(raw)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:4000/api/admin/create/merchant", requestOptions)
        .then(response => {
            console.log(response)
        })

    .catch(error => alert(error));

}

displayActiveMerchants();
handleDisplayFormBtn();
onBtnClick();