import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { TokenService } from "../storage/service";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    posts: [],
    error: null,
    tokens: null,
    loggedUserData: null
  },
  mutations: {
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => {
        return post.id !== postId
      })
    },
    storePosts(state, posts) {
      state.posts = posts
    },
    /*
    storeTokensInCookies(state, tokenData) {
      Vue.$cookies.set('token', tokenData)
    },

     */
    storeErrors(state, error) {
      state.error = error
    },
    storeLoggedUserData(state, userData) {
      state.loggedUserData = {
        id: userData.id,
        username: userData.username,
        email: userData.email
      }
    }
  },
  actions: {
    getAllPostsAPI({commit}) {
      axios.get('http://127.0.0.1:8000/api/posts/', {
        headers: {
          'Authorization': TokenService.getAccesToken()
        }
      })
          .then(res => commit('storePosts', res.data))
    },
    loginUser({ dispatch}, loginData) {
       axios.post('http://127.0.0.1:8000/auth/jwt/create/', loginData)
          .then(res => {
            TokenService.setToken(res.data)
            //commit('storeTokensInCookies', res.data)
            dispatch('getLoggedUserData')
          })
         // .catch(err => {
           // commit('storeErrors', err.response.data.detail)
          //})
    },
    getLoggedUserData({commit}) {
      axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: {
          'Authorization': TokenService.getAccesToken()
        }
      })
          .then(res => {
            commit('storeLoggedUserData', res.data)
          })
    }
  },
  modules: {
  }
})
