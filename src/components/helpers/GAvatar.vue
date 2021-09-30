<template>
  <div class="v-responsive v-image g-avatar" :class="className">
    <avataaars 
      :avatarOptions="{
        backgroundType: avatar.backgroundType,
        backgroundColor: avatar.backgroundColor,
        skinColor: avatar.skinColor,
        clothesType: avatar.clothesType,
        clothesColor: avatar.clothesColor,
        clothesGraphicsType: avatar.clothesGraphicsType,
        eyesType: avatar.eyesType,
        eyebrowType: avatar.eyebrowType,
        mouthType: avatar.mouthType,
        facialHairType: avatar.facialHairType,
        facialHairColor: avatar.facialHairColor,
        accessoriesType: avatar.accessoriesType,
        topType: avatar.topType,
        topColor: avatar.topColor
      }"
    />
  </div>
</template>

<script>
import Avataaars from 'vue-avataaars'
export default {
  components: { Avataaars },
  props: ["value", "className"],
  data() {
    return {
      avatar: {
        accessoriesType: "none",
        backgroundColor: "blue01",
        backgroundType: "transparent",
        clothesColor: "black",
        clothesGraphicsType: "none",
        clothesType: "blazerSweater",
        eyebrowType: "default",
        eyesType: "default",
        facialHairColor: "brown",
        facialHairType: "none",
        mouthType: "default",
        skinColor: "pale",
        topColor: "black",
        topType: "shortHairShortFlat"
      }
    }
  },
  watch: {
    value(val) {
      this.initAvatar();
    }
  },
  mounted() {
    this.initAvatar()
  },
  methods: {
    /**
     * Assign value for vue-avataaars component
     */
    initAvatar() {
      Object.keys(this.avatar).forEach((item, i) => {
        if (this.getQueryParam(item)) this.avatar[item] = this.getQueryParam(item);
      });
    },
    /**
     * Get avatar param value
     * @param {String} name
     * @returns {String}
     */
    getQueryParam(name) {
      const url = this.value;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }
}
</script>