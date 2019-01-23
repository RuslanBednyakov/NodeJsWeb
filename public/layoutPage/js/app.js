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

          this.signInEmailInput = document.getElementById('sign-in_email');
          this.signInPasswordInput = document.getElementById('sign-in_password');
          this.signInSubmitButton = document.getElementById('sign-in_submit-button');
          this.signInErrorContainer = document.getElementById('sign-in_error');

          this.signUpEmailInput = document.getElementById('sign-up_email');
          this.signUpNameInput = document.getElementById('sign-up_name');
          this.signUpPasswordInput = document.getElementById('sign-up_password');
          this.signUpPasswordConfirmInput = document.getElementById('sign-up_password-confirm');
          this.signUpSubmitButton = document.getElementById('sign-up_submit-button');
          this.signUpErrorContainer = document.getElementById('sign-up_error');


          this.currentPageName = this.getCurrentPageName();
          this.user = null;
          this.pageObject = null;
          this.search = new Search(this.api, this.user, this.searchContainer, this.searchCount);
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

        const signInPageDomElements = {
          signInEmail: this.signInEmailInput,
          signInPassword: this.signInPasswordInput,
          signInErrorContainer: this.signInErrorContainer
        };

        const signIn = new SignIn(this.api, signInPageDomElements);
        signIn.submit();
      },

      signUp: function(){

        const signUpPageDomElements = {
          signUpEmail: this.signUpEmailInput,
          signUpName: this.signUpNameInput,
          signUpPassword: this.signUpPasswordInput,
          signUpPasswordConfirm: this.signUpPasswordConfirmInput,
          signUpErrorContainer: this.signUpErrorContainer
        };

        const signUp = new SignUp(this.api, signUpPageDomElements);
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

      initNewsPage: function() {

        this.newsPagePostsContainer = document.getElementById('news__list');

        const newsDomElements = {
          newsPostsContainer: this.newsPagePostsContainer
        }

        return newsDomElements;
      },

      renderNewsPage: function() {

        const newsDomElements = this.initNewsPage();

        this.pageObject = new NewsPage(this.api, this.user, newsDomElements);
        this.pageObject.render();
      },

      initMyFriendsPage: function() {

        this.myFriendsContainer = document.getElementById('friends__list');

        const myFriendsDomElements = {
          myFriendsContainer: this.myFriendsContainer
        }

        return myFriendsDomElements;
      },

      renderMyFriendsPage: function() {

        const myFriendsDomElements = this.initMyFriendsPage();

        this.pageObject = new MyFriendsPage(this.api, this.user, myFriendsDomElements);
        this.pageObject.render();
      },

      renderPage: function(page) {

        switch (page) {

          case '/my-page': 
    
            this.renderMyPage();
            break;

          case '/news': 
    
            this.renderNewsPage();
            break;

          case '/friends': 
    
            this.renderMyFriendsPage();
            break;
    
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

          this.search.setUser(this.user);
          this.search.render();
          return;
        };

        const currentPageName = this.currentPageName;
        this.renderPage(currentPageName);

      },
  }
  return new App();
})()