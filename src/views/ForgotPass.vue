<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12\" flat="true" height="120">
              <div><v-img src="../assets/gswatcher-logo.png"></v-img></div>
            </v-card>
            <br />
            <v-card class="elevation-12\" flat="true">
              <div v-if="message">
                <v-alert dense text type="success">
                  {{ message }}
                </v-alert>
              </div>
              <div v-else-if="error">
                <v-alert dense outlined type="error">
                  {{ error }}
                </v-alert>
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-row align="center" justify="space-around">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    color="cyan darken-4"
                    to=""
                    v-on:click="sendEmail()"
                    >Continue</v-btn
                  >
                </v-card-actions>
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
  name: "ForgotPass",
  props: {
    source: String,
  },
  data: function () {
    return {
      email: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await http.put("/forgot_password", {
          email: this.email,
        });
        this.message = "The email was sent!";
        this.error = "";
        console.log(response);
      } catch (error) {
        this.error = "Error occurred! Invalid email!";
        this.message = "";
      }
    },
  },
};
</script>

<style>
</style>>

