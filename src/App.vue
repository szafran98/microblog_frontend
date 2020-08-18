<template>
  <v-app>
    <navbar></navbar>
    <v-main>
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

  data: () => ({

  }),
};
</script>
