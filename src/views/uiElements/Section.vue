<template>
  <v-card :dark="dark" class="elevation-soft-grey">
    <v-card-title class="grey lighten-3 py-0">
      <span class="primary--text">{{section.path}}</span>
      <v-spacer></v-spacer>
      <v-btn light icon @click="dark = !dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs12>
          <component :is="section.name" class="mt-3" />
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['section'],
  data() {
    return {
      dark: false
    }
  }
}
</script>