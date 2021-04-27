<template>
  <div class>
    <h3>DEVs - Incompleted Tasks</h3>
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
        height="250"
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        {
          name: "Antônio",
          openTasks: 9.0,
          startDate: 237,
        },
        {
          name: "Bernardo",
          openTasks: 16.0,
          startDate: 262,
        },
        {
          name: "Carlos",
          openTasks: 3.7,
          startDate: 305,
        },
        {
          name: "Cecília",
          openTasks: 16.0,
          startDate: 356,
        },
        {
          name: "Célia",
          openTasks: 0.0,
          startDate: 375,
        },
        {
          name: "Davi",
          openTasks: 0.2,
          startDate: 392,
        },
        {
          name: "Elísio",
          openTasks: 3.2,
          startDate: 408,
        },
        {
          name: "Enzo Gabriel",
          openTasks: 25.0,
          startDate: 452,
        },
        {
          name: "Fábio",
          openTasks: 26.0,
          startDate: 518,
        },
      ],
    };
  },
};
</script>