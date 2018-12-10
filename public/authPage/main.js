window.onload = function() {
    let name = document.getElementById('email');
    let password = document.getElementById('password');
    let submit = document.getElementById('submit');
    let errorDiv = document.getElementById('error');

    submit.addEventListener('click', () => {
        let loginData = {
            email: email.value,
            password: password.value,
        };

        const url = new URL('http://localhost:4000/api/v1/auth/sign-in');
        // url.search = new URLSearchParams(loginData);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            redirect: 'follow'
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    errorDiv.textContent = '';
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            })
            .then((response) => {
                if (response.message === 'Sign-in successfully.') {
                    // localStorage.setItem('token', response.token);
                    document.location.replace('/api/v1/home');
                }else {
                    throw response.message
                }
            })
            .catch((error) => {
                console.error('error',error);
                errorDiv.textContent = error;
            });
    });
};