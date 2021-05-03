<template>
  <div>
    <h1>Developers</h1>
    <v-divider></v-divider>
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="title" label="Search by Title"></v-text-field>
      </v-col>

      <v-col v-for="dev in devs" :key="dev.id">
        <!-- Arrumar o tamanho dos Cards -->
        <v-flex>
          <!--xs6 sm4 md6---------------------------------------------------------------------->
          <v-layout row wrap>
            <v-flex xs12 lg12>
              <v-card
                :loading="loading"
                :class="`mx-auto my-4 project ${dev.id}`"
                width="420"
              >
                <v-card-title class="title">{{ dev.nome }}</v-card-title>
                <v-card-text>
                  <div>Total Tasks: {{ dev.nome }}</div>
                </v-card-text>
                <v-card-actions class="my-0">
                  <v-btn
                    :to="{
                      name: 'devdetails',
                      params: { id: dev.id, name: dev.nome },
                    }"
                    outlined
                    text
                  >
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

      <v-col cols="12" md="4">
        <v-btn small @click="searchTitle"> Search </v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Tutorials</v-card-title>

          <v-data-table
            :headers="headers"
            :items="devs"
            disable-pagination
            :hide-default-footer="true"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataService from "../services/DataService";

// @ is an alias to /src

// import barChart from '@/components/base/barChart';
// import lineChart from '@/components/base/lineChart';

export default {
  name: "Desenvolvedores",
  //   components: {
  //     barChart,
  //     lineChart,
  //   },
  data() {
    return {
      devs: [],
      title: "",
      headers: [
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Nome", value: "nome", sortable: false },
        { text: "Sobrenome", value: "sobrenome", sortable: false },
        { text: "Foto", value: "foto", sortable: false },
      ],
    };
  },
  methods: {
    retrieveDevs() {
      DataService.getAllDevs()
        .then((response) => {
          this.devs = response.data.map(this.getDisplayDevs);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayDevs(devs) {
      return {
        id: devs.dev_id,
        nome: devs.nome,
        sobrenome: devs.sobrenome,
        email: devs.email,
        foto: devs.foto,
      };
    },
  },
  mounted() {
    this.retrieveDevs();
  },
};
</script>


<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
</style>