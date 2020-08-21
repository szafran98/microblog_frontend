<template>
  <v-app>
    <navbar></navbar>
    <v-main class="main-window">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar";

export default {
  name: 'App',
  // eslint-disable-next-line no-undef
  components: {
    Navbar,
  },
  methods: {

  },

  data: () => ({

  }),
};
</script>

<style>
  .main-window{
    background: url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: auto;
  }
</style>