<template>
  <div class>
    <h3>Completed Tasks</h3>
    <v-divider></v-divider>
    <v-card class="my-8">
      <v-card-title>
        <v-icon>mdi-account-search</v-icon>
        <v-text-field
          single-line
          hide-details
          hide-default-header
        ></v-text-field>
      </v-card-title>
      <v-data-table
        height="250"
        :headers="headers"
        :items="formatedarray"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "table01",
  data() {
    return {
      formatedarray: [],
      singleJson: {},
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Completed Tasks", value: "completedTasks" },
        { text: "Start Date", value: "startDate" },
        { text: "Total Hours", value: "totalHours" },
      ],
      desserts: [
        {
          name: "Nome",
          completedTasks: 0,
          startDate: 0,
          totalHours: 0,
        },
      ],
    };
  },

  methods: {
    treatCycle(projs) {
      // console.log(projs);
      var devs = {};
      projs.forEach(function (e) {
        if (!devs[e.dev_id]) devs[e.dev_id] = [e];
        else devs[e.dev_id].push(e);
      });

      for (const element in devs) {
        let horas = [];
        let inicio = [];
        let nome = '';
        let obj = devs[element];
        // console.log(obj)
        obj.forEach((e) => {
          if(e.nome){
            nome = e.nome + " " + e.sobrenome
          }
          if (e.horas) {
            horas.push(e.horas);
          }
          if (e.inicio) {
            inicio.push(new Date(e.inicio));
          }
        });
        let minDate = new Date(Math.min.apply(null, inicio));
        let total = horas.reduce(
          (total, currentElement) => total + currentElement
        );
        let totalCompletas = horas.length;

        devs[element].horasGerais = [horas];
        devs[element].inicioGeral = [inicio];
        devs[element].dataInicio = minDate;
        devs[element].tasksCompletas = totalCompletas;
        devs[element].totalHoras = total;
        devs[element].nome = nome;
      }
      // console.log(devs);
      this.setArray(devs);
    },

    setArray(devs) {
      this.formatedarray = []
      for (let k in devs) {
        this.singleJson = {}
        this.singleJson = {
          name: devs[k]["nome"],
          completedTasks: devs[k]["tasksCompletas"],
          startDate: devs[k]["dataInicio"],
          totalHours: devs[k]["totalHoras"],
        };
        this.formatedarray.push(this.singleJson);
        this.formatedarray = [...new Set(this.formatedarray)]
      }
    },
  },

  computed: {
    project() {
      return this.$store.state.project;
    },
  },

  mounted() {
    this.$store.dispatch("getProject", this.$route.params.id);
  },

  watch: {
    project() {
      this.treatCycle(this.project);
    },
  },
};
</script>