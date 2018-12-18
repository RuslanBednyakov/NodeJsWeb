let SearchU = class {

    constructor(api, searchContainer, searchCount, searchData) {

        this.api = api;
        this.data = searchData || this.getSearchDataFromUrl() || '';
        this.path = 'search';
        // this.searchParametr = `?name=${searchData}`
        this.searchParametr = `?name=`

        this.container = searchContainer;
        this.count = searchCount;
    }

    setSearchData(newData) {

        this.data = newData;
    }

    getSearchData() {

        return this.data;
    }

    getSearchDataFromUrl() {

        const urlSearch = document.location.search;
        const searchParams = new URLSearchParams(urlSearch);
        const searchDataUrl = searchParams.get('name');

        return searchDataUrl;
    }

    redirectToSearchPage() {

        this.api.get(this.path + this.searchParametr + this.data)
            .then((response) => {
                console.log('response', response)
                document.location.replace(`/api/v1/search?name=${this.data}`);
            })
            .catch(error => console.log('error', error));
    }

    async getSearchResult(searchData) {

        // return await Promise.resolve(1);
        
      return await this.api.post('search', searchData)
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
                return response;
            }else {
                throw response.message
            }
            })
            .catch(error => console.log('error', error));
    }

    createResultList(results) {

        const fragment = document.createDocumentFragment();

        results.forEach(element => {
            const li = this.createElem('li', 'search__container_results-list-item');
            const infoDiv = this.createElem('div', 'search__container_results-list-item_info', element.name);
            const buttonsDiv = this.createElem('div', 'search__container_results-list-item_buttons');
            const buttonFollow = this.createElem('button', 'search__container_results-list-item_buttons', 'Follow');
            const buttonSendMessage = this.createElem('button', 'search__container_results-list-item_buttons', 'Send message');

            buttonsDiv.appendChild(buttonFollow);
            buttonsDiv.appendChild(buttonSendMessage);

            li.appendChild(infoDiv);
            li.appendChild(buttonsDiv);

            fragment.appendChild(li);
        });

        return fragment;
    }

    createElem(newElem, elemClass, elemText) {

        const elem = document.createElement(newElem);
        elem.classList.add(elemClass);

        if (elemText) {

            const text = document.createTextNode(elemText);
            elem.appendChild(text);
        };

        return elem;
    };

    setCount(count) {

        const text = document.createTextNode(count);

        this.count.appendChild(text);
    }

    async render() {

        const searchData = {
            name: this.data
        }

        const response = await this.getSearchResult(searchData);

        const count = response.data.count;
        const users = response.data.rows;

        const usersLi = this.createResultList(users);
        this.container.appendChild(usersLi);        
        this.setCount(count);
    }
    
}