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
        <router-link v-if="!store.currentUser" to="/"
          ><h1 style="text-align: center">Home</h1>
        </router-link>
        <router-link v-if="!store.currentUser" to="/login"
          ><h1 style="text-align: center">Login</h1>
        </router-link>
        <router-link to="/register"
          ><h1 v-if="!store.currentUser" style="text-align: center">
            Registerr
          </h1>
        </router-link>

        <a v-if="store.currentUser" href="#" @click="logout"><h1>Logout</h1></a>
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
import store from "@/store";
import { auth, onAuthStateChanged, getAuth, signOut } from "@/firebase";

export default {
  name: "App",

  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("odjavljen");
          if (this.$route.path !== "/login") {
            this.$router.push({ path: "/login" });
          }
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
        console.log("Koji user je logiran=", user.email);
        store.currentUser = user.email;
      } else {
        console.log("Not Authenticated");
        console.log("Nema usera");
        store.currentUser = null;
        this.isAuthenticated = false;
      }
    });
  },
};
</script>
