window.onload = function() {
    
    const logOut = document.getElementById('logOut');
    const searchButton = document.getElementById('search__bar_button');
    const searchBar = document.getElementById('search__bar');

    if (logOut) {

        logOut.addEventListener('click', () => {

            api.post('auth/logout')
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
                    errorDiv.textContent = error;
                });
      });
    }

    searchButton.addEventListener('click', () => {
        
        const searchData = searchBar.value
        // const url = new URL(config.path.BASE_URL + config.path.BASE_API + 'search');
        // const searchItem = new URLSearchParams(searchData);
        // console.log(1111, url);
        // console.dir(222, url);
        api.get(`search?name=${searchData}`)
              .then((response) => {
                  console.log('response', response)
                  document.location.replace(`/api/v1/search?name=${searchData}`);
                })
              .catch(error => console.log('error', error));
        // api.get('search')
        // .then((response) => {
            
        //     if (response.status >= 200 && response.status < 300) {
        //         console.log(response);
        //         document.location.replace('/api/v1/search');
        //     } else {
        //         let error = new Error(response.statusText);
        //         error.response = response;
        //         throw error
        //     }
        // })
        // .catch((error) => {
        //     console.error('error',error);
        //     errorDiv.textContent = error;
        // });
    })
}