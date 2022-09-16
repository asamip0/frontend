function handleDisplayFormBtn() {
    const btn = document.getElementById("createBtnDisplay")

    btn.addEventListener("click", displayForm)
}

function displayActivePayments() {
    fetchActivePayments();
}

function displayForm() {


    let form = document.getElementById("createM")

    const btn = document.getElementById("createBtnDisplay");

    if (btn.innerHTML == "Create Payment") {

        document.getElementById("h11").innerHTML = "Create Payment";

        document.getElementById("activeM").style.display = "none"

        form.style.display = "block";

        btn.innerHTML = "Active Payment"
    } else {
        document.getElementById("h11").innerHTML = "Active Payment";


        btn.innerHTML = "Create Payment";

        document.getElementById("activeM").style.display = "block"


        form.style.display = "none";
    }
}

async function setResponse(response) {

    console.log(response)

    let payments = await response.json();
    let div = document.getElementById('activeP')
    let table = document.getElementById('table');
    payments.forEach((payment, index) => {
        let row = document.createElement('tr');
        let sn = document.createElement('td');
        let name = document.createElement('td');
        let email = document.createElement('td');
        let bill = document.createElement('td');
        let discount = document.createElement('td');
        let charges = document.createElement('td');
        let status = document.createElement('td');
        let urlLink = document.createElement('td');


        sn.innerHTML = index + 1;
        name.innerHTML = payment.customerName;
        email.innerHTML = payment.email;
        bill.innerHTML = payment.bill;
        discount.innerHTML = payment.discountAmount;
        charges.innerHTML = payment.additionalCharges;
        status.innerHTML = payment.status;
        urlLink.innerHTML = payment.linkGenerated;

        table.appendChild(row);
        row.appendChild(sn);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(bill);
        row.appendChild(discount);
        row.appendChild(charges);
        row.appendChild(status);
        row.appendChild(urlLink);

    })
}

function fetchActivePayments() {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem('tokenM'));


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    fetch("http://localhost:4000/api/payment", requestOptions)
        .then(response => setResponse(response))

    .catch(error => console.log('error', error));

}

function handleCreateBtnClick() {
    const btn = document.getElementById("createPayment");

    btn.addEventListener("click", createButtonClick);
}

async function createButtonClick() {
    const name = document.getElementById("fname").value;
    const email = document.getElementById("ea").value;
    const billAmount = document.getElementById("billAmount").value;
    const discount = document.getElementById("discount").value;
    const additionalCharge = document.getElementById("charge").value;


    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem('tokenM'));


    var raw = JSON.stringify({
        "customerName": name,
        "email": email,
        "bill": billAmount,
        "discountAmount": discount,
        "additionalCharges": additionalCharge,
        "remark": remark

    });

    // var raw = {
    //     customerName: name,
    //     email: email,
    //     bill: billAmount,
    //     discountAmount: discount,
    //     additionalCharges: additionalCharge,
    //     remark: remark

    // };

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:4000/api/payment/", requestOptions)
        .then(response => {
            // console.log(response)
            showLink(response);
        })

    .catch(error => alert(error));
}

async function showLink(resp) {
    const link = await resp.json();

    // alert(link.linkGenerated);
    console.log(link)
}

handleDisplayFormBtn();
handleCreateBtnClick();
displayActivePayments();