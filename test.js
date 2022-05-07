

sendEmail = function () {
    const name = document.getElementById('userName').value
    const email = document.getElementById('userEmail').value;
    const msg = document.getElementById('userMsg').value;
    const params = {
        from_name: name,
        email_id: email,
        message: msg,
    }
    // emailjs.sendForm('service_gnaxs4m', 'template_sawg1sh', params)
    //     .then(function () {
    //         console.log('SUCCESS!');
    //     }, function (error) {
    //         console.log('FAILED...', error);
    //     });
    // console.log('sdsd');
     
    emailjs.send("service_gnaxs4m","template_sawg1sh",params)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}