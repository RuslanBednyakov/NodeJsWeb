const SignIn = class {

    constructor(api, signInData, errorContainer) {
        this.api = api;
        this.data = signInData;
        this.errorContainer = errorContainer;
        this.path = 'auth/sign-in';
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
                    document.location.replace('/my-page');
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