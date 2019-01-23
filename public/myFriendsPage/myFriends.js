const MyFriendsPage = class {

    constructor(api, user, pageDomElements) {

        this.api = api;
        this.user = user;
        this.pageDomElements = pageDomElements;
    }


    getFriends() {

        return this.api.get(`friends`)
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


    createFriendsList(friends) {

        const fragment = document.createDocumentFragment();

        friends.forEach(element => {
            const li = this.createElem('li', 'friends__container_list-item');
            const friendsAvatarDiv = this.createElem('div', 'friends__container_list-item_user-avatar', element.avatar);
            const friendsInfoDiv = this.createElem('div', 'friends__container_list-item_user-info');
            const friendsInfoNameDiv = this.createElem('div', 'friends__container_list-item_user-info_name', element.name);
            const friendsInfoEmailDiv = this.createElem('div', 'friends__container_list-item_user-info_email', element.email);
            const friendsButtonsDiv = this.createElem('div', 'friends__container_list-item_user-info_buttons');
            const unfollowButton = this.createButtonUnfollow(element);
            // const chatButton = this.createElem('button', 'friends__container_list-item_user-info_buttons-chat', 'Chat')

            friendsButtonsDiv.appendChild(unfollowButton);
            // friendsButtonsDiv.appendChild(chatButton);

            friendsInfoDiv.appendChild(friendsInfoNameDiv);
            friendsInfoDiv.appendChild(friendsInfoEmailDiv);
            friendsInfoDiv.appendChild(friendsButtonsDiv);

            li.appendChild(friendsAvatarDiv);
            li.appendChild(friendsInfoDiv);

            fragment.appendChild(li);
        });

        return fragment;
    }

    async render() {
        
        const friends = await this.getFriends();

        const friendsList = this.createFriendsList(friends);
        this.pageDomElements.myFriendsContainer.appendChild(friendsList);      

    }
    
}