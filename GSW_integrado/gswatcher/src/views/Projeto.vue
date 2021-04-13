<template>
  <div class="projeto">
    <h1>Projeto</h1>
    <h2 class="pa-2 font-weight-light text-uppercase grey--text">
      [Albuquerque Albuquerque and Carvalho Comércio] - Mandatory human-resource
      open architecture
    </h2>

    <v-container class="my-5">
      <barChart />
    </v-container>

    <v-container class="my-5">
      <lineChart />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import barChart from "@/components/base/barChart";
import lineChart from "@/components/base/lineChart";

export default {
  name: "Projeto",
  components: {
    barChart,
    lineChart,
  },
  data() {
    return {};
  },
};
</script>


<style>
</style>