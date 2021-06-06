<template>
  <div class>
    <h3>Incompleted Tasks</h3>
    <v-divider></v-divider>
    <!-- <h1>DEVs - Open Tasks</h1> -->
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
        height="300"
        :headers="headers"
        :items="formatedarray"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
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
        { text: "Start Date", value: "startDate" },
        { text: "Open Tasks", value: "openTasks" },
      ],
      desserts: [
        {
          name: "Ana Júlia",
          openTasks: 6.0,
          startDate: 159,
        },
      ],
    };
  },
  methods: {
    treatCycle(projs) {
      console.log(projs);
      var devs = {};
      projs.forEach(function (e) {
        if (!devs[e.dev_id]) devs[e.dev_id] = [e];
        else devs[e.dev_id].push(e);
      });

      for (const element in devs) {
        let inicio = [];
        let nome = '';
        let obj = devs[element];
        obj.forEach((e) => {
          if(e.nome){
            nome = e.nome + " " + e.sobrenome
          }
          if (!e.horas) {
            if (e.inicio) {
              inicio.push(new Date(e.inicio));
            }
          }
        });
        let minDate = new Date(Math.min.apply(null, inicio));
        let totalCompletas = '';
        if (inicio.length) {
          totalCompletas = inicio.length;
        }else{
          totalCompletas = '-'
          minDate = '--'
          }
        devs[element].inicioGeral = [inicio];
        devs[element].dataInicio = minDate;
        devs[element].tasksIncompletas = totalCompletas;
        devs[element].nome = nome;
      }
      console.log(devs);
      this.setArray(devs);
    },

    setArray(devs) {
      this.formatedarray = []
      // let multipleJsons = []
      // let comp = []
      for (let k in devs) {
        // this.formatedarray = []
        this.singleJson = {}
        this.singleJson = {
          name: devs[k]["nome"],
          openTasks: devs[k]["tasksIncompletas"],
          startDate: devs[k]["dataInicio"],
        };
        console.log(this.singleJson);
        this.formatedarray.push(this.singleJson);
        this.formatedarray = [...new Set(this.formatedarray)]
      }
      // comp = multipleJsons
      // let aaa = this.getUnique(multipleJsons, comp)
      // console.log(aaa)
    },

    // getUnique(arr, comp) {
    //   // store the comparison  values in array
    //   let unique =  arr.map(e => e[comp])
    //   // store the indexes of the unique objects
    //   .map((e, i, final) => final.indexOf(e) === i && i)
    //   // eliminate the false indexes & return unique objects
    //   .filter((e) => arr[e]).map(e => arr[e]);
    //   console.log(unique)
    //   return unique;
    // }
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