<template>
  <nav>
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="font-weight-dark text-decoration-none" to="/"
          >GSWatcher
        </router-link>

        <!--<span class="font-weight-light text-uppercase grey--text"> - Gerenciador de Projetos</span>-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
      <v-btn to="/perfil" flat>
        <!-- <router-link to="/perfil"></router-link> -->
        <v-icon>mdi-account-circle</v-icon>
        <!-- Por enquanto está com o ícone errado, buscar validação de usuário para alterar dinâmicamente ícone -->
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
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Main", route: "/" },
        // { icon: 'mdi-folder', text: 'Projetos', route: '/projetos' },
        { icon: "mdi-account", text: "Developers", route: "/desenvolvedores" },
        { icon: "mdi-file-upload", text: "Upload", route: "/upload" },
        { icon: "mdi-movie", text: "First Access", route: "/firstaccess" },
        // { icon: 'mdi-face', text: 'Time', route: '/time' },
      ],
    };
  },
};
</script>
