<template>
  <v-container grid-list-lg pl-0 pr-0>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="primary--text">Notify Errors</h3>
        <prism-editor :code="notifyErrorsCode" language="js" readonly/>
        <br>
        <h3 class="primary--text">Moment Timezone</h3>
        <prism-editor :code="timeZoneCode" language="js" readonly/>
        <br>
        <h3 class="primary--text">Check Super Admin</h3>
        <prism-editor :code="isSuperAdminCode" language="js" readonly/>
        <br>
        <h3 class="primary--text">Check whether User Has Access in Page</h3>
        <prism-editor :code="hasAccessCode" language="js" readonly/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PrismEditor from 'vue-prism-editor';
import Libraries from './Libraries';
export default {
  components: {
    PrismEditor
  },
  data() {
    return {
      notifyErrorsCode: `this.notifyErrors(error)`,
      timeZoneCode: `this.timeZone(momentData, 'DD MMM YYYY H:mm z')`,
      hasAccessCode: `this.hasAccess(['read', 'write', 'admin'])`,
      isSuperAdminCode: `this.isSuperAdmin()`
    }
  }
}
</script>