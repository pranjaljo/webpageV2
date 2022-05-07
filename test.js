
const input1 = document.getElementById('userName');
const input2 = document.getElementById('userEmail')
const input3 = document.getElementById('userMsg');
input1.onchange = function () {
    if (this.value != "" || this.value.length > 0) {
        input2.classList.remove('disable');
    } else {
        input2.classList.add('disable');
    }
}
input2.onchange = function () {
    if (this.value != "" || this.value.length > 0) {
        input3.classList.remove('disable');
    } else {
        input3.classList.add('disable');
    }
}

sendEmail = function () {
    const name = input1.value
    const email = input2.value;
    const msg = input3.value;
    const params = {
        from_name: name,
        email_id: email,
        message: msg,
    }
    emailjs.send("service_gnaxs4m", "template_sawg1sh", params, "arl--CRC4wsn1bJXB")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}