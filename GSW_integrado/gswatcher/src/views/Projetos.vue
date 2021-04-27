<template>
  <div class="projetos">
    <!-- <h1>Homepage</h1> -->

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
        <v-btn small flat color="grey" @click="sortBy('project')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Project</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('user._id')">
          <v-icon left small>mdi-calendar</v-icon>
          <!--era "responsável"-->
          <span class="caption text-lowercase">Started At</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('status')">
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
                  :headers="headers"
                  :items="devs"
                  disable-pagination
                  :hide-default-footer="true"
                >




                  <v-responsive>
                    <!-- <v-img :src="project.user.avatar" height="120"></v-img> -->
                  </v-responsive>

                  <v-card-title class="title">{{
                    project.nome
                  }}</v-card-title>
                  <v-card-text>
                    <div class="my-0 subtitle-1">
                      <!--ALTERAÇÃO-->
                      <p>Started Date: {{ project.nome }}</p>
                    </div>
                    <div>Total Tasks: {{ project.test }}</div>
                  </v-card-text>
                  <v-card-actions class="my-0">
                    <v-btn to="/projeto" outlined text>
                      Details
                      <v-icon>mdi-google-analytics</v-icon>
                    </v-btn>
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
// @ is an alias to /src
// import Upload from "../services/upload";
import DataService from "../services/DataService";
var projectReq = {};

export default {
  name: "Projetos",
    data() {
      return {
        projs: [],
        test: [],
        title: "",
        headers: [
          { text: "Id", align: "start", sortable: false, value: "id" },
          { text: "Nome", value: "nome", sortable: false },
          { text: "Sobrenome", value: "sobrenome", sortable: false },
          { text: "Foto", value:"foto", sortable: false },
        ],
      };
    },
    methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      // console.log(this.projects);
    },
    // upload(projects) {
    //   console.log("TESTE");
    //   let jsonData = Upload.retornarArquivo();
    //   // console.log(jsonData);
    //   // projects.concat(jsonData);
    //   this.projects = [...projects, ...jsonData];
    //   this.projects = new Set(this.projects);
    //   console.log(projects);
    // },
    retrieveProjs() {
      DataService.getAllProjs()
        .then((response) => {
          this.projs = response.data.map(this.getDisplayProjs);
          // console.log(response.data);
          projectReq = response.data;
          // console.log(projectReq);
          projectReq = JSON.stringify(projectReq);
          localStorage.setItem('dataReq', projectReq);
          console.log(this.projs);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayProjs(proj, test) {

        DataService.getAllTasksById(proj.projeto_id)
        .then((response) =>{
          // console.log(response.data);
          let total =  response.data.length
          console.log(total);
          test = {id: proj.projeto_id, name: proj.projeto_nome, projeto: response.data, total: total};
          // console.log(test);
        })
        // console.log(proj.projeto_id);

      // console.log(proj);
      // console.log(proj.projeto_id);
      return {
        id: proj.projeto_id,
        nome: proj.projeto_nome,
        test: test,

      };
    },
  },
   mounted() {
    this.retrieveProjs();
  },
};
</script>

<style>
.project.DONE {
  border: 3px rgb(123, 224, 123) solid;
}
</style>