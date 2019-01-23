const SignUp = class {
    
    constructor(api, signUpPageDomElements) {
        
        this.api = api;
        this.data = signUpPageDomElements;
        this.path = 'auth/sign-up';
        this.errors = [];
    }
    
    
    signUpEmailCheck(email) {

        if(!email) {
            this.errors.push('Please enter your email');
            return;
        }

        const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
        const isValid = reg.test(email);

        if(!isValid) this.errors.push('Incorrect email');
        return isValid;
    }

    signUpNameCheck(name) {

        if(!name) {
            this.errors.push('Please enter your name');
            return;
        }
        
        const reg = /^[\w]{1}[\w-\.]*[\w]{1}$/i;
        const isValid = reg.test(name);

        if(!isValid) this.errors.push('Incorrect name');
        return;
    }

    signUpPasswordCheck(pass, confirmPass) {

        if (!pass){
            this.errors.push("Please enter a passowrd");
            return;
        }

        if (!confirmPass) {
            this.errors.push("Please confirm passowrd");
            return;
        }

        if ( pass !== confirmPass) {
            this.errors.push("Passwords didn't match");
        }
        return;
    }
    
    getSignUpData() {
    
        const signUpEmailInputValue = this.data.signUpEmail.value;
        this.signUpEmailCheck(signUpEmailInputValue);
    
        const signUpNameInputValue = this.data.signUpName.value;
        this.signUpNameCheck(signUpNameInputValue);

        const signUpPasswordInputValue = this.data.signUpPassword.value;
        const signUpPasswordConfirmInput = this.data.signUpPasswordConfirm.value;
        this.signUpPasswordCheck(signUpPasswordInputValue, signUpPasswordConfirmInput);

        if(this.errors.length) return false;

        const signUpData = {
            email: signUpEmailInputValue,
            name: signUpNameInputValue,
            password: signUpPasswordInputValue,
        };

        return signUpData;
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

        while(this.data.signUpErrorContainer.lastChild){
            this.data.signUpErrorContainer.removeChild(this.data.signUpErrorContainer.lastChild);
        }

        this.errors.forEach((errorText) => {
            const errorDomElem = this.createElem('p', 'sign-up__container_error-text', errorText)

            this.data.signUpErrorContainer.appendChild(errorDomElem);
        })
        
        this.errors = [];
        return;
    }

    submit() {

        const signUpData = this.getSignUpData();

        if(!signUpData) {
            this.showErrorTooltip();
            return;
        }

        this.api.post(this.path, signUpData)
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
                    this.errors.push(response.message);
                    this.showErrorTooltip();
                    return;
                }
            })
            .catch((error) => console.error(error))
    }

}