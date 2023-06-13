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
          ><h1 style="text-align: center">Registerr</h1>
        </router-link>

        <a href="#" @click="logout"><h1>Logout</h1></a>
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
import { auth, onAuthStateChanged, getAuth, signOut } from "@/firebase";

export default {
  name: "App",

  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("odjavljen");
          this.$router.push({ path: "login" });
        })
        .catch((error) => {
          console.log("GRESKAAA", error.code);
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Authenticated");
        this.isAuthenticated = true;
      } else {
        console.log("Not Authenticated");
        this.isAuthenticated = false;
      }
    });
  },
};
</script>
