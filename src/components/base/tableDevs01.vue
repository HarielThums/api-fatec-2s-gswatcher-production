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
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "table01",
  props: ["project"],
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
        { text: "Completed Tasks", value: "completedTasks" },
        { text: "Start Date", value: "startDate" },
        { text: "Total Hours", value: "totalHours" },
      ],
      desserts: [
        {
          name: "Ana Júlia",
          completedTasks: 159,
          startDate: 159,
          totalHours: 6.0,
        },
        {
          name: "Antônio",
          completedTasks: 237,
          startDate: 237,
          totalHours: 9.0,
        },
        {
          name: "Bernardo",
          completedTasks: 262,
          startDate: 262,
          totalHours: 16.0,
        },
        {
          name: "Carlos",
          completedTasks: 305,
          startDate: 305,
          totalHours: 3.7,
        },
        {
          name: "Cecília",
          completedTasks: 356,
          startDate: 356,
          totalHours: 16.0,
        },
        {
          name: "Célia",
          completedTasks: 375,
          startDate: 375,
          totalHours: 0.0,
        },
        {
          name: "Davi",
          completedTasks: 392,
          startDate: 392,
          totalHours: 0.2,
        },
        {
          name: "Elísio",
          completedTasks: 408,
          startDate: 408,
          totalHours: 3.2,
        },
        {
          name: "Enzo Gabriel",
          completedTasks: 452,
          startDate: 452,
          totalHours: 25.0,
        },
        {
          name: "Fábio",
          completedTasks: 518,
          startDate: 518,
          totalHours: 26.0,
        },
      ],
    };
  },
};
</script>