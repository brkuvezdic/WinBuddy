<template>
  <v-app style="background-color: dimgray" class="dark-bg">
    <nav class="navbar navbar-custom">
      <div class="navbar-container">
        <div class="navbar-left">
          <a class="navbar-brand" href="/">
            <img
              src="@/assets/game-console.png"
              width="60"
              class="d-inline-block align-top"
              alt=""
            />
            <span class="navbar-brand-text">WinBuddy</span>
          </a>
        </div>

        <div class="navbar-right">
          <div class="navbar-user">
            <p v-if="store.currentUser" class="user-email">
              Current player: {{ store.currentUser.split("@")[0] }}
            </p>
          </div>
          <div class="navbar-buttons">
            <router-link
              v-if="store.currentUser && $route.path !== '/loggedinhomescreen'"
              to="/loggedinhomescreen"
            >
              <v-btn
                color="primary"
                class="navbar-button"
                @click="navigateToLoggedInHomeScreen"
              >
                Edit Profile
              </v-btn>
            </router-link>

            <v-btn
              v-if="store.currentUser"
              color="primary"
              class="navbar-button"
              @click="logout"
            >
              Logout
            </v-btn>
          </div>
        </div>
      </div>
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
          <v-btn class="login-register-button">Login</v-btn>
        </router-link>
        <router-link
          v-if="$route.path !== '/register' && $route.path !== '/login'"
          to="/register"
        >
          <v-btn class="login-register-button">Register</v-btn>
        </router-link>
      </div>
    </div>
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

.navbar {
  background-color: rgb(247, 103, 0);
  display: flex;
  justify-content: center;
  padding: 1px 0;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-brand-text {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-left: 10px;
}

.navbar-user {
  margin-right: 20px;
}

.navbar-buttons v-btn {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar-buttons v-btn:hover {
  background-color: #4b99ec;
}
</style>

<script>
import store from "@/store";
import { auth, onAuthStateChanged, getAuth, signOut, db } from "@/firebase";
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
          console.log("Logged out");

          if (this.$route.path !== "/login") {
            this.$router.push({ path: "/login" });
          }
        })
        .catch((error) => {
          console.log("Error during logout:", error.code);
        });
    },
    navigateToLoggedInHomeScreen() {
      this.$router.push({ path: "/loggedinhomescreen" });
    },
  },

  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Authenticated");
        console.log("Logged in user:", user.email);
        store.currentUser = user.email;
      } else {
        console.log("Not Authenticated");
        console.log("No user");
        store.currentUser = null;
        this.isAuthenticated = false;
      }
    });
  },
};
</script>
