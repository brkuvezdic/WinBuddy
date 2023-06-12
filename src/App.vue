<template>
  <v-app>
    <v-main>
      <!-- Image and text -->
      <nav class="navbar navbar-light bg-dark">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/game-console.png"
            width="60"
            class="d-inline-block align-top"
            alt=""
          />
          WinBuddy
        </a>

        <div class="nav"></div>
        <router-link to="/"
          ><h1 style="text-align: center">Home</h1>
        </router-link>
        <router-link to="/login"
          ><h1 style="text-align: center">Login</h1>
        </router-link>
        <router-link to="/register"
          ><h1 style="text-align: center">Register</h1>
        </router-link>
      </nav>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#nav {
  background-color: red !important;
}
</style>
<script>
import { firebase } from "@/firebase";
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
