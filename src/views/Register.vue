<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12\" flat="true" height="120">
              <div><v-img src="../assets/gswatcher-logo.png"></v-img></div>
            </v-card>
            <v-alert dense outlined type="error" v-show="this.message">
              {{ this.message }}
            </v-alert>
            <v-card class="elevation-12\" flat="true">
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="form.name"
                    prepend-icon="person"
                    name="name"
                    label="Name"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    prepend-icon="lock"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-row align="center" justify="space-around">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    color="cyan darken-4"
                    to="#"
                    v-on:click="register()"
                    >Create Account</v-btn
                  >
                </v-card-actions>
              </v-row>

              <v-row align="center" justify="space-around">
                <v-text>
                  <br />
                  <router-link to="/login">
                    <p>Already have an account?</p></router-link
                  >
                </v-text>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { http } from "../services/api";

export default {
  name: "Register",
  props: {
    source: String,
  },
  data: function () {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      reg: "",
      message: "",
    };
  },
  methods: {
    async register() {
      if (
        this.form.name == "" ||
        this.form.email == "" ||
        this.form.password == ""
      ) {
        this.reg = 0;
        this.message = "Fill all the fields!";
        // alert("Fill all the fields!");
      } else {
        if (this.validateEmail()) {
          try {
            const response = await http.post("/register", this.form);
            localStorage.setItem("@gswatcher:token", response.data.token);
            this.$router.push("/login");
          } catch (error) {
            console.error(error);
            if (error == "Error: Request failed with status code 403") {
              this.message = "Sorry! Try again!";
              // alert("Sorry! Try again!");
            }
          }
        }
      }
    },

    validateEmail() {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.form.email
        )
      ) {
        // alert("You have entered a valid email address!");
        return true;
      }
      this.message =
        "You have entered an invalid email address! Please try again.";
      // alert("You have entered an invalid email address! Please try again.");
      return false;
    },
  },
};
</script>

<style>
</style>>

