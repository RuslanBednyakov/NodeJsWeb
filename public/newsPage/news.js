const newsPage = class {

    constructor(api, user, pageDomElements) {

        this.api = api;
        this.user = user;
        this.pageDomElements = pageDomElements;
    }


    getFriendsPosts() {

        return this.api.get(`posts/${this.user.id}/friends`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
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

    createElem(newElem, elemClass, elemText) {

        const elem = document.createElement(newElem);
        elem.classList.add(elemClass);

        if (elemText) {

            const text = document.createTextNode(elemText);
            elem.appendChild(text);
        };

        return elem;
    };

    createFriendsPostsList(posts) {

        const fragment = document.createDocumentFragment();

        posts.forEach(element => {
            const li = this.createElem('li', 'news__container_list-item');
            const userDiv = this.createElem('div', 'news__container_list-item_user');
            const userAvatarDiv = this.createElem('div', 'news__container_list-item_user-avatar', element.avatar);
            const userInfoDiv = this.createElem('div', 'news__container_list-item_user-info', element.name);
            const postDiv = this.createElem('div', 'news__container_list-item_post')
            const postTitleDiv = this.createElem('div', 'news__container_list-item_post-title', element.title)
            const postContentDiv = this.createElem('div', 'news__container_list-item_post-content', element.content)
            const postDateDiv = this.createElem('div', 'news__container_list-item_post-date', element.date)

            userDiv.appendChild(userAvatarDiv);
            userDiv.appendChild(userInfoDiv);

            postDiv.appendChild(postTitleDiv);
            postDiv.appendChild(postContentDiv);
            postDiv.appendChild(postDateDiv);

            li.appendChild(userDiv);
            li.appendChild(postDiv);

            fragment.appendChild(li);
        });

        return fragment;
    }

    async render() {
        
        const posts = await this.getFriendsPosts();

        const friendsPostsList = this.createFriendsPostsList(posts);
        this.container.appendChild(friendsPostsList);      

    }
    
}