import { mapGetters } from "vuex";

export default {
  methods: {
    /**
     * Check if user is admin
     */
    isSuperAdmin() {
      if (this.role) {
        return this.role.level == -1;
      }
    },
    /**
     * Check wether user has permission to a open page
     * @param {String} routeName 
     */
    hasPermission(routeName = '') {
      if (this.isSuperAdmin()) return true;
      return this.role.permissions.some(role => role.name == routeName);
    },
    /**
     * Check wether user has access in route
     * @param {Array} access 
     */
    hasAccess(access = []) {
      if (this.isSuperAdmin()) return true;
      const route = this.role.permissions.find(role => role.name == this.$route.name);
      return access.includes(route.access);
    }
  },
  computed: mapGetters({
    role: "auth/role"
  })
};