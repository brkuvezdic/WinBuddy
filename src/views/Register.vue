<template>
  <div class="about">
    <h1 class="welcome-heading">
      Welcome! Please register with your information
    </h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form v-if="!submitted">
            <!-- Registration form content -->
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
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
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
            <div class="form-group">
              <label for="exampleInputPassword2">Repeat password</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="exampleInputPassword2"
                placeholder="Repeat password"
              />
              <h1 v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </h1>
            </div>
            <button type="button" @click="register" class="btn btn-primary">
              Submit
            </button>
          </form>
          <div v-else>
            <p>Registration successful!</p>
            <router-link to="/home">
              <button class="btn btn-primary">Continue</button>
            </router-link>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<style>
.welcome-heading {
  font-size: 28px;
  color: #ff6200;
  text-align: center;
  margin-top: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeSlideDown 1s ease-in-out;
}
</style>
<script>
import { auth, createUserWithEmailAndPassword } from "@/firebase.js";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      submitted: false,
      errorMessage: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.passwordRepeat) {
        console.error("Passwords do not match");
        this.errorMessage = "Passwords do not match";

        return;
      }

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log("Uspjesna registracija");
          this.submitted = true;
          this.$router.replace({ name: "home" });
        })
        .catch((error) => {
          console.error("Doslo je do greske", error);
        });
    },
  },
};
</script>
