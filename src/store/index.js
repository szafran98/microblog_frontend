import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { TokenService } from "../storage/service";
import router from "../router";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    posts: [],
    error: null,
    tokens: null,
    loggedUserData: null
  },
  mutations: {
    deletePost(state, postToDel) {
        state.posts = state.posts.filter(post => {
            return post !== postToDel
        })
    },
      updatePost(state, postData) {

        state.posts.forEach(post => {
            if (post.id === postData.id) {
                console.log(state.posts.indexOf(post))
                Vue.set(state.posts, state.posts.indexOf(post), postData)
            }
        })
      },
    storePosts(state, posts) {
        console.log(posts)
        state.posts = posts
    }
    ,
    storeAddedPost(state, post) {
        state.posts.unshift(post)
    },
      storeComment(state, comment) {
        state.posts.forEach(post => {
            if (post.url === comment.to_post) {
                post.post_comments.push(comment)
            }
        })
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
    },
      removeLoggedUserData(state) {
        state.loggedUserData = null
      }
  },
    getters: {
        getAllPosts: state => {
            return state.posts
        },
        getPostsByTag: state => tag => {
            let postsOnTag = [];
            state.posts.forEach(post => {
                if (post.tags.length > 0) {
                    post.tags.forEach(postTag => {
                        //tag = `#${tag}`
                        console.log(postTag, tag)
                        if (postTag === tag) {
                            postsOnTag.push(post)
                        }
                    })
                }
            })
            return postsOnTag
        }
    },
  actions: {
    getAllPostsAPI({commit, dispatch}) {
      axios.get('http://127.0.0.1:8000/api/posts/', TokenService.returnAccessTokenHeader())
          .then(res => commit('storePosts', res.data))
          .catch(err => {
              console.log(err.response)
              if (err.response.status === 401) {
                  TokenService.refreshTokenApiRequest()
                  dispatch('getAllPostsAPI')
              }
          })
    },
    addPostAPI({commit}, postContent) {
        axios.post('http://127.0.0.1:8000/api/posts/', {
          author_pk: this.state.loggedUserData.id,
          content: postContent
        }, TokenService.returnAccessTokenHeader())
            .then(res => {
              if (res.statusText === 'Created') {
                commit('storeAddedPost', res.data)
              }
            })
      //}
    },
      deletePostAPI({commit, dispatch}, post) {
          axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`, TokenService.returnAccessTokenHeader())
              .then(res => {
                  if (res.status === 204) {
                      commit('deletePost', post)
                  }
              })
              .catch(err => {
                  if (err.response.status === 401) {
                      TokenService.refreshTokenApiRequest()
                      dispatch('deletePostAPI')
                  }
              })
      },
      updatePostAPI({commit}, postData) {
        axios.put(`http://127.0.0.1:8000/api/posts/${postData.postId}/`, {
            author_pk: this.state.loggedUserData.id,
            content: postData.content
        }, TokenService.returnAccessTokenHeader())
            .then(res => {
                commit('updatePost', res.data)
            })
      },
      likePostAPI({commit}, postId) {
        axios.get(`http://127.0.0.1:8000/api/posts/${postId}/like_post/`, TokenService.returnAccessTokenHeader())
            .then(res => {
                console.log(res.data)
                commit('updatePost', res.data)
            })
      },
      addCommentAPI({commit}, commentData) {
        axios.post(`http://127.0.0.1:8000/api/comments/`, {
            author_pk: this.state.loggedUserData.id,
            content: commentData.content,
            to_post: `http://127.0.0.1:8000/api/posts/${commentData.postId}/`
        }, TokenService.returnAccessTokenHeader())
            .then(res => {
                commit('storeComment', res.data)
            })
            .catch(err => console.log(err.response))
      },
    loginUser({ dispatch}, loginData) {
       axios.post('http://127.0.0.1:8000/auth/jwt/create/', loginData)
          .then(res => {
            TokenService.setToken(res.data)
            //commit('storeTokensInCookies', res.data)
            dispatch('tryGettingUserData').then(() => router.push({name: 'Home'}))
           })
         // .catch(err => {
           // commit('storeErrors', err.response.data.detail)
          //})
    },
      logoutUser({commit}) {
        commit('removeLoggedUserData')
          TokenService.removeToken()
      },
    tryGettingUserData({commit, dispatch}) {
        let tokenHeader = TokenService.returnAccessTokenHeader()
        if (tokenHeader !== null) {
            axios.get('http://127.0.0.1:8000/auth/users/me/', tokenHeader)
                .then(res => {
                    commit('storeLoggedUserData', res.data)
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        TokenService.refreshTokenApiRequest()
                        dispatch('tryGettingUserData')
                    }
                })
        }
    }
  },
  modules: {
  }
})
