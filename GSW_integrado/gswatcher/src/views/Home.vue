<template>
  <div class="home">
    <h1>Tasks Per Project</h1>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3 sb-1"> </v-layout>
      <mainBarChart />
      <v-layout> </v-layout>
    </v-container>

    <h1>My Projects</h1>
    <v-divider></v-divider>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small flat color="grey" @click="sortBy('project')">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">Project</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('user._id')">
          <v-icon left small>mdi-calendar</v-icon>
          <!--era "responsável"-->
          <span class="caption text-lowercase">Started At</span>
        </v-btn>
        <v-btn small flat color="grey" @click="sortBy('status')">
          <v-icon left small>mdi-list-status</v-icon>
          <span class="caption text-lowercase">Total Tasks</span>
        </v-btn>
        <!-- <v-btn small flat color="grey" @click="upload(projects)">
            <v-icon left small>mdi-upload</v-icon>
            <span class="caption text-lowercase">Upload</span>
          </v-btn> -->
      </v-layout>
    </v-container>

    <v-spacer></v-spacer>

    <v-container>
      <v-row>
        <!--ALTERAÇÃO NO COLS-->
        <v-col v-for="project in projects" :key="project.id">
          <!-- Arrumar o tamanho dos Cards -->
          <v-flex>
            <!--xs6 sm4 md6---------------------------------------------------------------------->
            <v-layout row wrap>
              <v-flex xs12 lg12>
                <v-card
                  :loading="loading"
                  :class="`mx-auto my-4 project ${project.status}`"
                  width="420"
                >
                  <v-responsive>
                    <!-- <v-img :src="project.user.avatar" height="120"></v-img> -->
                  </v-responsive>

                  <v-card-title class="title">{{
                    project.project
                  }}</v-card-title>
                  <v-card-text>
                    <div class="my-0 subtitle-1">
                      <!--ALTERAÇÃO-->
                      <p>Started Date: {{ project.user.userLastName }}</p>
                    </div>
                    <div>Total Tasks: {{ project.status }}</div>
                  </v-card-text>
                  <v-card-actions class="my-0">
                    <v-btn to="/projeto" outlined text>
                      Details
                      <v-icon>mdi-google-analytics</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>

            <!---------------------------------------------------------------------------------->
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import mainBarChart from "@/components/base/mainBarChart";

export default {
  name: "Home",
  components: {
    mainBarChart,
  },

  data: function () {
    return {
      projects: [
        {
          id: "104b786a-3dc0-4bd7-8068-c2a9517ef5cc",
          status: "IN_PROGRESS",
          user: {
            id: "7e492c89-9350-444c-8f8f-e41bd0b3e25d",
            avatar: "http://placeimg.com/640/480/people",
            first_name: "Ana Júlia",
            last_name: "Franco",
            email: "ana-julia.franco@gsw.com.br",
          },
          amountHours: null,
          startedAt: "2021-02-08T18:39:25.367Z",
          finished: false,
          project:
            "[Albuquerque, Albuquerque and Carvalho Comércio] - Mandatory human-resource open architecture",
          cardDescription: "program virtual program",
          gitMetadata: {
            branch: "bus-navigate",
            hash: "7b4067663b66bda41fdb59a7a51fd3489a52200e",
          },
        },
        {
          _id: "58e97d30-4318-41bd-b866-867075b9fa5a",
          status: "DONE",
          user: {
            _id: "619c9c1f-6901-4377-9588-854d23fa3672",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Enzo Gabriel",
            userLastName: "Saraiva",
            userEmail: "enzo-gabriel.saraiva@gsw.com.br",
          },
          hours: 5.11,
          startedAt: "2020-05-19T10:25:11.891Z",
          isFinished: true,
          project:
            "[Carvalho, Costa and Costa e Associados] - Ergonomic methodical methodology",
          cardDescription: "connect online pixel",
          gitMetadata: {
            branch: "alarm-synthesize",
            hash: "1318b7eb0d4afabd7ef812a466c18c1857279ff5",
          },
        },
        {
          _id: "ce3125e6-0d91-4ae2-bbc8-6ece53be980a",
          status: "IN_PROGRESS",
          user: {
            _id: "a5b13cf1-dd82-4494-9663-15c4490c5928",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Elísio",
            userLastName: "Martins",
            userEmail: "elisio.martins@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-28T03:05:50.377Z",
          isFinished: false,
          project:
            "[Costa Comércio Comércio] - Sharable non-volatile internet solution",
          cardDescription: "connect haptic hard drive",
          gitMetadata: {
            branch: "array-parse",
            hash: "8c43ea95d27c67bc06498fcfdbc619dbb7d5fbe1",
          },
        },
        {
          _id: "04ad10ee-b4a0-4be7-8df2-edd6a45ee9cb",
          status: "IN_PROGRESS",
          user: {
            _id: "29af5134-9b8d-489a-8303-a83f89cb07ff",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Lucca",
            userLastName: "Melo",
            userEmail: "lucca.melo@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-27T00:25:15.268Z",
          isFinished: false,
          project:
            "[Santos - Batista Comércio] - Stand-alone well-modulated policy",
          cardDescription: "input primary hard drive",
          gitMetadata: {
            branch: "system-connect",
            hash: "b99c698915b220a8b6f0022cb02f134355f51e07",
          },
        },
        {
          _id: "74859594-d0da-49b1-99d4-e4d8b380e904",
          status: "IN_PROGRESS",
          user: {
            _id: "44ba38d2-ecb3-49ad-b84a-a26dfb9cea43",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Carlos",
            userLastName: "Batista",
            userEmail: "carlos.batista@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-26T14:39:53.233Z",
          isFinished: false,
          project:
            "[Xavier EIRELI S.A.] - Vision-oriented holistic architecture",
          cardDescription: "parse cross-platform card",
          gitMetadata: {
            branch: "capacitor-parse",
            hash: "de093ed474a9f4f30833314477aafebbf6421e99",
          },
        },
        {
          _id: "3f333a59-0bf0-4d91-b7ed-61e07436b271",
          status: "QA_DEPLOYING",
          user: {
            _id: "fdd3db4c-e2d7-4b78-9b25-2a0cb0de0c9a",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Bernardo",
            userLastName: "Souza",
            userEmail: "bernardo.souza@gsw.com.br",
          },
          hours: 3.4,
          startedAt: "2020-08-03T21:21:12.282Z",
          isFinished: true,
          project:
            "[Costa Comércio Comércio] - Sharable non-volatile internet solution",
          cardDescription: "calculate digital panel",
          gitMetadata: {
            branch: "microchip-bypass",
            hash: "57feccb96ccebf09b94b772e54f94fa60eec8805",
          },
        },
        {
          _id: "657bad83-c24d-4fe5-baf7-8f375f40d56d",
          status: "FOR_TEST",
          user: {
            _id: "8e839b75-d84b-46be-954d-4f6fcf19a534",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Antônio",
            userLastName: "Nogueira",
            userEmail: "antonio.nogueira@gsw.com.br",
          },
          hours: 4.55,
          startedAt: "2019-07-06T14:58:00.515Z",
          isFinished: true,
          project:
            "[Souza Comércio e Associados] - Innovative background implementation",
          cardDescription: "generate optical feed",
          gitMetadata: {
            branch: "driver-synthesize",
            hash: "f12dcb69bbffea35f8dbeec9a5c0c13314e5b5da",
          },
        },
        {
          _id: "9eecfca8-4d30-4441-ab1f-78b1cefd12c8",
          status: "FOR_TEST",
          user: {
            _id: "a2930a94-d631-406b-a3f7-f960edbb8c25",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Matheus",
            userLastName: "Barros",
            userEmail: "matheus.barros@gsw.com.br",
          },
          hours: 8.89,
          startedAt: "2019-03-19T18:56:25.483Z",
          isFinished: true,
          project:
            "[Pereira - Barros Comércio] - Mandatory fault-tolerant Graphical User Interface",
          cardDescription: "synthesize open-source capacitor",
          gitMetadata: {
            branch: "protocol-copy",
            hash: "1de25ef5b0396b0be8708a75e88bbb4064c5ba2b",
          },
        },
        {
          _id: "81e71581-d9db-4e14-b47d-de79dce556e9",
          status: "IN_PROGRESS",
          user: {
            _id: "8c7d3ba7-9b51-4f78-a863-b3074af5f7a1",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Cecília",
            userLastName: "Moreira",
            userEmail: "cecilia.moreira@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-28T00:07:26.022Z",
          isFinished: false,
          project:
            "[Costa Comércio Comércio] - Sharable non-volatile internet solution",
          cardDescription: "bypass digital sensor",
          gitMetadata: {
            branch: "hard-drive-override",
            hash: "b4ba4b2bb0d53f5aae1b8aa63ae94f15ed0e6ce4",
          },
        },
        {
          _id: "f4c0b8d1-d3d9-4722-9a22-68c669d3e202",
          status: "IN_PROGRESS",
          user: {
            _id: "7e251a76-cd69-40e7-8455-fc2d76a49650",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Kléber",
            userLastName: "Oliveira",
            userEmail: "kleber.oliveira@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-24T05:21:23.163Z",
          isFinished: false,
          project: "[Costa LTDA S.A.] - Total asynchronous secured line",
          cardDescription: "bypass digital alarm",
          gitMetadata: {
            branch: "transmitter-copy",
            hash: "6fd4dc95775047df179dd4a1062c283171cc0e8e",
          },
        },
        {
          _id: "0866887d-4d7b-4a98-821c-3a0862ade758",
          status: "PROD_DEPLOYING",
          user: {
            _id: "a5b13cf1-dd82-4494-9663-15c4490c5928",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Elísio",
            userLastName: "Martins",
            userEmail: "elisio.martins@gsw.com.br",
          },
          hours: 9.17,
          startedAt: "2020-08-27T12:30:57.023Z",
          isFinished: true,
          project:
            "[Albuquerque, Albuquerque and Carvalho Comércio] - Mandatory human-resource open architecture",
          cardDescription: "index mobile protocol",
          gitMetadata: {
            branch: "program-synthesize",
            hash: "5186659925de8216af056d5d87b0c18b152d604e",
          },
        },
        {
          _id: "2e5ee2f8-895d-4e33-82c4-64ab55eed063",
          status: "IN_PROGRESS",
          user: {
            _id: "fdd3db4c-e2d7-4b78-9b25-2a0cb0de0c9a",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Bernardo",
            userLastName: "Souza",
            userEmail: "bernardo.souza@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-10T02:43:38.429Z",
          isFinished: false,
          project:
            "[Carvalho, Costa and Costa e Associados] - Ergonomic methodical methodology",
          cardDescription: "synthesize neural bandwidth",
          gitMetadata: {
            branch: "card-calculate",
            hash: "640e9963fb345339a8f63911902d2bbff757beef",
          },
        },
        {
          _id: "111aad63-f4c5-4eb9-9a8e-43def7f22aeb",
          status: "FOR_TEST",
          user: {
            _id: "fdd3db4c-e2d7-4b78-9b25-2a0cb0de0c9a",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Bernardo",
            userLastName: "Souza",
            userEmail: "bernardo.souza@gsw.com.br",
          },
          hours: 3.57,
          startedAt: "2020-08-03T05:32:14.517Z",
          isFinished: true,
          project:
            "[Santos - Batista Comércio] - Stand-alone well-modulated policy",
          cardDescription: "calculate 1080p bandwidth",
          gitMetadata: {
            branch: "feed-program",
            hash: "43872a39ad57e02e53197fa622cd4ded27b410d6",
          },
        },
        {
          _id: "87ddcbcb-da4e-409b-8b07-0393a365fee4",
          status: "IN_PROGRESS",
          user: {
            _id: "29af5134-9b8d-489a-8303-a83f89cb07ff",
            avatar: "http://placeimg.com/640/480/people",
            userName: "Lucca",
            userLastName: "Melo",
            userEmail: "lucca.melo@gsw.com.br",
          },
          hours: null,
          startedAt: "2021-02-23T06:57:49.827Z",
          isFinished: false,
          project:
            "[Souza Comércio e Associados] - Innovative background implementation",
          cardDescription: "compress wireless application",
          gitMetadata: {
            branch: "port-input",
            hash: "eb616b965fa3462ebd848fcd6c6eda4bf99c82b2",
          },
        },
      ],
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      console.log(this.projects);
    },
    // upload(projects){
    //   console.log("TESTE");
    //   let jsonData = Upload.retornarArquivo();
    //   // console.log(jsonData);
    //   // projects.concat(jsonData);
    //   this.projects = [...projects , ...jsonData];
    //   this.projects = new Set(this.projects);
    //   console.log(projects);

    // }
  },
};
</script>
<style >
</style>