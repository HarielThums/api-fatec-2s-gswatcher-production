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
          <li>
            Click on green button
            <strong class="primary--text">SAVE DATA</strong>
          </li>
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
        <div v-if="submitted2">
          <div v-if="uploaded">
            <v-alert dense text type="success">
              {{ message_upload.data.message }}
            </v-alert>
          </div>
          <div v-else-if="uploaded_error">
            <v-alert dense outlined type="error">
              {{ error }}
            </v-alert>
          </div>

          <v-row align="center" justify="space-around">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="cyan darken-4" to="" v-on:click="populate_db()"
                >SAVE DATA</v-btn
              >
            </v-card-actions>
          </v-row>
          <br />
          <br />
          <div v-if="uploaded">
            <p class="cyan--text text--darken-4">
              Now your file is in database and will be displayed in
              <strong>GSWatcher</strong>
              Application
            </p>
          </div>
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

//objetivo final é transformar esse caminho em um modal

export default {
  name: "Upload",
  components: {
    // uploadButtons,
  },
  data() {
    return {
      dialog: false,
      file: "",
      message_upload: "",
      message_submit: "",
      error: "",
      submitted_error: false,
      submitted: false,
      uploaded_error: false,
      uploaded: false,
      submitted2: false,
    };
  },

  methods: {
    async submitFile() {
      try {
        let formData = new FormData();
        formData.append("file", this.file);
        await DataService.create(formData);
        this.message_submit = "The file was uploaded successfully";
        this.submitted = true;
        this.submitted2 = true;
        this.uploaded = false;
      } catch (error) {
        this.error = "Error has occurred, try again latter";
        this.submitted_error = true;
        this.uploaded = false;
      }

      this.dialog = false;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async populate_db() {
      try {
        let resp = await DataService.uploadButton();
        this.message_upload = resp;
        this.uploaded = true;
        this.submitted = false;
      } catch (error) {
        this.error =
          "Error has occurred, check if the uploaded file is *.json extension";
        this.uploaded_error = true;
        this.submitted = false;
      }
    },
  },
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
}
</style>
