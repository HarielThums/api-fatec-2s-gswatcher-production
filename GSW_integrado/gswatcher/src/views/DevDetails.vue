<template>
  <div>
    <h1>DEV Robinho</h1>
    <v-container>
      <h3>Tasks per Project</h3>
      <v-divider></v-divider>
      <barDevProjs />
    </v-container>
  </div>
</template>

<script>
import barDevProjs from "@/components/base/barDevProjs";

export default {
  name: "DevDetails",
  components: {
    barDevProjs,
  },
  data() {},
};
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>