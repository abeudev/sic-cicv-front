<!-- Required prop -->
<!-- location = {
  lat: value,
  lng: value
} -->
<template>
  <div id="locationPicker">
    <v-text-field
      label="Geo Location"
      append-icon="place"
      readonly
      v-model="latLng"
      :class="className" 
      :rules="rules"
      :disabled="disabled"
      @click="openDialog"
      v-if="readonly === undefined"
    ></v-text-field>
    <v-chip v-else color="green" :class="className" text-color="white" small @click="viewLocation">
      <v-avatar class="green darken-4"><v-icon>map</v-icon></v-avatar>
      View on Map
    </v-chip>

    <v-dialog v-model="dialogFull" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogFull = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ viewOnly ? "View Location" : "Set Location"}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="readonly === undefined && !viewOnly">
            <v-btn dark flat @click="save()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid grid-list-md pt-0 px-0 v-if="readonly === undefined && !viewOnly">
            <v-layout row wrap>
              <v-flex xs12 sm3>
                <v-label>Area</v-label>
                <gmap-autocomplete
                  class="pa-2 locPicker-input"
                  @place_changed="setPlace"
                >
                </gmap-autocomplete>
              </v-flex>
              <v-flex xs12 sm3 v-if="radius">
                <label class="locPicker-label">Radius (Km)</label>
                <input 
                  type="number" 
                  min="0.001" 
                  class="pa-2 locPicker-input" 
                  placeholder="Radius (Km)"
                  v-model.number="radius" />
              </v-flex>
              <v-flex xs12 sm3>
                <label class="d-block">&nbsp;</label>
                <v-btn 
                  color="primary" 
                  dark 
                  class="mb-2" 
                  depressed
                  @click="setMarker"
                >
                  Drop Pin
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <gmap-map
            :center="center"
            :zoom="12"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true" 
              :draggable="true" 
              @drag="updateCoordinates"
              @click="center=m.position"
            ></gmap-marker>
            <gmap-circle
              :center="center"
              :radius="radius * 1000"
              :options="radiusOptions"
              v-if="radius && markers.length > 0"
            ></gmap-circle>
          </gmap-map>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: ['location', 'readonly', 'rules', 'disabled', 'className'],
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      currentPlace: null,
      latLng: null,
      radius: null,
      radiusOptions: {
        strokeColor: '#00afef',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#00afef',
        fillOpacity: 0.35,
      },
      dialogFull: false,
      viewOnly: false
    }
  },
  mounted() {
    /**
     * Set value if locations props has value
     */
    if (this.location) {
      this.latLng = `${this.location.lat}, ${this.location.lng}`;
      this.center = this.location;
      this.markers[0] = { position: this.location };
      this.radius = this.location.radius || null;
    } else {
      this.geolocate();
    }
  },
  methods: {
    /**
     * Receives a place object via the autocomplete component
     */
    setPlace(place) {
      this.currentPlace = place;
    },
    /**
     * Drop marker
     */
    setMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          radius: this.radius || 0
        }
        this.markers[0] = { position: marker };
        this.center = marker;
        this.latLng = `${marker.lat}, ${marker.lng}`;
        this.$emit('update:location', marker);
        this.currentPlace = null;
      }
    },
    /**
     * Update marker position
     */
    updateCoordinates: _.debounce(function(location){
      var data = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng(),
          radius: this.radius || 0
      }
      this.latLng = `${data.lat}, ${data.lng}`;
      this.$emit('update:location', data);
    }, 500),
    /**
     * Get current location area
     */
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    },
    /**
     * Set location props
     */
    save() {
      if (!this.location) return;
      let data = {
        lat: this.location.lat,
        lng: this.location.lng,
        radius: this.radius
      }
      this.$emit('update:location', data);
      this.dialogFull = false;
    },
    /**
     * Open Modal Dialog
     */
    openDialog() {
      this.viewOnly = false;
      this.dialogFull = true;
    },
    /**
     * Open Readonly Dialog
     */
    viewLocation() {
      this.viewOnly = true;
      this.dialogFull = true;
    }
  },
  watch: {
    location: function(value) {
      this.latLng = `${value.lat}, ${value.lng}`;
      this.center = value;
      this.markers[0] = { position: value };
    }
  }
}
</script>