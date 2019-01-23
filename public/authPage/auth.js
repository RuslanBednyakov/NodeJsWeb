const SignIn = class {

    constructor(api, signInPageDomElements) {

        this.api = api;
        this.data = signInPageDomElements;
        this.path = 'auth/sign-in';
        this.errors = [];
    }


    signInEmailCheck(email) {

        if(!email) {
            this.errors.push('Please enter your email');
            return;
        }

        const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
        const isValid = reg.test(email);

        if(!isValid) this.errors.push('Incorrect email');
        return isValid;
    }

    signInPasswordCheck(pass) {

        if (!pass) this.errors.push("Please enter your passowrd");

        return;
    }

    getSignInData() {
    
        const signInEmailInputValue = this.data.signInEmail.value;
        this.signInEmailCheck(signInEmailInputValue);

        const signInPasswordInputValue = this.data.signInPassword.value;
        this.signInPasswordCheck(signInPasswordInputValue);

        if(this.errors.length) return false;

        const signInData = {
            email: signInEmailInputValue,
            password: signInPasswordInputValue,
        };

        return signInData;
    }

    createElem(newElem, elemClass, elemText) {

        const elem = document.createElement(newElem);
        elem.classList.add(elemClass);
    
        if (elemText) {
    
            const text = document.createTextNode(elemText);
            elem.appendChild(text);
        };
    
        return elem;
    }


    showErrorTooltip() {

        while(this.data.signInErrorContainer.lastChild){
            this.data.signInErrorContainer.removeChild(this.data.signInErrorContainer.lastChild);
        }

        this.errors.forEach((errorText) => {
            const errorDomElem = this.createElem('p', 'sign-in__container_error-text', errorText)

            this.data.signInErrorContainer.appendChild(errorDomElem);
        })
        
        this.errors = [];
        return;
    }

    submit() {

        const signInData = this.getSignInData();

        if(!signInData) {
            this.showErrorTooltip();
            return;
        }

        this.api.post(this.path, signInData)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
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
                    this.errors.push(response.message);
                    this.showErrorTooltip();
                    return;
                }
            })
            .catch((error) => {
                this.errors.push(error.response.data.message);
                this.showErrorTooltip();
                console.error('error', error);
                return;
            });
    }
}