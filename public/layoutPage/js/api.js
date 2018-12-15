const Api = class {

    constructor(conf) {
        this.config = conf;
    }

    get(url, conf) {
        return new Promise((resolve, reject) => {
            axios.get(this.config.path.BASE_URL + this.config.path.BASE_API + url, this.config)
                .then((response) => resolve(response))
                .catch(error => reject(error));
        });
    }
  
    put(url, _data = {}) {
        return  new Promise((resolve, reject) => {
            axios.put(this.config.path.BASE_URL + this.config.path.BASE_API + url, _data)
                .then((response) => resolve(response))
                .catch(error => reject(error));
        });
    }
  
    post(url, _data = {}) {
        return  new Promise((resolve, reject) => {
          axios.post(this.config.path.BASE_URL + this.config.path.BASE_API + url, _data)
                .then((response) => resolve(response))
                .catch(error => reject(error));
        });
    }
  
    delete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(this.config.path.BASE_URL + this.config.path.BASE_API + url)
                .then((response) => resolve(response))
                .catch(error => reject(error));
        });
    }
  }

// class Api {
//   get(url, conf) {
//       return new Promise((resolve, reject) => {
//           axios.get(config.path.BASE_URL + config.path.BASE_API + url, this.config)
//               .then((response) => resolve(response))
//               .catch(error => reject(error));
//       });
//   }

//   put(url, _data = {}) {
//       return  new Promise((resolve, reject) => {
//           axios.put(config.path.BASE_URL + config.path.BASE_API + url, _data)
//               .then((response) => resolve(response))
//               .catch(error => reject(error));
//       });
//   }

//   post(url, _data = {}) {
//       return  new Promise((resolve, reject) => {
//         axios.post(config.path.BASE_URL + config.path.BASE_API + url, _data)
//               .then((response) => resolve(response))
//               .catch(error => reject(error));
//       });
//   }

//   delete(url) {
//       return new Promise((resolve, reject) => {
//           axios.delete(config.path.BASE_URL + config.path.BASE_API + url)
//               .then((response) => resolve(response))
//               .catch(error => reject(error));
//       });
//   }
// }

// const api = new Api(); 