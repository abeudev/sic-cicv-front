import { mapGetters } from "vuex";

export default {
  methods: {
    /**
     * Parse date format
     * @param {Moment} momentData 
     * @param {String} format 
     */
    timeZone(momentData, format = 'DD MMM YYYY H:mm z') {
      if (momentData && this.timeAndRegion) {
        const data = this.$moment(momentData)
        return data.tz(this.timeAndRegion.timezone).format(format);
      }
    }
  },
  computed: mapGetters({
    timeAndRegion: "config/timeAndRegion"
  })
};