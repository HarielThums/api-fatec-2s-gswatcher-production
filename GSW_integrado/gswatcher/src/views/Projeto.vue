<template>
  <div class="projeto">
    <h1>Project</h1>
    <h2 class="pa-2 font-weight-light text-uppercase grey--text">
      [Albuquerque Albuquerque and Carvalho Comércio] - Mandatory human-resource
      open architecture
    </h2>

    <v-container class="my-5">
      <h3>Tasks Per Status</h3>
      <v-divider></v-divider>
      <barChart />
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

import barChart from "@/components/base/barChart";
import lineChart from "@/components/base/lineChart";
import pieChart from "@/components/base/pieChart";
import table01 from "@/components/base/tableDevs01";
import table02 from "@/components/base/tableDevs02";

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
    return {};
  },
};
</script>


<style>
</style>