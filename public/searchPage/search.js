const Search = class {

    constructor(api, user, searchContainer, searchCount, searchData) {

        this.api = api;
        this.user = user;
        this.data = searchData || this.getSearchDataFromUrl() || '';
        this.path = 'search/user';
        // this.searchParametr = `?name=${searchData}`
        this.searchParametr = `?name=`

        this.container = searchContainer;
        this.count = searchCount;
    }

    setUser(user) {
        
        this.user = user;
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

        document.location.replace(`/search?name=${this.data}`);
    }

    getSearchResult(searchData) {
        
      return this.api.post(this.path, searchData)
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

    changeButtons(button, user, name) {

        let newButton;

        if(name === 'Follow') {

            newButton = this.createButtonFollow(user)
        } else if (name === 'Unfollow') {

            newButton = this.createButtonUnfollow(user)
        }

        button.parentNode.replaceChild(newButton, button)
    }

    unfollowUser(user, button) {

        return function() {

            this.api.delete(`followers/${user.id}`)
            .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                this.changeButtons(button, user, 'Follow');
                return response.data;
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                return error
            }
            })
            .catch((error) => {             
            console.error('error', error);
            });
        }
    }

    followNewUser(user, button) {

        return function() {

            const data = {
                follower: this.user.id,
                following: user.id
            }

            this.api.post('followers', data)
            .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                this.changeButtons(button, user, 'Unfollow');
                return response.data;
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                return error
            }
            })
            .catch((error) => {             
            console.error('error', error);
            });
        }
    }

    createButtonUnfollow(user) {

        const buttonUnfollow = this.createElem('button', 'search__container_results-list-item_buttons-unfollow', 'Unfollow');
        buttonUnfollow.addEventListener("click", this.unfollowUser(user, buttonUnfollow).bind(this));
        return buttonUnfollow;
    }

    createButtonFollow(user)  {

        const buttonFollow = this.createElem('button', 'search__container_results-list-item_buttons-follow', 'Follow');
        buttonFollow.addEventListener("click", this.followNewUser(user, buttonFollow).bind(this));
        return buttonFollow;
    }

    createResultList(results) {

        const fragment = document.createDocumentFragment();

        results.forEach(element => {
            const li = this.createElem('li', 'search__container_results-list-item');
            const infoDiv = this.createElem('div', 'search__container_results-list-item_info', element.name);

            li.appendChild(infoDiv);

            if(this.user) {
                const buttonsDiv = this.createElem('div', 'search__container_results-list-item_buttons');
                if (element.userFollowing[0] && element.userFollowing[0].id === this.user.id) {
                    const buttonUnfollow = this.createButtonUnfollow(element);
                    buttonsDiv.appendChild(buttonUnfollow);
                } else {
                    const buttonFollow = this.createButtonFollow(element);
                    buttonsDiv.appendChild(buttonFollow);
                }
                
                // const buttonSendMessage = this.createElem('button', 'search__container_results-list-item_buttons-chat', 'Chat');
    
                
                // buttonsDiv.appendChild(buttonSendMessage);
                li.appendChild(buttonsDiv);
            }

            

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
        console.log(response);

        const count = response.data.count;
        const users = response.data.rows;

        const usersLi = this.createResultList(users);
        this.container.appendChild(usersLi);        
        this.setCount(count);
    }
    
}


function isAnagrama (a, b) {
    a = a.toLowerCase().trim();
    b = b.toLowerCase().trim();

    if( a===b) return ('Не анаграма')
    [к, о, т]
    [к, о, т]


}