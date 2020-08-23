import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    error: null,
    tokens: null
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
    storeTokensInCookies(state, tokenData) {
      console.log(tokenData)
      state.tokens = tokenData
    },
    storeErrors(state, error) {
      state.error = error
    }
  },
  actions: {
    getAllPostsAPI({commit}) {
       return axios.get('http://127.0.0.1:8000/api/posts/')
          .then(res => commit('storePosts', res.data))
    },
    loginUser({commit}, loginData) {
      console.log(loginData)
      axios.post('http://127.0.0.1:8000/auth/jwt/create/', loginData)
          .then(res => {
            commit('storeTokensInCookies', res.data)
          })
          .catch(err => {
            commit('storeErrors', err.response.data.detail)
          })
    }
  },
  modules: {
  }
})
