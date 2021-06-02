<template>
  <div class="projeto">
    <h1>Project</h1>
    <h2 class="pa-2 font-weight-light text-uppercase grey--text">{{this.$route.params.name}}</h2>

    <v-container class="my-5">
      <h3>Tasks Per Status</h3>
      <v-divider></v-divider>
      <barChart v-bind:projeto="projeto"> </barChart>
    </v-container>

    <v-container class="my-5">
      <h3>Total Hours Per Period</h3>
      <v-divider></v-divider>
      <lineChart />
    </v-container>

    <v-container class="my-5">
      <h3>DEVs - Completed Tasks</h3>
      <v-divider></v-divider>
      <table01 />
    </v-container>

    <v-container class="my-5">
      <h3>DEVs - Incompleted Tasks</h3>
      <v-divider></v-divider>
      <table02 />
    </v-container>

    <v-container class="my-5">
      <h3>Conclusion Percentage</h3>
      <v-divider></v-divider>
      <pieChart />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import barChart from "@/components/base/barChart";
import lineChart from "@/components/base/lineChart";
import pieChart from "@/components/base/pieChart";
import table01 from "@/components/base/tableDevs01";
import table02 from "@/components/base/tableDevs02";

import DataService from "../services/DataService";

export default {
  name: "Projeto",
  components: {
    barChart,
    lineChart,
    pieChart,
    table01,
    table02,
  },
  data() {
    return {
      projeto: [],
      post: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("ave ent");
    DataService.getAllTasksById(to.params.id, (err, post) => {
      console.log(err);
      next((vm) => vm.setData(err, post));
    }),
      DataService.getAllTasksById(to.params.id).then((response) => {
        console.log(response.data);
        // this.projeto = response.data;
        // console.log(this.projeto);
      });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.post = null;
    console.log("ave upt");
    DataService.getAllTasksById(to.params.id, (err, post) => {
      this.setData(err, post);
      next();
    });
  },
  methods: {
    setData(err, post) {
      console.log("ave set");
      if (err) {
        this.error = err.toString();
      } else {
        this.post = post;
        console.log("ave ave");
        console.log(post);
        console.log(this.post);
      }
    },
  },
   mounted() {
    var id = parseInt(this.$route.params.id);
    axios
      .get("http://127.0.0.1:3000/api/teste3/" + id, { crossDomain: true })
      .then((response) => {
        this.projeto = response.data;
        console.log(this.projeto);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>


<style>
</style>