<template>
  <div>
    <h1>{{ this.$route.params.name }}</h1>
    <v-divider></v-divider>
    <br />

    <h2 class="pa-2 font-weight-strong text-uppercase primary--text">
      {{ this.$route.params.project_name }}
    </h2>

    <!-- gráfico de linhas -->
    <v-container class="my-5">
      <lineTotalHours />
    </v-container>

    <!-- gráfico de pizza -->
    <v-container class="my-5">
      <pieDevContribution />
    </v-container>
  </div>
</template>   

<script>
import lineTotalHours from "@/components/base/lineTotalHours";
import pieDevContribution from "@/components/base/pieDevContribution";

export default {
  name: "TotalHoursDev",
  components: {
    lineTotalHours,
    pieDevContribution,
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
  },
  computed: {
    projectByDeveloper() {
      return this.$store.state.projectByDeveloper;
    },
  },
  mounted() {
    // this.$store.dispatch('getProjectByDev', this.$route.params.dev_id, this.$route.params.id);
    this.$store.dispatch({
      type: "getProjectByDev",
      devId: this.$route.params.dev_id,
      projId: this.$route.params.id,
    });
  },
};
</script>


<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
