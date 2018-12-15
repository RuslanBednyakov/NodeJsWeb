const LogOut = class {

  constructor(api) {

    this.api = api;
    this.path = 'auth/logout';
  }

  commit() {

    this.api.post(this.path)
      .then((response) => {
          if (response.status >= 200 && response.status < 300) {
              return response.data;
          } else {
              let error = new Error(response.statusText);
              error.response = response;
              throw error
          }
      })
      .then(function (response) {
          if (response.message === 'OK') {
              // localStorage.setItem('token', response.token);
              document.location.replace('/api/v1/sign-in');
          }else {
              throw response.message
          }
      })
      .catch((error) => {
          console.error('error',error);
      });
  }
}
