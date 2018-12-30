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


          this.currentPageName = this.getCurrentPageName();
          this.user = null;
          this.pageObject = null;
          this.search = new Search(this.api, this.searchContainer, this.searchCount);
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

      getUser: function() {

        return this.api.post('/auth/user')
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
              if (response.message === 'User authorised') {
                return response.data.user
              }else {
                return null;
              }
          })
          .catch((error) => {             
              console.error('error', error);
          });
      },

      getCurrentPageName: function() {

        return document.location.pathname;
      },

      initMyPage: function() {

        this.myPageAvatarContainer = document.getElementById('user-avatar__container');
        this.myPageUserInfoContainer = document.getElementById('user-info__container');
        this.myPageUserPostsContainer = document.getElementById('user-posts__list');
        this.myPageAddPostInputTitle = document.getElementById('user-posts__newPostTitle');
        this.myPageAddPostTextareaContent = document.getElementById('user-posts__newPostContent');
        this.myPageAddPostButton = document.getElementById('user-posts__addPostButton');
        this.myPageAddPostError = document.getElementById('user-posts__error');

        const myPageDomElements = {
          avatarContainer: this.myPageAvatarContainer,
          userInfoContainer: this.myPageUserInfoContainer,
          userPostsContainer: this.myPageUserPostsContainer,
          addPostInputTitle: this.myPageAddPostInputTitle,
          addPostTextareaContent: this.myPageAddPostTextareaContent,
          addPostButton: this.myPageAddPostButton,
          addPostError: this.myPageAddPostError
        }

        return myPageDomElements;

      },

      renderMyPage: function() {

        const myPageDomElements = this.initMyPage();
        
        this.pageObject = new MyPage(this.api, this.user, myPageDomElements);
        this.pageObject.render();
      },

      renderPage: function(page) {

        switch (page) {

          case '/my-page': 
    
            this.renderMyPage();
            break;

          // case '/news': 
    
          //   this.renderNewsPage();
          //   break;
    
          default: return;
        }
      },


      render: async function(){

        const currentUser = await this.getUser();

        if( currentUser ) {
          this.user = new User(currentUser);
        };

        const currentSearchInputValue = this.search.getSearchData();

        if(currentSearchInputValue) {

          this.search.render();
          return;
        };

        const currentPageName = this.currentPageName;
        this.renderPage(currentPageName);

      },
  }
  return new App();
})()