<template>
  <div class="projetos">
    <h1>Project Details</h1>
    <v-divider></v-divider>
    <h2 class="pa-2 font-weight-strong text-uppercase primary--text">
      {{ this.$route.params.name }}
    </h2>

    <!-- <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green">
        </v-progress-circular>
      </div>
    </v-container> -->

    <v-container class="my-5">
      <v-divider></v-divider>
      <barChart v-bind:projeto="projeto"> </barChart>
    </v-container>

    <v-container class="my-5">
      <v-divider></v-divider>
      <lineChart v-bind:project="project"></lineChart>
    </v-container>

    <v-container class="my-5">
      <v-divider></v-divider>
      <pieChart />
    </v-container>

    <h2>Project Developers</h2>
    <v-divider></v-divider>

    <v-container class="my-5">
      <table01 v-bind:project="project"></table01>
    </v-container>

    <v-container class="my-5">
      <table02 />
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
  name: "projetos",
  props: ["id"],
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
    };
  },

  methods: {
    count(project) {
      const counts = {};
      let status = [];
      let statusValue = [];

      project.forEach((r) => {
        counts[r["status_nome"]] = (counts[r["status_nome"]] || 0) + 1;
      });

      for (const key in counts) {
        console.log(`${key} : ${counts[key]}`);
        status.push(key);
        statusValue.push(counts[key]);
      }

      console.log(status);
      console.log(statusValue);

      this.projeto = [status, statusValue];

      this.series = [
        {
          data: statusValue,
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: status,
          },
        },
      };
    },
  },

  // computed: {
  //   project() {
  //     return this.$store.state.project;
  //   },
  // },

  mounted() {
    // this.$store.dispatch("getProject", this.$route.params.id);
    if (localStorage.getItem("@gswatcher:token") == null) {
      this.$router.push("/login");
    }
  },

  // watch: {
  //   project() {
  //     this.count(this.project);
  //   },
  // },

  // methods: {
  //   fetchProjs: function () {
  //     const baseURI = "localhost:3000/api/tasks/1";
  //     this.$http.get(baseURI).then((result) => {
  //       this.projeto = result;
  //     });
  //   },
  // },
};
</script>
