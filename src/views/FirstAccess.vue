<template>
  <div class="time">
    <h1>First Access</h1>
    <v-divider></v-divider>

    <v-contaier fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="main-div">
            <div>
              <p id="cab">
                Welcome to the <br />
                <strong>GSWatcher Web App</strong><br />
              </p>
              <p>
                If you want to know how everything works in here and how to use
                this application properly take a look at the video down below
              </p>
            </div>
            <div class="video-div">
              <iframe
                width="280px"
                height="200px"
                src="https://www.youtube.com/embed/8j8ktkdrvd4"
                title="YouTube video player"
                frameborder="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-contaier>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "FirstAccess",
};
</script>

<style>
.main {
  display: flex;
  align-items: center;
}

.main-div {
  padding: 10px 10px 0px 10px;
  border: 2px solid white;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 2px grey;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 500px;
}

.video-div {
  padding: 5px 5px 0px 5px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
  max-width: 500px;
  position: relative;
}

p strong {
  color: #006064;
}

#cab {
  font-size: 25px;
}
</style>
