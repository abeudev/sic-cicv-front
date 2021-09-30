<template>
  <v-container grid-list-lg px-0 pt-0>
    <v-layout row wrap>
      <v-flex xs12>
        <p v-html="uiElements.description" />
      </v-flex>
    </v-layout>
    <v-layout row wrap v-for="(section, index) in uiElements.sections" :key="index" class="pb-4">
      <v-flex xs12>
        <h3>{{section.title}}</h3>
        <p v-html="section.description"></p>
        <ui-section :section="section" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import uiElements from "./uiElements.json";
import Section from "./Section";

export default {
  components: { uiSection: Section },
  computed: {
    uiElements() {
      const routeName = this.$route.name;
      return uiElements.find(ui => ui.name == routeName);
    }
  }
}
</script>