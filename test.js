
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
    if (validate(params)) {
        showLoader();
        emailjs.send("service_gnaxs4m", "template_sawg1sh", params, "arl--CRC4wsn1bJXB")
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                emailAnimation();
                hideLoader();
                resetInputFields();
            }, function (error) {
                console.log('FAILED...', error);
                hideLoader();
                resetInputFields();
            });
    };

}

validate = function (params) {
    if (!(params.from_name.length > 1)) {
        document.getElementsByClassName('error-message')[0].classList.remove('hidden');
        input1.classList.add('error');
        return false;
    }

    if (!isEmail(params.email_id)) {
        document.getElementsByClassName('error-message')[1].classList.remove('hidden');
        input2.classList.add('error');
        return false;
    }

    if (!(params.message.length > 10)) {
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

function resetInputFields() {
    input1.value = "";
    input2.value = "";
    input3.value = "";
}
function hideErrorFields() {
    input3.classList.remove('error');
    input2.classList.remove('error');
    input1.classList.remove('error');
    document.getElementsByClassName('error-message')[0].classList.add('hidden');
    document.getElementsByClassName('error-message')[1].classList.add('hidden');
    document.getElementsByClassName('error-message')[2].classList.add('hidden');
}

function showLoader() {
    document.getElementsByClassName('loader')[0].classList.remove('hidden');
    document.getElementsByClassName('default-text')[0].classList.add('hidden');
}

function hideLoader() {
    document.getElementsByClassName('loader')[0].classList.add('hidden');
    document.getElementsByClassName('default-text')[0].classList.remove('hidden');
}

function emailAnimation() {
    document.querySelectorAll('.button').forEach(button => {
        let getVar = variable => getComputedStyle(button).getPropertyValue(variable);
        //button.addEventListener('click', e => {
        if (!button.classList.contains('active')) {
            button.classList.add('active');
            gsap.to(button, {
                keyframes: [{
                    '--left-wing-first-x': 50,
                    '--left-wing-first-y': 100,
                    '--right-wing-second-x': 50,
                    '--right-wing-second-y': 100,
                    duration: .2,
                    onComplete() {
                        gsap.set(button, {
                            '--left-wing-first-y': 0,
                            '--left-wing-second-x': 40,
                            '--left-wing-second-y': 100,
                            '--left-wing-third-x': 0,
                            '--left-wing-third-y': 100,
                            '--left-body-third-x': 40,
                            '--right-wing-first-x': 50,
                            '--right-wing-first-y': 0,
                            '--right-wing-second-x': 60,
                            '--right-wing-second-y': 100,
                            '--right-wing-third-x': 100,
                            '--right-wing-third-y': 100,
                            '--right-body-third-x': 60
                        })
                    }
                }, {
                    '--left-wing-third-x': 20,
                    '--left-wing-third-y': 90,
                    '--left-wing-second-y': 90,
                    '--left-body-third-y': 90,
                    '--right-wing-third-x': 80,
                    '--right-wing-third-y': 90,
                    '--right-body-third-y': 90,
                    '--right-wing-second-y': 90,
                    duration: .2
                }, {
                    '--rotate': 50,
                    '--left-wing-third-y': 95,
                    '--left-wing-third-x': 27,
                    '--right-body-third-x': 45,
                    '--right-wing-second-x': 45,
                    '--right-wing-third-x': 60,
                    '--right-wing-third-y': 83,
                    duration: .25
                }, {
                    '--rotate': 55,
                    '--plane-x': -8,
                    '--plane-y': 24,
                    duration: .2
                }, {
                    '--rotate': 40,
                    '--plane-x': 45,
                    '--plane-y': -180,
                    '--plane-opacity': 0,
                    duration: .3,
                    onComplete() {
                        setTimeout(() => {
                            button.removeAttribute('style');
                            gsap.fromTo(button, {
                                opacity: 0,
                                y: -8
                            }, {
                                opacity: 1,
                                y: 0,
                                clearProps: true,
                                duration: .3,
                                onComplete() {
                                    button.classList.remove('active');
                                }
                            })
                        }, 4000)
                    }
                }]
            })
            gsap.to(button, {
                keyframes: [{
                    '--text-opacity': 0,
                    '--border-radius': 0,
                    '--left-wing-background': getVar('--primary-darkest'),
                    '--right-wing-background': getVar('--primary-darkest'),
                    duration: .1
                }, {
                    '--left-wing-background': getVar('--primary'),
                    '--right-wing-background': getVar('--primary'),
                    duration: .1
                }, {
                    '--left-body-background': getVar('--primary-dark'),
                    '--right-body-background': getVar('--primary-darkest'),
                    duration: .4
                }, {
                    '--success-opacity': 1,
                    '--success-scale': 1,
                    duration: .25,
                    delay: .25
                }]
            })
        }
        //})
    });
}