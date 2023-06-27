<template>
  <div class="about">
    <h1 class="welcome-heading">
      Welcome! Please log in with your information
    </h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="button" @click="login()" class="btn btn-primary">
              Submit
            </button>
          </form>
          <h3>New to here? Register instead</h3>
          <v-btn
            color="primary"
            class="navbar-button"
            @click="navigatetoregister"
          >
            Register
          </v-btn>
        </div>

        <div class="col-sm"></div>
      </div>
    </div>
    <v-dialog v-model="showErrorMessage" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>
          <p>{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showErrorMessage = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, auth } from "@/firebase.js";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      showErrorMessage: false,
      errorMessage: "",
    };
  },
  methods: {
    validateEmail(email) {
      // Regular expression for email validationn
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    login() {
      if (!this.validateEmail(this.email)) {
        console.error("Invalid email format");
        this.errorMessage = "Invalid email format";
        this.showErrorMessage = true;
        return;
      }

      const email = this.email;
      const password = this.password;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Successful login", userCredential);

          this.$router.replace({ path: "/findplayers" });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error", error, errorCode, errorMessage);
          if (
            errorCode === "auth/wrong-password" ||
            errorCode === "auth/user-not-found"
          ) {
            this.errorMessage =
              "Email and/or password do not match our database";
            this.showErrorMessage = true;
          } else {
            this.errorMessage = errorMessage;
            this.showErrorMessage = true;
          }
        });
    },
    navigatetoregister() {
      this.$router.replace({ path: "/register" });
    },
  },
};
</script>

<style>
.welcome-heading {
  font-size: 28px;
  color: #ff6200;
  text-align: center;
  margin-top: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeSlideDown 1.3s ease-in-out;
}

@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
