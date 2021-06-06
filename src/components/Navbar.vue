<template>
  <nav v-if="!['login', 'register', 'forgotpass'].includes($route.name)">
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="font-weight-dark text-decoration-none" to="/"
          ><div id="logo-name">GSWATCHER</div>
        </router-link>

        <!--<span class="font-weight-light text-uppercase grey--text"> - Gerenciador de Projetos</span>-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
            
      <v-btn class="mx-2" fab small dark color="primary" v-on:click="logout()">
        <v-icon dark> mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="grey darken-3">
      <v-list dense nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item >
          <v-list-item-icon>
            <v-icon class="white--text">mdi-file-upload</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">Upload</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>

      <v-divider></v-divider>
      <v-spacer></v-spacer>

      <!-- <div class="pt-10 ma-2">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="alert" dark v-bind="attrs" v-on="on">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="white--text">mdi-file-upload</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="white--text"
                      >Upload</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Upload de Arquivo</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div class="container">
                    <div class="large-12 medium-12 small-12 cell">
                      <label
                        >File
                        <input
                          type="file"
                          id="file"
                          ref="file"
                          v-on:change="handleFileUpload()"
                        />
                      </label>

                    </div>
                  </div>
                </v-container>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="submitFile()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div> -->
    </v-navigation-drawer>
  </nav>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      dialog: false,
      file: "",
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Main", route: "/" },
        // { icon: 'mdi-folder', text: 'Projetos', route: '/projetos' },
        { icon: "mdi-account", text: "Developers", route: "/desenvolvedores" },
        { icon: "mdi-movie", text: "First Access", route: "/firstaccess" },
        { icon: "mdi-file-upload", text: "Upload", route: "/upload" },
        // { icon: 'mdi-face', text: 'Time', route: '/time' },
      ],
      token: localStorage.getItem("@gswatcher:token"),
    };
  },
  methods: {
    handleFileUpload() {
      this.dialog = false;
      this.file = this.$refs.file.files[0];
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap");

#logo-name {
  font-family: "Allerta Stencil", sans-serif;
  font-size: larger;
}
</style>

