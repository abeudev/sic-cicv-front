<template>
  <v-layout row wrap class="g-tree-view">
    <v-flex xs12 sm4>
      <v-text-field
        v-model="search"
        label="Search"
        clearable
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm8>
      <v-checkbox
        v-model="isSelectAll"
        label="Select All"
        class="ml-3 left"
        color="primary"
      ></v-checkbox>
      <v-checkbox
        v-model="isUpdateAll"
        label="Update All"
        class="ml-3 left"
        color="primary"
      ></v-checkbox>
      <v-radio-group v-model="allAccess" row :disabled="!isUpdateAll" class="pl-4">
        <v-radio color="primary" label="Read" value="read"></v-radio>
        <v-radio color="primary" label="Write" value="write"></v-radio>
        <v-radio color="primary" label="Admin" value="admin"></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 sm10>
      <v-treeview
        :search="search"
        v-model="selectedItems"
        return-object
        :items="tree"
        item-key="name"
        item-text="title"
        selected-color="indigo"
        open-on-click
        selectable
        hoverable
        expand-icon="expand_more"
        on-icon="check_box"
        off-icon="check_box_outline_blank"
        indeterminate-icon="indeterminate_check_box"
      >
        <template v-slot:append="{ item }">
          <div v-if="item.requiresAccess && !loading && selectedItems.some(selected => selected.name == item.name)">
            <v-chip 
              :color="item.access == access.value ? 'primary' : 'grey'" 
              dark 
              small 
              v-for="access in accessOptions"
              :key="access.value"
              @click="setAccess(item, access.value)"
            >
              {{ access.text }}
            </v-chip>
          </div>
        </template>
      </v-treeview>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "TreeSelection",
  props: ["tree", "value", "placeholder"],
  data() {
    return {
      loading: false,
      selectedItems: [],
      search: '',
      isSelectAll: false,
      isUpdateAll: false,
      allAccess: 'read',
      accessOptions: [
        { text: 'Read', value: 'read' },
        { text: 'Write', value: 'write' },
        { text: 'Admin', value: 'admin' }
      ]
    };
  },
  mounted() {
    /**
     * Update Tree Object to set route access
     */
    this.updateTree();
    this.forceUpdateUI();
  },
  watch: {
    /**
     * Observe value for asynchronous.
     * Trigger only if selectedItems is empty
     */
    value: function(val) {
      if (val.length > 0 && this.selectedItems.length < 1) {
        this.selectedItems = val;
        this.updateTree(val);
        this.forceUpdateUI();
      }
    },
    /**
     * Observe selectedItems and update value props
     */
    selectedItems: function(val) {
      this.$emit('update:value', val);
      this.forceUpdateUI();
    },
    /**
     * Select All Routes
     */
    isSelectAll: function(val) {
      if (val) this.selectedItems = [...this.flattenedObject(this.tree)];
    },
    /**
     * Observe isUpdateAll then update all access with same value
     */
    isUpdateAll: async function(val) {
      if (val) {
        const update = await this.$root.$confirm(
          "Update All?",
          "Are you sure you want to update all access?",
          { color: "error lighten-1" }
        );
        if (update) {
          this.updateAllAccess();
        } else {
          this.isUpdateAll = false;
        }
      }
    },
    /**
     * Value for all access
     */
    allAccess: function(val) {
      this.updateAllAccess();
    }
  },
  methods: {
    /**
     * Update tree props with new data
     * @param {Array} value
     */
    updateTree(value) {
      this.$emit('update:tree', this.createTreeObject(this.tree, value));
    },
    /**
     * Update Tree Object to set route access
     * @param {Array} obj
     * @param {Array} value
     */
    createTreeObject(obj = [], value = []) {
      const menuOptions = [];
      obj.forEach(route => {
        route.access = 'read';
        if (value) {
          const item = value.find(val => val.name == route.name);
          if (item) route.access = item.access;
        }
        if (route.children) {
          route.children = this.createTreeObject(route.children, value);
        }
        menuOptions.push(route);
      });
      return menuOptions;
    },
    /**
     * Transform Objects to flat array
     * @param {Array} obj
     */
    flattenedObject(obj) {
      let flat = [];
      obj.forEach(route => {
        flat.push(route);
        if (route.children) flat = [...flat, ...this.flattenedObject(route.children)];
      });
      return flat;
    },
    /**
     * Set a route access of an object in selectedItems
     * @param {Object} item
     * @param {String} access
     */
    setAccess(item, access) {
      item.access = access;
      const updated = this.selectedItems.map(val => {
        if (val.name == item.name) val.access = access;
        return val;
      });
      this.selectedItems = updated;
      this.$emit('update:value', updated);
      this.forceUpdateUI();
    },
    /**
     * Set all routes to have same access
     */
    updateAllAccess() {
      if (this.isUpdateAll) {
        const routes = [];
        this.selectedItems.forEach(val => {
          val.access = this.allAccess;
          routes.push(val);
        });
        this.selectedItems = routes;
        this.$emit('update:value', routes);
        this.forceUpdateUI();
      }
    },
    /**
     * Force Update Tree UI
     * Update Access Selection, since UI not updated on change
     */
    forceUpdateUI() {
      this.loading = true;
      this.$nextTick().then(() => {
        this.loading = false;
      });
    }
  }
};
</script>