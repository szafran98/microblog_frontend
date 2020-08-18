import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => {
        return post.id !== postId
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
