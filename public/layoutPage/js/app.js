const App = (function (){

  const App = function(){
  }

  App.prototype = {
      run: function(){
          this.init();
          this.attachEvents();
          // this.render();
      },

      init: function(){
          // this.taskStorage = this.getStorage(this);
          // this.filter = new Filter();
          // if (localStorage.getItem('filterName')) {
          //   this.filter.value = localStorage.getItem('filterName');
          // }
          // this.pagination = new Pagination();
          // this.textInputValue = document.getElementById('interfaceInput');
          // this.completeAllStatus = false;
          // this.list = document.querySelector('.container__task_list');
          // this.container = document.querySelector('.container__task');
          // this.buttonAdd = document.getElementById('interfaceButtonAdd');
          // this.buttonCompleteAll = document.getElementById('interfaceButtonCompleteAll');
          // this.buttonDeleteAll = document.getElementById('interfaceButtonDeleteAll');
          this.config = new Config();
          this.api = new Api(this.config);
          this.searchButton = document.getElementById('search__bar_button');
          this.searchInput = document.getElementById('search__bar');
          this.logOutSubmitButton = document.getElementById('logOut');
          this.signInEmailInput = document.getElementById('email');
          this.signInPasswordInput = document.getElementById('password');
          this.signInSubmitButton = document.getElementById('submit');
          this.signInErrorContainer = document.getElementById('error');
          this.signUpNameInput = document.getElementById('registrationName');
          this.signUpEmailInput = document.getElementById('registrationEmail');
          this.signUpPasswordInput = document.getElementById('registrationPassword');
          this.signUpSubmitButton = document.getElementById('registrationButton');
      },

      // getStorage: function(mediator) {
      //   if(localStorage.getItem('taskStorage')) {
      //     let storage = localStorage.getItem('taskStorage').split(' ,');
      //     const taskStorage = [];
      //     storage = storage.forEach(function(item) {
      //       item = JSON.parse(item);
      //       const task = new Task();
      //       task.setValue(item.value);
      //       task.setCheckedStatus(item.checked);
      //       taskLi = new TaskLi (task);
      //       taskLi.setButtonEvent(taskLi.buttonComplete, 'click', mediator.completeTask.bind(mediator), taskLi);
      //       taskLi.setButtonEvent(taskLi.buttonDelete, 'click', mediator.deleteTask.bind(mediator), taskLi);
      //       taskStorage.push(taskLi);
      //     })
      //     return taskStorage;
      //   };
      //   return [];
      // },

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
          // this.attachFilterEvents();
      },

      searchUsers: function() {
        return;
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

      // attachFilterEvents: function(){
      //   this.filter.setButtonEvent(this.filter.buttonFilterAll, 'click', this.filterEvent.bind(this), 'all');
      //   this.filter.setButtonEvent(this.filter.buttonFilterComplete, 'click', this.filterEvent.bind(this), 'complete');
      //   this.filter.setButtonEvent(this.filter.buttonFilterActive, 'click', this.filterEvent.bind(this), 'active');
      // },

    //   filterEvent: function(value){
    //     this.filter.value = value;
    //     this.render();
    // },

      // addTask: function(){
      //     const value = document.getElementById('interfaceInput').value;
      //     const filter = this.filter.getFilterName();
      //     if(!value) return;
      //     const task = new Task();
      //     task.setValue(value);
      //     if (filter === 'complete') {
      //         task.setCheckedStatus(true);
      //     } else {
      //         task.setCheckedStatus(false);
      //     }
      //     const taskLi = new TaskLi (task);
      //     taskLi.setButtonEvent(taskLi.buttonComplete, 'click', this.completeTask.bind(this), taskLi);
      //     taskLi.setButtonEvent(taskLi.buttonDelete, 'click', this.deleteTask.bind(this), taskLi);
      //     this.taskStorage.push(taskLi);
      //     document.getElementById('interfaceInput').value = '';
      //     this.render();
      // },

      // completeTask: function(taskLi){
      //   taskLi.task.setCheckedStatus( (!taskLi.task.checked) );
      //   taskLi.taskDomObject.classList.toggle('task__complete');
      //   this.render();
      // },

      // completeAllTask: function(){
      //     const storage = this.getCurrentStorage();
      //     if(!storage.length) return;
      //     if ( this.completeAllStatus === storage[0].task.checked) {
      //       this.completeAllStatus = !this.completeAllStatus;
      //     }
      //     const newStatus = this.completeAllStatus;
      //     storage.forEach(function(item) {
      //       item.task.checked = newStatus;
      //       item.taskDomObject.classList.remove('task__complete');
      //       if(item.task.checked){
      //         item.taskDomObject.classList.add('task__complete');
      //       }
      //     });
      //     this.completeAllStatus = !this.completeAllStatus;
      //     this.render();
      // },

      // deleteTask: function(taskLi){
      //     for (i = 0; i < this.taskStorage.length; i++) {
      //       if (this.taskStorage[i].task.id === taskLi.task.id) {
      //         this.taskStorage.splice(i, 1);
      //         break;
      //       };
      //     };
      //     this.render();
      // },

      // deleteAllTask: function(){
      //     this.taskStorage = [];
      //     this.render();
      // },

      // render: function(){
      //     let storage = this.getCurrentStorage();
      //     storage = this.pagination.paginationRender(storage, this.pagination, this.render.bind(this));
      //     const ul = this.list.cloneNode(false);
      //     for (i = 0; i < storage.length; i++) {
      //       console.log(storage[i]);
      //       console.log(storage[i].taskDomObject);
      //       ul.appendChild(storage[i].taskDomObject);
      //     };
      //     this.container.replaceChild(ul, this.list);
      //     this.list = ul;
      //     this.localStorageRefresh();
      // },

      // getCurrentStorage: function(){
      //     const filterValue = this.filter.getFilterName();
      //     if(filterValue === 'all') {
      //         return this.taskStorage;
      //       }
      //       const currentStorage = this.taskStorage.filter(function(item) {
      //         if(filterValue === 'complete') {
      //           return item.task.checked === true;
      //         };
      //         return item.task.checked === false;
      //       });
      //     return currentStorage;
      // },

      // localStorageRefresh: function() {
      //   localStorage.removeItem("taskStorage");
      //   if (this.taskStorage[0]) {
      //     const newStorage = [];
      //     const storageJSON = this.taskStorage.forEach(function(item) {
      //       newStorage.push(JSON.stringify(item.task) + ' ');
      //   })
      //     localStorage.setItem ('taskStorage', newStorage);
      //     localStorage.setItem ('filterName', this.filter.getFilterName());
      //   };
      // },
  }
  return new App();
})()