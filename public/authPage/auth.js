const SignIn = class {

    constructor(api, signInData, errorContainer) {
        this.api = api;
        this.data = signInData;
        this.errorContainer = errorContainer;
        this. path = 'auth/sign-in';
    }

    submit() {

        this.api.post(this.path, this.data)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    this.errorContainer.textContent = '';
                    return response.data;
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    return error
                }
            })
            .then((response) => {
                if (response.message === 'Sign-in successfully.') {
                    // localStorage.setItem('token', response.token);
                    document.location.replace('/api/v1/home');
                }else {
                    throw response.message;
                }
            })
            .catch((error) => {
                this.errorContainer.textContent = error.response.data.message;                
                console.error('error', error);
            });
    }
}

// window.onload = function() {
//     let email = document.getElementById('email');
//     let password = document.getElementById('password');
//     let submit = document.getElementById('submit');
//     let errorDiv = document.getElementById('error');

//     submit.addEventListener('click', () => {

//         let loginData = {
//             email: email.value,
//             password: password.value,
//         };

//         api.post('auth/sign-in', loginData)
//             .then((response) => {
//                 if (response.status >= 200 && response.status < 300) {
//                     errorDiv.textContent = '';
//                     return response.data;
//                 } else {
//                     let error = new Error(response.statusText);
//                     error.response = response;
//                     return error
//                 }
//             })
//             .then((response) => {
//                 if (response.message === 'Sign-in successfully.') {
//                     // localStorage.setItem('token', response.token);
//                     document.location.replace('/api/v1/home');
//                 }else {
//                     throw response.message;
//                 }
//             })
//             .catch((error) => {
//                 errorDiv.textContent = error.response.data.message;                
//                 console.error('error', error);
//             });
//     });
// };