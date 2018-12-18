const App = (function (){

  const App = function(){
  }

  App.prototype = {
      run: function(){
          this.init();
          this.attachEvents();
          this.render();
      },

      init: function(){

          this.config = new Config();
          this.api = new Api(this.config);
          
          this.searchButton = document.getElementById('search__bar_button');
          this.searchInput = document.getElementById('search__bar');
          this.searchContainer = document.getElementById('search__list');
          this.searchCount = document.getElementById('search__count');
          this.logOutSubmitButton = document.getElementById('logOut');
          this.signInEmailInput = document.getElementById('email');
          this.signInPasswordInput = document.getElementById('password');
          this.signInSubmitButton = document.getElementById('submit');
          this.signInErrorContainer = document.getElementById('error');
          this.signUpNameInput = document.getElementById('registrationName');
          this.signUpEmailInput = document.getElementById('registrationEmail');
          this.signUpPasswordInput = document.getElementById('registrationPassword');
          this.signUpSubmitButton = document.getElementById('registrationButton');

          this.search = new SearchU(this.api, this.searchContainer, this.searchCount);
      },

      attachEvents: function(){
          this.searchButton.addEventListener("click", this.searchUsers.bind(this));
          if (this.logOutSubmitButton) {
            this.logOutSubmitButton.addEventListener("click", this.logOut.bind(this));
          };
          if (this.signInSubmitButton) {
            this.signInSubmitButton.addEventListener("click", this.signIn.bind(this));
          };
          if (this.signUpSubmitButton) {
            this.signUpSubmitButton.addEventListener("click", this.signUp.bind(this));
          }
      },

      searchUsers: function() {

        const searchData = this.searchInput.value;

        this.search.setSearchData(searchData);
        this.search.redirectToSearchPage();

      },

      logOut: function() {

        const logOut = new LogOut(this.api);
        logOut.commit();
      },

      signIn: function() {

        const signInEmailInputValue = this.signInEmailInput.value;
        const signInPasswordInputValue = this.signInPasswordInput.value;
        const signInData = {
          email: signInEmailInputValue,
          password: signInPasswordInputValue
        };

        const signIn = new SignIn(this.api, signInData, this.signInErrorContainer);
        signIn.submit();
      },

      signUp: function(){

        const signUpNameInputValue = this.signUpNameInput.value;
        const signUpEmailInputValue = this.signUpEmailInput.value;
        const signUpPasswordInputValue = this.signUpPasswordInput.value;
        const signUpData = {
          name: signUpNameInputValue,
          email: signUpEmailInputValue,
          password: signUpPasswordInputValue,
        };

        const signUp = new SignUp(this.api, signUpData);
        signUp.submit();
      },

      render: function(){

        const currentSearchInputValue = this.search.getSearchData()

        if(currentSearchInputValue) {

          this.search.render();
          return;
        }
      },
  }
  return new App();
})()