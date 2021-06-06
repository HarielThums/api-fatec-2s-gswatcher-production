<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12\" flat="true" height="120">
                <div><v-img src="../assets/gswatcher-logo.png"></v-img></div>
              </v-card>

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

                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="password"
                      prepend-icon="lock"
                      name="new_password"
                      label="New Password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-row align="center" justify="space-around">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="cyan darken-4" to="" v-on:click="reset()"
                      >Reset Password</v-btn
                    >
                  </v-card-actions>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { http } from "../services/api";

export default {
  name: "Reset",
  props: {
    source: String,
  },
  data: function () {
    return {
      email: "",
      new_password: "",
      error: "",
    };
  },
  methods: {
    async reset() {
      try {
        const response = await http.put("reset_password", {
          email: this.email,
          token: this.$route.params.token,
          password: this.password,
        });
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>