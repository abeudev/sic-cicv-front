<template>
  <span>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="toggleModal()">
          <v-icon color="primary" dark v-on="on">mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <span>View Code</span>
    </v-tooltip>
    <v-dialog v-model="isOpen" :max-width="width ? width : '500px'" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">View Code</span>
        </v-card-title>
        <v-card-text class="py-0">
          <v-layout row wrap>
            <v-flex xs12>
              <prism-editor :code="code" language="js" readonly/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat round @click.native="toggleModal()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
export default {
  components: { PrismEditor },
  props: ["code", "width"],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>