<template>
  <v-container fluid>
    <h1 v-if="tag !== null" style="color: white">You are on tag {{ tag }}</h1>
    <post-creation v-if="$store.state.loggedUserData !== null"></post-creation>
    <div v-if="!tag">
      <post
              v-for="post in $store.getters.getAllPosts"
              :key="post.id"
              v-bind:post="post"
      ></post>
    </div>
    <div v-if="tag">
      <post
              v-for="post in $store.getters.getPostsByTag(tag)"
              :key="post.id"
              v-bind:post="post"
      ></post>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Post from '../components/Post';
//import axios from 'axios';
import PostCreation from "../components/PostCreation";

export default {
  name: 'Home',
  components: {
    Post,
    PostCreation
  },
  data: () => ({
    tag: null
  }),
  watch: {
    $route(to, from) {
      console.log(to, from)
      if (to.name === 'Tag') {
        this.tag = to.params.name
      }
      if (to.name === 'Home') {
        this.tag = null
      }
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    //this.getAllPosts()
    this.$store.dispatch('getAllPostsAPI')
    this.tag = this.$route.params.name || null
  }
}
</script>
