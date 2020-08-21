<template>
  <v-container>
    <post
            v-for="post in $store.state.posts"
            :key="post.id"
            v-bind:post="post"
    ></post>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Post from '../components/Post';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Post
  },
  data: () => ({

  }),
  methods: {
    getAllPosts() {
      axios.get('http://127.0.0.1:8000/api/posts/')
        .then(res => {
          res.data.forEach(post => {
            this.$store.state.posts.push(post)
          })
          console.log(this.$store.state.posts)
        })
    }
  },
  mounted() {
    this.getAllPosts()
  }
}
</script>
