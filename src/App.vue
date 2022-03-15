<template>
  <div id="app">
    <p>{{ nameUser }}</p>
    <p>{{ upperName }}</p>
    <input type="text" v-model="nameUser" />
    <button @click="fetchName">Fetch</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    window.store.users.subscribe((users) => (this.users = users));
  },
  data: () => ({ users: null }),
  methods: {
    fetchName() {
      this.users.actions.fetchName();
    },
  },
  computed: {
    upperName() {
      return this.users.getters.upperName;
    },
    nameUser: {
      get() {
        return this.users.state.name;
      },
      set(value) {
        this.users.mutations.setName(value);
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
