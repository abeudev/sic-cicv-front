<template>
  <div>
    <!-- ============= Toolbar ============= -->
    <v-card-title
      class="gon-table-toolbar pl-0 pr-0 pb-0"
      v-if="
        table.toolbar && (table.toolbar.daterange.display || table.toolbar.exportButtons)
      "
    >
      <DatePicker
        label="Start Date"
        :date.sync="startDate"
        :max="endDate"
        class="mr-2"
        v-if="table.toolbar && table.toolbar.daterange && table.toolbar.daterange.display"
      ></DatePicker>
      <DatePicker
        label="End Date"
        :date.sync="endDate"
        :min="startDate"
        v-if="table.toolbar && table.toolbar.daterange && table.toolbar.daterange.display"
      ></DatePicker>
      <v-btn
        :loading="loading"
        round
        small
        color="secondary"
        v-if="
          table.toolbar &&
          table.toolbar.daterange &&
          table.toolbar.daterange.display &&
          table.settings.isServerSide
        "
        @click="refreshTable()"
        >chercher</v-btn
      >
      <v-spacer v-for="i in 10" :key="i"></v-spacer>
    </v-card-title>

    <v-card-title
      class="gon-table-toolbar pa-0"
      v-if="
        table.toolbar &&
        (table.toolbar.search ||
          table.toolbar.archivedTableSwitcher ||
          table.toolbar.topRightButtons)
      "
    >
      <v-text-field
        v-model="search"
        append-icon="search"
        label="recherche"
        single-line
        solo
        hide-details
        class="pt-0 mt-1 gon-search"
        v-if="table.toolbar.search"
      ></v-text-field>
      <v-switch
        v-model="isActive"
        label="Active"
        color="green"
        class="pl-4 mt-0"
        v-if="table.toolbar.archivedTableSwitcher"
      ></v-switch>

      <v-spacer></v-spacer>
      <div v-if="table.toolbar.topRightButtons">
        <v-btn
          :id="button.id"
          outline
          color="green"
          class="gon-btn elevation-0 mr-0"
          dark
          :class="button.className"
          @click="button.action ? button.action() : null"
          v-for="(button, index) in topRightButtons"
          :key="index"
        >
          <v-icon left>{{ button.icon || "touch_app" }}</v-icon>
          {{ button.text || "Button" }}
        </v-btn>
        <v-menu
          offset-y
          class="justify-end"
          v-for="(button, key) in groupedTopRightButtons"
          :key="key"
        >
          <v-btn
            slot="activator"
            outline
            color="green"
            class="gon-btn elevation-0 mr-0"
            dark
          >
            <v-icon left>keyboard_arrow_down</v-icon>
            <!-- {{ _.startCase(key) || "Plus d'actions" }} -->
            {{ "Plus d'actions" }}
          </v-btn>
          <v-list class="gon-list">
            <v-list-tile
              v-for="(btn, i) in button"
              :key="i"
              @click="btn.action ? btn.action() : null"
              :id="btn.id"
              :class="btn.className"
            >
              <v-list-tile-action>
                <v-icon>{{ btn.icon || "touch_app" }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                {{ btn.text || "Button" }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>

      <v-tooltip top v-if="table.toolbar.filters && table.toolbar.filters.length > 0">
        <template slot="activator">
          <v-btn
            icon
            color="secondary"
            class="gon-btn elevation-0 mr-0"
            dark
            @click="showFilters = !showFilters"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <span>Toggle Filter</span>
      </v-tooltip>

      <v-tooltip top>
        <template slot="activator">
          <v-menu offset-y class="justify-end" :close-on-content-click="false">
            <v-btn
              slot="activator"
              icon
              color="secondary"
              class="gon-btn elevation-0 mr-0"
              dark
            >
              <v-icon>mdi-table-column</v-icon>
            </v-btn>
            <v-list class="gon-list">
              <v-list-tile
                v-for="(btn, i) in table.headers.filter((item) => item.text != 'Actions')"
                :key="i"
                @click="toggleColumn(btn.key, !btn.isVisible)"
              >
                <v-list-tile-action>
                  <v-icon v-if="btn.isVisible">check</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{ btn.text || "Undefined" }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
        <span>Toggle Column</span>
      </v-tooltip>

      <v-tooltip top v-if="table.toolbar.exportButtons">
        <template slot="activator">
          <v-menu offset-y class="justify-end">
            <v-btn
              slot="activator"
              icon
              color="secondary"
              class="gon-btn elevation-0 mr-0"
              dark
            >
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
            <v-list class="gon-list">
              <v-list-tile
                v-for="(btn, i) in exportButtons"
                :key="i"
                @click="generateReportData(table.title || 'Untitled', btn.fileType)"
                :class="btn.className"
              >
                <v-list-tile-action>
                  <v-icon>{{ btn.icon || "touch_app" }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{ btn.text || "Button" }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
        <span>Export Table</span>
      </v-tooltip>
    </v-card-title>

    <v-card-title
      class="gon-table-toolbar pl-0 pr-0 pb-0"
      v-if="table.toolbar.filters && table.toolbar.filters.length > 0 && showFilters"
    >
      <v-container fluid grid-list-md py-0>
        <v-layout row wrap>
          <v-flex xs12 sm2 v-for="(filter, i) in table.toolbar.filters" :key="i">
            <v-autocomplete
              :items="filter.options"
              v-model="filter.value"
              :label="filter.label"
              class="pt-0 mt-1"
              clearable
              v-if="filter.type == 'select'"
            ></v-autocomplete>
            <v-text-field
              v-model="filter.value"
              :label="filter.label"
              class="pt-0 mt-1"
              clearable
              v-else
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>

    <!-- ============= Datatables ============= -->
    <v-data-table
      :headers="headers"
      :items="table.settings.isServerSide ? tableItems : staticData"
      v-model="selected"
      item-key="_id"
      must-sort
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPage"
      :total-items="totalItems"
      :loading="table.settings.isServerSide ? loading : table.settings.loading"
      :select-all="table.toolbar && table.toolbar.selectAll ? true : false"
      class="gon-table"
      :class="table.toolbar ? '' : 'pt-2'"
      :search="!table.settings.isServerSide ? search : null"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">{{ props.header.text }}</span>
          <span>{{ props.header.text }}</span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td v-if="table.toolbar && table.toolbar.selectAll">
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td v-for="(content, index) in contents" :key="index" :class="content.className">
          <div
            class="d-inline-block"
            :class="content.getRecord ? 'cursor-pointer' : ''"
            @click="content.getRecord ? content.getRecord(props.item) : null"
            v-html="
              content.render
                ? content.render(getColumn(content.data, props.item), props.item)
                : getColumn(content.data, props.item)
            "
          ></div>
        </td>
        <td class="px-0" v-if="table.actions">
          <v-layout
            align-center
            justify-center
            row
            fill-height
            v-if="table.settings.isServerSide ? !loading : !table.settings.loading"
          >
            <v-tooltip top v-for="(action, index) in actions" :key="index">
              <template
                slot="activator"
                v-if="action.isVisible ? action.isVisible(props.item) : true"
              >
                <v-btn
                  icon
                  class="mx-0"
                  @click="action.getRecord ? action.getRecord(props.item) : null"
                >
                  <v-icon :color="action.color || 'blue'">{{
                    action.icon || "touch_app"
                  }}</v-icon>
                </v-btn>
              </template>
              <span>{{ action.text || "Get Data" }}</span>
            </v-tooltip>
          </v-layout>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import { jsPDF } from "jspdf";
import { mapGetters } from "vuex";
import { getTableData } from "../../api/utilities/datatable";
import DatePicker from "../../components/helpers/DatePicker";
import * as jsonexport from "jsonexport/dist";
import "jspdf-autotable";

export default {
  components: { DatePicker },
  name: "DataTable",
  props: ["table"],
  data() {
    return {
      // Toolbar
      search: "",
      startDate: "",
      endDate: "",
      isActive: true,
      exportUrl: "",
      showFilters: false,
      exportButtons: [
        {
          fileType: "csv",
          icon: "mdi-file-delimited",
          text: "Export CSV",
        },
        {
          fileType: "xls",
          icon: "mdi-file-excel",
          text: "Export XLS",
        },
        {
          fileType: "pdf",
          icon: "mdi-file-pdf",
          text: "Export PDF",
        },
      ],
      // Datatable
      totalItems: 0,
      selected: [],
      tableItems: [],
      initialStaticData: [],
      loading: true,
      pagination: this.table.settings.pagination,
      rowsPerPage: [10, 25, 100, 500, 1000],
      // =================
    };
  },
  created() {
    this.initialDate();
    this.parseHeader();
    this.initialPagination();
    if (this.table.filters) {
      this.initialFilters = JSON.parse(JSON.stringify(this.table.filters));
    }
    this.table.selected = [];
  },
  computed: {
    ...mapGetters({ timeAndRegion: "config/timeAndRegion" }),
    /**
     * Single Top Right Buttons
     * @returns {Array}
     */
    topRightButtons() {
      const buttons = [...this.table.toolbar.topRightButtons];
      return buttons.filter((button) => button.isVisible() && !button.groupName);
    },
    /**
     * Grouped Top Right Buttons
     * @returns {Array}
     */
    groupedTopRightButtons() {
      const buttons = [...this.table.toolbar.topRightButtons];
      const filtered = buttons.filter(
        (button, i) => button.isVisible() && button.groupName
      );
      return _.groupBy(filtered, "groupName");
    },
    /**
     * Main Table Displayed Header
     */
    headers() {
      const headers = [...this.table.headers];
      return headers.filter((header) => header.isVisible);
    },
    /**
     * Main Table Displayed Content
     * @returns {Array}
     */
    contents() {
      if (this.table.headers.length == 0) return [];
      const contents = [...this.table.contents];
      const headers = this.headers.filter((item) => item.text != "Actions");
      const mainContents = contents.filter((item) => !item.hideColumn);
      const data = mainContents.filter((content, i) => {
        return headers.some((item, index) => {
          if (item.key == content.data) {
            return content;
          }
        });
      });
      return data;
    },
    /**
     * Displayed Actions
     * @returns {Array}
     */
    actions() {
      if (!this.isActive)
        return this.table.actions.filter((action) => action.showInArchived);
      return this.table.actions.filter((action) => !action.showInArchived);
    },
    /**
     * Displayed Content for Static Mode
     * @returns {Array}
     */
    staticData() {
      const data = JSON.parse(JSON.stringify(this.table.settings.data || []));
      if (this.initialStaticData.length == 0)
        this.initialStaticData = JSON.parse(JSON.stringify(data));
      if (
        this.table.toolbar &&
        this.table.toolbar.daterange &&
        this.table.toolbar.daterange.display
      ) {
        return this.filterByDate(data);
      }
      return data;
    },
  },
  watch: {
    pagination: {
      handler() {
        if (this.table.settings.isServerSide) this.refreshTable();
      },
      deep: true,
    },
    search: _.debounce(function (val) {
      if (this.table.settings.isServerSide) this.refreshTable();
    }, 500),
    selected: {
      handler() {
        this.table.selected = JSON.parse(JSON.stringify(this.selected));
      },
      deep: true,
    },
    "table.toolbar.filters": {
      handler: _.debounce(function (val) {
        if (this.table.settings.isServerSide) {
          this.serverSideFilters(val);
        } else {
          this.staticFilter(val);
        }
      }, 500),
      deep: true,
    },
    isActive: function () {
      if (this.table.settings.isServerSide) this.refreshTable();
    },
  },
  methods: {
    /**
     * Refresh Table Data for Server Side Mode
     */
    refreshTable() {
      this.loading = true;
      this.setDate();

      /**
       * Collect Data from pagination
       */
      const { sortBy: sort, descending, page, rowsPerPage: length } = this.pagination,
        start = (page - 1) * length,
        order = descending ? "desc" : "asc",
        filter = this.search;

      /**
       * Generate Table Filter
       */
      const $match = {
        ...this.table.filters,
        createdAt: {
          $gt: { $date: this.startDate },
          $lt: { $date: this.endDate },
        },
      };
      if (this.table.toolbar && this.table.toolbar.archivedTableSwitcher)
        $match.isActive = this.isActive;

      /**
       * Generate Query to assign in post body
       */
      const paginate = {
        filter: {
          $match,
        },
        datatable: {
          columns: this.generateQuery(),
          order: [
            {
              column: sort,
              dir: order,
            },
          ],
          start: start,
          length: length,
          search: {
            value: filter,
            regex: false,
          },
        },
      };

      if (!this.table.toolbar || !this.table.toolbar.daterange.display)
        delete paginate.filter.$match.createdAt;

      /**
       * Get Table Data from API
       */
      let items, total;
      getTableData(this.table.settings.url, paginate)
        .then((response) => {
          this.loading = false;
          this.tableItems = response.data.data.data;
          this.totalItems = response.data.data.recordsTotal;
        })
        .catch((err) => {
          this.notifyErrors(err);
        });
    },

    /**
     * Initial Sort for server side mode
     */
    initialPagination() {
      if (this.table.settings.isServerSide) {
        const index = this.contents.findIndex(
          (item) => item.data === this.table.settings.pagination.sortBy
        );
        this.table.settings.pagination.sortBy = index >= 0 ? index : 0;
      }
    },

    /**
     * Collect date value from daterange picker
     */
    setDate() {
      const startDate = this.$moment(this.startDate)
        .tz(this.timeAndRegion.timezone)
        .set({ hour: 0, minute: 0, second: 0 })
        .format("x");
      const endDate = this.$moment(this.endDate)
        .tz(this.timeAndRegion.timezone)
        .set({ hour: 23, minute: 59, second: 59 })
        .format("x");
      this.startDate = parseInt(startDate);
      this.endDate = parseInt(endDate);
    },

    /**
     * Set initial date to 1 month behind
     */
    initialDate() {
      const startDate = this.$moment()
        .tz(this.timeAndRegion.timezone)
        .subtract(1, "months")
        .set({ hour: 0, minute: 0, second: 0 })
        .format("x");
      const endDate = this.$moment()
        .tz(this.timeAndRegion.timezone)
        .set({ hour: 23, minute: 59, second: 59 })
        .format("x");
      this.startDate = parseInt(startDate);
      this.endDate = parseInt(endDate);
    },

    /**
     * Filter table by Date for Static Mode
     * @param {Array} data
     */
    filterByDate(data) {
      const start = this.startDate;
      const end = this.endDate;
      const fieldName = this.table.toolbar.daterange.fieldName;
      if (!start && !end) return data;
      if (start) data = data.filter((item) => item[fieldName] >= start);
      if (end) data = data.filter((item) => item[fieldName] <= end);
      return data;
    },

    /**
     * Parse header value
     * For sort purpose
     * @returns {Array}
     */
    parseHeader() {
      if (this.table.actions)
        this.table.headers.push({
          text: "Actions",
          align: "center",
          sortable: false,
          width: 200,
        });
      const contents = this.table.contents.filter((item) => !item.hideColumn);
      this.table.headers = this.table.headers.map((header, i) => {
        header.isVisible = true;
        contents.forEach((item, index) => {
          if (i == index) {
            header.value = item.data;
            header.key = item.data;
          }
        });
        if (this.table.settings.isServerSide) header.value = i;
        return header;
      });
    },

    /**
     * Parse string from table props to match with table data
     * @param {String} val
     * @param {Object} data
     * @returns {String}
     */
    getColumn(val, data) {
      let split = val.split(".");
      let temp = "";
      for (let i = 0; i < split.length; i++) {
        temp = data[split[i]];
        if (temp) data = temp;
        if (!temp) data = "";
      }
      return data;
    },

    /**
     * Generate Column Format to assign in post body
     * @returns {Array}
     */
    generateQuery() {
      const contents = this.contents.map((item) => item.data);
      const additionalContents = this.table.contents
        .filter((item) => item.hideColumn)
        .map((filtered) => filtered.data);
      const columns = [...contents, ...additionalContents, "_id"];
      return columns.map((item) => {
        return {
          data: item,
          searchable: true,
          orderable: true,
          name: "",
          search: {
            value: "",
            regex: false,
          },
        };
      });
    },

    /**
     * Show or Hide column
     */
    toggleColumn(key, isVisible) {
      const copy = JSON.parse(JSON.stringify(this.table.headers));
      this.table.headers = copy; // Trigger the changes;
      this.table.headers.find((head) => head.key == key).isVisible = isVisible;
      this.pagination.sortBy = 0;
      this.pagination.descending = false;
      this.$nextTick(() => {
        this.$forceUpdate();
        if (this.table.settings.isServerSide) this.refreshTable();
      });
    },

    /**
     * Create filter object then merge to request body
     */
    serverSideFilters(filterData) {
      const filters = {};
      filterData.forEach((filter) => {
        if (filter.value) {
          if (filter.type == "input") {
            const reg = {
              $regex: filter.value,
              $options: "i",
            };
            filters[filter.fieldName] = reg;
          } else {
            filters[filter.fieldName] = filter.value;
          }
        }
      });
      this.table.filters = { ...this.initialFilters, ...filters };
      this.refreshTable();
    },

    /**
     * Filter for Static Data
     */
    staticFilter(filterData) {
      let filters = {};
      let cloneData = JSON.parse(JSON.stringify(this.initialStaticData));
      filterData.forEach((filter) => {
        if (filter.value) filters[filter.fieldName] = filter.value;
      });
      cloneData = cloneData.filter((item) => {
        for (var key in filters) {
          if (
            this.getColumn(key, item) === undefined ||
            this.getColumn(key, item).toLowerCase().indexOf(filters[key].toLowerCase()) <
              0
          )
            return false;
        }
        return true;
      });
      this.table.settings.data = JSON.parse(JSON.stringify(cloneData));
    },

    /**
     * Generate Report Data from actual data and render by this.contents
     */
    generateReportData(name, type) {
      let data = null;
      if (this.table.settings.isServerSide) {
        data = JSON.parse(JSON.stringify(this.tableItems));
      } else {
        data = JSON.parse(JSON.stringify(this.staticData));
      }
      const displayKeys = this.contents;
      const report = [];

      data.forEach((d) => {
        const keys = Object.keys(d);
        const newData = {};
        displayKeys.forEach((displayKey) => {
          for (const key in d) {
            const displayKeySplit = displayKey.data.split(".")[0];
            if (displayKeySplit == key) {
              newData[this._.startCase(key)] = this.getColumn(displayKey.data, d);
              if (displayKey.render) {
                const render = displayKey.render(this.getColumn(displayKey.data, d), d);
                const isHtml = /<\/?[a-z][\s\S]*>/i.test(render);
                if (!isHtml) newData[this._.startCase(key)] = render;
              }
            }
          }
        });
        report.push(newData);
      });
      if (type == "xls" || type == "csv") {
        this.saveAsSheet(report, name, type);
      } else if (type == "pdf") {
        this.saveAsPdf(report, name, type);
      }
    },

    saveAsSheet(data, name, type) {
      jsonexport(data, { rowDelimiter: "\t" }, (err, csv) => {
        if (err) return console.error(err);
        let fileType = "text/csv;charset=utf-8";
        if (type == "xls") {
          fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
        }
        let blob = new Blob([csv], { type: fileType });
        FileSaver.saveAs(blob, `${name}.${type}`);
      });
    },

    saveAsPdf(data, name, type) {
      const doc = new jsPDF();
      const keys = Object.keys(data[0]);
      const head = [keys];
      const body = data.map((val) => {
        const arrVal = [];
        let keyval = Object.keys(val);
        keyval.forEach((k) => {
          arrVal.push(val[k]);
        });
        return arrVal;
      });

      let totalPagesExp = "{total_pages_count_string}";

      doc.autoTable({
        head,
        body,
        didDrawPage: function (data) {
          // Header
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.text(name, data.settings.margin.left, 22);

          // Footer
          let str = "Page " + doc.internal.getNumberOfPages();
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === "function") {
            str = str + " of " + totalPagesExp;
          }
          doc.setFontSize(10);

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          let pageSize = doc.internal.pageSize;
          let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: { top: 30 },
      });

      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save(`${name}.${type}`);
    },
  },
};
</script>
