window.onload = function() {
    let name = document.getElementById('registrationName');
    let email = document.getElementById('registrationEmail');
    let password = document.getElementById('registrationPassword');
    // let avatar = document.getElementById('registrationAvatar');
    let button = document.getElementById('registrationButton');

    button.addEventListener('click', () => {
        fetch('http://localhost:4000/api/v1/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                // avatar: avatar.value,
            }),
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    return error.json()
                }
            })
            .then((response) => {
                if (response.message === 'Sign-up successfully') {
                    document.location.replace('/api/v1/sign-in')
                }else {
                    throw response.message
                }
            })
            .catch((error) => console.error(error))
    });
};