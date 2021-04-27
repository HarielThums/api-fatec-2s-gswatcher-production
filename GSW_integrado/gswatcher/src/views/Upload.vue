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
import Upload from '../services/upload'

//objetivo final é transformar esse caminho em um modal

export default {
  name: 'Upload',
  methods: {
    upload(){
      console.log("TESTE");
      Upload.retornarArquivo();
    }
  }
 
}
</script>
