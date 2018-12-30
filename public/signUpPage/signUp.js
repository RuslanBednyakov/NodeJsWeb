const SignUp = class {

    constructor(api, signUpData) {
        
        this.api = api;
        this.data = signUpData;
        this. path = 'auth/sign-up';
    }

    submit() {
        
        this.api.post(this.path, this.data)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    return error;
                }
            })
            .then((response) => {
                if (response.message === 'Sign-up successfully') {
                    document.location.replace('/sign-in')
                }else {
                    throw response.message
                }
            })
            .catch((error) => console.error(error))
    }
}