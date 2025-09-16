<template>
  <v-app>
    <HeaderComponent/>
    <v-main>
      <router-View/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>

</style>
