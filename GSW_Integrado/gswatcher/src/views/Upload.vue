<template>
  <div class="time">
    <h1>Upload</h1>

    <v-container>
          <v-btn @click="upload()">Upload</v-btn>
    </v-container>


  

  </div>


</template>

<script>
// @ is an alias to /src
import DataService from '../services/DataService'

//objetivo final é transformar esse caminho em um modal

export default {
  methods: {
    upload(){
      //console.log("TESTE");
      DataService.uploadButton();
    }
  }
 
}
</script>
