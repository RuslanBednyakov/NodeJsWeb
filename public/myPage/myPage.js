const MyPage = class {

  constructor(api, user, domElements) {

      this.api = api;
      this.user = user;

      this.domElements = {
        avatarContainer: domElements.avatarContainer,
        userInfoContainer: domElements.userInfoContainer,
        userPostsContainer: domElements.userPostsContainer,
        addPost: {
          inputTitle: domElements.addPostInputTitle,
          textareaContent: domElements.addPostTextareaContent,
          submitButton: domElements.addPostButton,
          errorDiv: domElements.addPostError,
        }
      }
  }

  createElem(newElem, elemClass, elemText) {

    const elem = document.createElement(newElem);
    elem.classList.add(elemClass);

    if (elemText) {

        const text = document.createTextNode(elemText);
        elem.appendChild(text);
    };

    return elem;
  }

  attachAvatar() {

    const userAvatar = new Image();
    userAvatar.src = '/api/v1/avatars/1.jpg'
    this.domElements.avatarContainer.appendChild(userAvatar);
  }

  attachUserInfo() {

    const userName = this.createElem('h2', 'user__container_header-info-userName', `${this.user.name}`);
    this.domElements.userInfoContainer.appendChild(userName);
  }

  getMyPosts() {

    return this.api.get(`posts/${this.user.id}`)
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

  createPostsList(posts) {

    const fragment = document.createDocumentFragment();

    posts.forEach(element => {
        const li = this.createElem('li', 'user__container_posts-list-item');
        const titleDiv = this.createElem('div', 'user__container_posts-list-item_title', element.title);
        const contentDiv = this.createElem('div', 'user__container_posts-list-item_content', element.content);
        const dateDiv = this.createElem('div', 'user__container_posts-list-item_content', element.date);

        li.appendChild(titleDiv);
        li.appendChild(contentDiv);
        li.appendChild(dateDiv);

        fragment.insertBefore(li, fragment.firstChild);
    });

    return fragment;
  }

  async attachMyPosts() {
    
    const myPosts = await this.getMyPosts();

    const PostsLi = this.createPostsList(myPosts);

    while(this.domElements.userPostsContainer.lastChild){
      this.domElements.userPostsContainer.removeChild(this.domElements.userPostsContainer.lastChild);
    }

    this.domElements.userPostsContainer.appendChild(PostsLi);
  }

  sendNewPost(post) {

    return this.api.post('/posts', post)
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
        this.domElements.addPost.errorDiv.appendChild(error);
      });

  }

  clearNewPostInputs() {

    this.domElements.addPost.inputTitle.value = '';
    this.domElements.addPost.textareaContent.value = '';
  }

  async addNewPost() {

    const newTitle = this.domElements.addPost.inputTitle.value;
    const newContent = this.domElements.addPost.textareaContent.value;
    const newDate = new Date();
    let error = '';
    
    if (!newTitle) {
      error = document.createTextNode('Plesase enter title of your post')
    };

    if (!newContent) {
      error = document.createTextNode('Plesase enter content of your post')
    };

    if (error) {
      this.domElements.addPost.errorDiv.appendChild(error);
      return;
    }

    const post = {
      user_id: this.user.id,
      title: newTitle,
      content: newContent,
      date: newDate
    }

    await this.sendNewPost(post);

    this.attachMyPosts();
    this.clearNewPostInputs();
  }

  attachButtons() {

    this.domElements.addPost.submitButton.addEventListener("click", this.addNewPost.bind(this));
  }

  render() {
    this.attachAvatar();
    this.attachUserInfo();
    this.attachMyPosts();
    this.attachButtons();
  } 
}