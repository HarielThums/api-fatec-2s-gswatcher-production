<template>
  <div class="home">
    <h1>Tasks Per Project</h1>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3 sb-1"> </v-layout>
      <mainBarChart />
      <v-layout> </v-layout>
    </v-container>

    <h1>My Projects</h1>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small flat color="grey" @click="sortBy('name')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Project</span>
        </v-btn>
        <!-- <v-btn small flat color="grey" @click="sortBy('id')">
          <v-icon left small>mdi-calendar</v-icon>
          <span class="caption text-lowercase">Started At</span>
        </v-btn> -->
        <v-btn small flat color="grey" @click="sortBy('tasks')">
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
        <v-col v-for="project in projects" :key="project.projeto_id" :project="project">
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

                  <v-card-title class="title">{{ project.projeto_nome }}</v-card-title>
                  <v-card-text>
                    <div class="my-0 subtitle-1">
                      <!--ALTERAÇÃO-->
                      <p>||</p>
                    </div>
                    <div>Total Tasks: {{ project.total_de_task }}</div>
                  </v-card-text>
                  <v-card-actions class="my-0">
                    <v-btn :to="{ name: 'projetos', params: {id: project.projeto_id, name: project.projeto_nome}}" outlined text>
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
// import DataService from "../services/DataService";

export default {
  name: "Home",
  components: {
    mainBarChart,
  },

  data: function () {
    return {
      projs: [],
    };
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
    }
  },
  mounted() {
    this.$store.dispatch('getProjects');
  },
};
</script>
<style >
</style>