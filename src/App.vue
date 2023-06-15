<template>
  <v-app style="background-color: dimgray" class="dark-bg">
    <v-main>
      <!-- Image and text -->
      <nav class="navbar navbar-custom">
        <a class="navbar-brand" href="/">
          <img
            src="@/assets/game-console.png"
            width="60"
            class="d-inline-block align-top"
            alt=""
          />
          WinBuddy
        </a>

        <p v-if="store.currentUser" class="user-email move-left">
          Current player: {{ store.currentUser.split("@")[0] }}
        </p>

        <button v-if="store.currentUser" class="logout-button" @click="logout">
          Logout
        </button>
      </nav>

      <div>
        <h1 class="title" v-if="!store.currentUser">WinBuddy</h1>
        <h2 class="welcome-text" v-if="!store.currentUser">
          Connect and play with other gamers around the world
        </h2>
      </div>

      <router-view />
      <div class="text-center" v-if="!store.currentUser">
        <div class="login-register-container">
          <router-link
            v-if="$route.path !== '/login' && $route.path !== '/register'"
            to="/login"
          >
            <button class="login-register-button">Login</button>
          </router-link>
          <router-link
            v-if="$route.path !== '/register' && $route.path !== '/login'"
            to="/register"
          >
            <button class="login-register-button">Register</button>
          </router-link>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.move-left {
  margin-left: -3%;
}
.logout-button {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #4b99ec;
}
.navbar-custom {
  background-color: rgb(247, 103, 0);
}
.mt-5 {
  margin-top: 5rem;
}
.login-register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
}

.login-register-button {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-register-button:hover {
  background-color: #0056b3;
}

.user-email {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}

.welcome-text {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
}
.title {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
  animation: flashy-animation 2s infinite;
}

@keyframes flashy-animation {
  0% {
    color: #ffffff;
    text-shadow: none;
  }
  50% {
    color: #ffcc00;
    text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00;
  }
  100% {
    color: #ffffff;
    text-shadow: none;
  }
}
</style>
<script>
import store from "@/store";
import { auth, onAuthStateChanged, getAuth, signOut } from "@/firebase";
import MyComponent from "@/components/MyComponent.vue";

export default {
  name: "App",
  components: {
    MyComponent,
  },

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
