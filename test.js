
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
    hideErrorFields();
    validate(params);
    return;
    emailjs.send("service_gnaxs4m", "template_sawg1sh", params, "arl--CRC4wsn1bJXB")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}

validate = function(params){
    if(!(params.from_name.length > 1)){
        document.getElementsByClassName('error-message')[0].classList.remove('hidden');
        input1.classList.add('error');
        return false;
    }

    if(!isEmail(params.email_id)){
        document.getElementsByClassName('error-message')[1].classList.remove('hidden');
        input2.classList.add('error');
        return false;
    }

    if(!(params.message.length > 10)){
        document.getElementsByClassName('error-message')[2].classList.remove('hidden');
        input3.classList.add('error');
        return false;
    }

    return true;
    console.log('verified');
}

function isEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

function hideErrorFields(){
    input3.classList.remove('error');
    input2.classList.remove('error');
    input1.classList.remove('error');
    document.getElementsByClassName('error-message')[0].classList.add('hidden');
    document.getElementsByClassName('error-message')[1].classList.add('hidden');
    document.getElementsByClassName('error-message')[2].classList.add('hidden');
}