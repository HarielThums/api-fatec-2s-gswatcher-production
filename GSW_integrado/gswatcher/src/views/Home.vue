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
        <v-btn small flat color="grey" @click="sortBy('nome')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Project</span>
        </v-btn>
        <!-- <v-btn small flat color="grey" @click="sortBy('id')">
          <v-icon left small>mdi-calendar</v-icon>
          <span class="caption text-lowercase">Started At</span>
        </v-btn> -->
        <v-btn small flat color="grey" @click="sortBy('total')">
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
        <v-col v-for="project in projs" :key="project.id">
          <!-- Arrumar o tamanho dos Cards -->
          <v-flex>
            <!--xs6 sm4 md6---------------------------------------------------------------------->
            <v-layout row wrap>
              <v-flex xs12 lg12>
                <v-card
                  :loading="loading"
                  :class="`mx-auto my-4 project ${project.id}`"
                  width="420"
                >
                  <v-responsive>
                    <!-- <v-img :src="project.user.avatar" height="120"></v-img> -->
                  </v-responsive>

                  <v-card-title class="title">{{ project.nome }}</v-card-title>
                  <v-card-text>
                    <div class="my-0 subtitle-1">
                      <!--ALTERAÇÃO-->
                      <p>||</p>
                    </div>
                    <div>Total Tasks: {{ project.total }}</div>
                  </v-card-text>
                  <v-card-actions class="my-0">
                    <v-btn :to="`/about/${project.id}`" outlined text>
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
import DataService from "../services/DataService";

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
    log(data) {
      console.log("data");
      console.log(data.id);
    },
    sortBy(prop) {
      this.projs.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      console.log(this.projs);
    },
    retrieveProjs() {
      DataService.getAllProjs()
        .then((response) => {
          this.projs = response.data.map(this.getDisplayProjs);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayProjs(proj) {
      return {
        id: proj.projeto_id,
        nome: proj.projeto_nome,
        total: proj.total_de_task,
      };
    },
  },
  mounted() {
    this.retrieveProjs();
  },
};
</script>
<style >
</style>