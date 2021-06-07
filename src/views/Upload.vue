<template>
  <div class="time">
    <h1>Upload</h1>
    <v-divider></v-divider>
    <br />
    <div class="p">
      <div class="buttons">
        <h3 class="primary--text">How to upload your JSON file</h3>
        <br />
        <ol>
          <li>Click on <strong class="primary--text">UPLOAD</strong></li>
          <li>Click on <strong class="primary--text">BROWSE</strong></li>
          <li>Select your file from your device</li>
          <li>Click on <strong class="primary--text">SAVE</strong></li>
        </ol>

        <!-- <v-container>
          <v-btn @click="upload()">Upload</v-btn>
    </v-container> -->

        <!-- *** BOTÃO UPLOAD ***  -->
        <div class="pt-10 ma-2">
          <div v-if="submitted">
            <v-row justify="center">
              <v-alert dense text type="success">
                {{ message_submit }}
              </v-alert>
            </v-row>
          </div>
          <div v-else-if="submitted_error">
            <v-row justify="center">
              <v-alert dense outlined type="error">
                {{ error }}
              </v-alert>
              <br />
            </v-row>
          </div>

          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="alert" dark v-bind="attrs" v-on="on">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon class="white--text">mdi-file-upload</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="white--text"
                        >Upload</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Upload de Arquivo</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <div class="container">
                      <div class="large-12 medium-12 small-12 cell">
                        <label
                          >File
                          <input
                            type="file"
                            id="file"
                            ref="file"
                            v-on:change="handleFileUpload()"
                          />
                        </label>
                        <div v-if="loading">
                          <Spinner/>
                        </div>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="cyan darken-4" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="cyan darken-4" text @click="submitFile()">
                    Save
                  </v-btn>
                  
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <!-- *** BOTÃO SAVE DATA *** 
      <div class="pt-10 ma-2">
        <v-row justify="center">
          <v-btn color="success" text @click="populate_db()">Save Data</v-btn>
        </v-row>
      </div> -->

        <br />
        <br />
          <div v-if="submitted">
            <p class="cyan--text text--darken-4">
              Now your file is in database and will be displayed in
              <strong>GSWatcher</strong>
              Application
            </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from "axios";

//import uploadButtons from "@/components/base/uploadButtons";
import DataService from "../services/DataService";
import Spinner from '../components/base/Spinner.vue'

//objetivo final é transformar esse caminho em um modal

export default {
  name: "Upload",
  components: {Spinner},
  data() {
    return {
      dialog: false,
      file: "",
      loading: false,
      message_submit: "",
      error: "",
      submitted_error: false,
      submitted: false,
      submitted2: false,
    };
  },

  methods: {
    async submitFile() {
      try {
        let formData = new FormData();
        formData.append("file", this.file);
        this.loading = true;
        await DataService.create(formData);
        this.message_submit = "The file was uploaded successfully";
        this.submitted = true;
        this.loading = false;
        this.submitted2 = true;
      } catch (error) {
        this.error = "Error has occurred, try again latter";
        this.submitted_error = true;
      }

      this.dialog = false;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
  mounted() {
    //*** TENTATIVA DE LIMITAR O ACESSO BASEADO NA TOKEN ***
    if (localStorage.getItem("@gswatcher:token") == null) {
       this.$router.push("/login");
     }
  }
};
</script>

<style >
.buttons {
  padding: 10px 10px 0px 10px;
  border: 2px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 4px grey;
  min-width: 300px;
  max-width: 700;
}

.p {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
