<template>
  <v-app>
    <v-main>
      <router-link to="/"
        ><h1 style="text-align: center">Home</h1>
      </router-link>
      <router-link to="/login"
        ><h1 style="text-align: center">Login</h1>
      </router-link>
      <router-link to="/register"
        ><h1 style="text-align: center">Register</h1>
      </router-link>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
