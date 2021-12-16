import axios from 'axios';

export const CallumAPI = {
  celebrities: [

  ],
  celebrity: {},
  all: function () {
    return axios.get('https://jay-app-spring-api.herokuapp.com/profiles', {


    })
      .then(res => {
        this.celebrities = res.data;
        return this.celebrities;
      })
  },

  getCelebrity: function (id) {
    return axios.get(`https://jay-app-spring-api.herokuapp.com/profiles/${id}`, {


    })
      .then(res => {
        this.celebrity = res.data;
        return this.celebrity;
      })
  },

  addCelebrity: function (celebrity) {
    const formData = new FormData();
    formData.append('firstName', celebrity.firstName);
    formData.append('lastName', celebrity.lastName);
    formData.append('address', celebrity.address);
    formData.append('gender', celebrity.gender);
    formData.append('file', celebrity?.file);
    formData.append('age', celebrity?.age)
    formData.append('facebook',celebrity?.facebook);
    formData.append('instagram',celebrity?.instahgram);
    formData.append('twitter',celebrity?.twitter);
    formData.append('email',celebrity?.email);
    formData.append('password',celebrity?.password);
    return axios.post('https://jay-app-spring-api.herokuapp.com/profiles', formData, {

    }).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )


  },

  editCelebrity: function (celebrity, id) {
    const formData = new FormData();
    formData.append('firstName', celebrity.firstName);
    formData.append('lastName', celebrity.lastName);
    formData.append('address', celebrity.address);
    formData.append('gender', celebrity.gender);
    formData.append('age', celebrity?.age)
    formData.append('facebook',celebrity?.facebook);
    formData.append('instagram',celebrity?.instahgram);
    formData.append('twitter',celebrity?.twitter);
    formData.append('email',celebrity?.email);
    formData.append('likes[]',celebrity?.likes);
    formData.append('password',celebrity?.facebook);
    formData.append('age', celebrity?.age);
    formData.append('file',celebrity.file);
    return axios.put(`https://jay-app-spring-api.herokuapp.com/profiles/${id}`, formData, {

    }).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )


  },
  deleteCelebrity: function (id) {
    return axios.delete(`https://jay-app-spring-api.herokuapp.com/profiles/${id}`).then(
      res => {
        this.celebrity = res.data;
        return this.celebrity;
      }
    )
  }
}
