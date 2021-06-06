<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12\" flat="true" height="120">
              <div id="img">
                <v-img src="../assets/gswatcher-logo.png"></v-img>
              </div>
            </v-card>
            <v-alert dense outlined type="error" v-show="this.message">
              {{ this.message }}
            </v-alert>
            <v-card class="elevation-12\" flat="true">
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="login.password"
                    prepend-icon="lock"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-row align="center" justify="space-around">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="cyan darken-4" to="#" v-on:click="log()"
                    >Login</v-btn
                  >
                  <v-btn dark color="cyan darken-4" to="/register"
                    >Register</v-btn
                  >
                </v-card-actions>
              </v-row>

              <v-row align="center" justify="space-around">
                <v-text
                  ><br />
                  <router-link to="/forgotpass"
                    ><p>Forgot your password?</p></router-link
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
// import axios from "axios";

export default {
  name: "Login",
  props: {
    source: String,
  },
  data: function () {
    return {
      login: {
        email: "",
        password: "",
      },
      message: "",
    };
  },

  methods: {
    async log() {
      try {
        const response = await http.post("/authenticate", this.login);
        localStorage.setItem("@gswatcher:token", response.data.token);
        this.$router.push("/");
        console.log(response);
      } catch (error) {
        console.error(error);
        if (error == "Error: Request failed with status code 401") {
          this.message = "Invalid password!";
          // alert("Invalid password");
        } else if (error == "Error: Request failed with status code 404") {
          this.message = "User not found!";
          // alert("User not found");
        } else {
          alert(error);
        }
      }
    },
  },
};
</script>

<style>
#img {
  padding-bottom: 100px;
}
</style>


