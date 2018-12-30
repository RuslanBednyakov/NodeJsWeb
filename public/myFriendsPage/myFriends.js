const myFriendPage = class {

    constructor(api, user, pageDomElements) {

        this.api = api;
        this.user = user;
        this.pageDomElements = pageDomElements;
    }


    getFriendsPosts() {

        return this.api.get(`friends/${this.user.id}`)
                    .then ((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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

    createFriendsList(friends) {

        const fragment = document.createDocumentFragment();

        friends.forEach(element => {
            const li = this.createElem('li', 'friends__container_list-item');
            const userAvatarDiv = this.createElem('div', 'news__container_list-item_user-avatar', element.avatar);
            const userInfoDiv = this.createElem('div', 'news__container_list-item_user-info');
            const userInfoNameDiv = this.createElem('div', 'news__container_list-item_user-info_name', element.name);
            const userInfoEmailDiv = this.createElem('div', 'news__container_list-item_user-info_email', element.email);
            const userInfoButtonsDiv = this.createElem('div', 'news__container_list-item_user-info_buttons');
            const unfollowButton = this.createElem('button', 'news__container_list-item_user-info_buttons-unfollow', 'Unfollow')
            const chatButton = this.createElem('button', 'news__container_list-item_user-info_buttons-chat', 'Chat')

            userInfoButtonsDiv.appendChild(unfollowButton);
            userInfoButtonsDiv.appendChild(chatButton);

            userInfoDiv.appendChild(userInfoNameDiv);
            userInfoDiv.appendChild(userInfoEmailDiv);
            userInfoDiv.appendChild(userInfoButtonsDiv);

            li.appendChild(userAvatarDiv);
            li.appendChild(userInfoDiv);

            fragment.appendChild(li);
        });

        return fragment;
    }

    async render() {
        
        const friends = await this.getFriends();

        const friendsList = this.createFriendsList(friends);
        this.container.appendChild(friendsList);      

    }
    
}