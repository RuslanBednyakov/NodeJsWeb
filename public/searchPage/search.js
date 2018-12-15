window.onload = function() {

  // const searchResultsContainer = document.getElementById('searchResultsContainer');

  // searchResult.rows.forEach(element => {
  //   let li = document.createElement('li');
  //   li.classList.add('search-results__container_list')
  //   let text = document.createTextNode(element.name);
  //   li.appendChild(text);
  //   searchResultsContainer.appendChild(li);
  // });

  const urlSearch = document.location.search;
  const searchParams = new URLSearchParams(urlSearch);

  const userName = {
   name: searchParams.get('name')
  }

  api.post('search', userName)
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
      if (response.message === 'Search successfull') {
          render(response);
      }else {
          throw response.message
      }
    })
    .catch(error => console.log('error', error));

    function render(obj) {
      const count = obj.count;
      const users = obj.rows;

      const searchCount = document.getElementsByClassName(".search__count")
    }
};