<template>
  <div class="time">
    <h1>Time</h1>

    <v-container>
          <v-btn @click="upload()">Upload</v-btn>
    </v-container>


  

  </div>


</template>

<script>
// @ is an alias to /src
import Upload from '../services/upload'

export default {
  name: 'Time',
  methods: {
    upload(){
      console.log("TESTE");
      Upload.retornarArquivo();
    }
  }
 
}
</script>
