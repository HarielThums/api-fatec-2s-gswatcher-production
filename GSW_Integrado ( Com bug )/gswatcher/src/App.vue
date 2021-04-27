<template>
  <v-app class="grey darken-4">
    <Navbar />
    <v-main>
      <v-conteiner fluid>
        <router-view class="mx-4"></router-view>
      </v-conteiner>
    </v-main>
      <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Navbar from './components/Navbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    
  },


  data: () => ({
    //
  }),
};
</script>
