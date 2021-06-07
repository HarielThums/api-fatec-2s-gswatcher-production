<template>
  <div>
    <h1>Developers</h1>
    <v-divider></v-divider>

    <!-- <v-btn rounded color="blue" dark @click="setArray()"></v-btn> -->

    <v-container class="pa-5">
      <v-row align="align">
        <v-col>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="arr"
              :search="search"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="nome"
              show-expand
              class="elevation-1"
            >
              <template v-slot:top>
                <!-- <v-toolbar flat>
                  <v-toolbar-title>Desenvolvedores</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-switch
                    v-model="singleExpand"
                    label="Single expand"
                    class="mt-2"
                  ></v-switch>
                </v-toolbar> -->
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  More info about
                  <a
                    :href="'/devdetails/' + item.dev_id + '?nome=' + item.nome"
                    class="text-decoration-none"
                  >
                    {{ item.nome }}</a
                  >
                  projects
                </td>

                <!-- <v-btn :to="{ name: 'devdetails', params: { id: item.dev_id, name: item.nome, sobrenome: item.email }}" outlined text> aaa <v-btn> -->
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Desenvolvedores",
  data() {
    return {
      search: "",
      expanded: [],
      singleExpand: false,
      arr: [],
      jso: {},
      headers: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "nome",
        },
        // { text: "E-mail", value: "email" },
        { text: "Total Tasks", value: "task" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {
    setArray() {
      this.developers.forEach((elem) => {
        this.jso = {
          nome: elem.nome + " " + elem.sobrenome,
          dev_id: elem.dev_id,
          email: elem.email,
          task: elem.total_de_task,
        };
        this.arr.push(this.jso);
      });
      console.log(this.arr);
    },
  },
  //  updated(){
  //   this.setArray()
  //  },
  computed: {
    developers() {
      return this.$store.state.developers;
    },
  },
  watch: {
    developers() {
      this.setArray();
    },
  },
  mounted() {
    this.$store.dispatch("getDevelopers");
    //*** TENTATIVA DE LIMITAR O ACESSO BASEADO NA TOKEN ***
    if (localStorage.getItem("@gswatcher:token") == null) {
       this.$router.push("/login");
     }
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