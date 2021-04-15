<template>
  <div class="projeto">
    <h1>Projeto</h1>

     <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>




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

    <v-container class="my-5">
      <table01 />
    </v-container>

    <v-container class="my-5">
      <table02 />
    </v-container>

    <v-container class="my-5">
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
  data () {
    return {
      projeto: [],
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      console.log(this.$route.params);
      DataService.getAllTasksById(fetchedId, (err, post) => {
        console.log(this.post);
        
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.id !== fetchedId) return
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      }).then((response) => {
          this.projeto = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};
</script>


<style>
</style>