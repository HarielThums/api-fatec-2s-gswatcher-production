<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12\" flat="true" height="120">
              <div><v-img src="../assets/gswatcher-logo.png"></v-img></div>
            </v-card>

            <v-card class="elevation-12\" flat="true">
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="form.name"
                    prepend-icon="person"
                    name="name"
                    label="Name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
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
    };
  },
  methods: {
    async register() {
      try {
        const response = await http.post("/register", this.form);
        localStorage.setItem("@gswatcher:token", response.data.token);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
        if (error == "Error: Request failed with status code 403")
          alert("Sorry! The email is already been used.");
      }
    },
  },
};
</script>

<style>
</style>>

