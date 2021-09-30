<template>
  <div>
    <v-content>
      <v-container fluid class="login-container">
        <transition name="fade" mode="out-in" :duration="{ enter: 100, leave: 50 }">
          <slot />
        </transition>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
