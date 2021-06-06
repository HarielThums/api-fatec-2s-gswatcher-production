<template>
  <div class="home">
    <h1>Main</h1>
    <p>
      Welcome to the <strong>GSWatcher Web Application</strong>. Take a look in
      your projects down below.
    </p>

    <v-divider></v-divider>
    <br />
    <h2>Tasks Per Project</h2>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3 sb-1"> </v-layout>
      <mainBarChart />
      <v-layout> </v-layout>
    </v-container>

    <h2>My Projects</h2>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small flat color="primary" @click="sortBy('name')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Project</span>
        </v-btn>
        <!-- <v-btn small flat color="grey" @click="sortBy('id')">
          <v-icon left small>mdi-calendar</v-icon>
          <span class="caption text-lowercase">Started At</span>
        </v-btn> -->
        <v-btn small flat color="primary" @click="sortBy('tasks')">
          <v-icon left small>mdi-list-status</v-icon>
          <span class="caption text-lowercase">Total Tasks</span>
        </v-btn>
        <!-- <v-btn small flat color="grey" @click="upload(projects)">
            <v-icon left small>mdi-upload</v-icon>
            <span class="caption text-lowercase">Upload</span>
          </v-btn> -->
      </v-layout>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
      <v-row>
        <!--ALTERAÇÃO NO COLS-->
        <v-col
          v-for="project in projects"
          :key="project.projeto_id"
          :project="project"
        >
          <!-- Arrumar o tamanho dos Cards -->
          <v-flex>
            <!--xs6 sm4 md6---------------------------------------------------------------------->
            <v-layout row wrap>
              <v-flex xs12 lg12>
                <v-card
                  :loading="loading"
                  :class="`mx-auto my-4 project ${project.projeto_id}`"
                  width="420"
                >
                  <v-responsive>
                    <!-- <v-img :src="project.user.avatar" height="120"></v-img> -->
                  </v-responsive>

                  <v-card-title class="title">{{
                    project.projeto_nome
                  }}</v-card-title>
                  <v-card-text>
                    <!-- <div class="my-0 subtitle-1">
                      <span><strong>Start Date: </strong></span>
                      <span>||</span>
                    </div> -->
                    <div class="my-0 subtitle-1">
                      <span><strong>Total Tasks: </strong></span>
                      <span>{{ project.total_de_task }}</span>
                    </div>
                  </v-card-text>
                  <v-card-actions class="my-0">
                    <v-btn
                      class="primary white--text"
                      :to="{
                        name: 'projetos',
                        params: {
                          id: project.projeto_id,
                          name: project.projeto_nome,
                        },
                      }"
                      outlined
                      text
                    >
                      <!-- ROTA DE TESTE  -->
                      <!-- /about - carrega depois de alterar a página -->
                      Details
                      <v-icon>mdi-google-analytics</v-icon>
                    </v-btn>

                    <!-- <v-btn :to="`/projeto/${project.id}`" outlined text> -->
                    <!-- ROTA DE TESTE  -->
                    <!-- /projeto - carrega antes de alterar a página -->
                    <!-- Details -->
                    <!-- <v-icon>mdi-close-octagon</v-icon> -->
                    <!-- </v-btn>      -->
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>

            <!---------------------------------------------------------------------------------->
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import mainBarChart from "@/components/base/mainBarChart";
// import { http } from "../services/api";
// import DataService from "../services/DataService";

export default {
  name: "Projects",

  data: function () {
    return {
      projs: [],
      token: "",
    };
  },

  components: {
    mainBarChart,
  },

  async created() {
    // var a = localStorage.getItem("@gswatcher:token");
    // console.log(a);
    // if (a == null) {
    //   this.$router.push("/login");
    // }
    // if (!localStorage.getItem("@gswatcher:token")) {
    //   this.$router.push("/login");
    // }
  },

  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      console.log(this.projects);
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },

  mounted() {
    this.$store.dispatch("getProjects");
    //*** TENTATIVA DE LIMITAR O ACESSO BASEADO NA TOKEN ***
    if (localStorage.getItem("@gswatcher:token") == null) {
       this.$router.push("/login");
     }
  },
};
</script>
<style >
</style>
