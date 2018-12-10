window.onload = function() {
  let logOut = document.getElementById('logOut');
  let logIn = document.getElementById('logIn');

    logOut.addEventListener('click', () => {

        const url = new URL('http://localhost:4000/api/v1/auth/logout');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: 'LogOut'}),
            redirect: 'follow'
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error
            }
            })
        .then((response) => {
            if (response.message === 'OK') {
                // localStorage.setItem('token', response.token);
                document.location.replace('/api/v1/sign-in');
            }else {
                throw response.message
            }
        })
        .catch((error) => {
            console.error('error',error);
            errorDiv.textContent = error;
        });
    });

    logIn.addEventListener('click', () => {
        axios.get('http://localhost:4000/api/v1/sign-in')
    });
};