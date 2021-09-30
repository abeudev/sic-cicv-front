<template>
  <v-container grid-list-lg class="pb-0 pt-0">
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 sm4 class="text-xs-center">
        <v-avatar size="100%">
          <avataaars 
            :avatarOptions="{
              backgroundType: avatar.backgroundType.value,
              backgroundColor: avatar.backgroundColor.value,
              skinColor: avatar.skinColor.value,
              clothesType: avatar.clothesType.value,
              clothesColor: avatar.clothesColor.value,
              clothesGraphicsType: avatar.clothesGraphicsType.value,
              eyesType: avatar.eyesType.value,
              eyebrowType: avatar.eyebrowType.value,
              mouthType: avatar.mouthType.value,
              facialHairType: avatar.facialHairType.value,
              facialHairColor: avatar.facialHairColor.value,
              accessoriesType: avatar.accessoriesType.value,
              topType: avatar.topType.value,
              topColor: avatar.topColor.value
            }"
          />
        </v-avatar>
        <v-btn color="primary" round class="mt-3" @click="randomAvatar">Random</v-btn>
      </v-flex>
      <v-flex xs12 sm8>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 v-for="(avatar, name, i) in avatarData" :key="i">
            <v-autocomplete
              :items="avatar.options"
              v-model="avatar.value"
              :label="_.startCase(name)"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Avataaars from 'vue-avataaars'
export default {
  components: { Avataaars },
  props: ["value"],
  data() {
    return {
      isLoading: false,
      avatar: {
        backgroundType: {
          options: ["circle", "transparent"],
          value: "transparent"
        },
        backgroundColor: {
          options: [
            "black",
            "blue01",
            "blue02",
            "blue03",
            "gray01",
            "gray02",
            "heather",
            "pastelBlue",
            "pastelGreen",
            "pastelOrange",
            "pastelRed",
            "pastelYellow",
            "pink",
            "red",
            "white"
          ],
          value: "blue01"
        },
        accessoriesType: {
          options: [
            "none",
            "eyepatch",
            "kurt",
            "prescription01",
            "prescription02",
            "round"
          ],
          value: "none"
        },
        clothesType: {
          options: [
            "blazerShirt",
            "blazerSweater",
            "collarSweater",
            "graphicShirt",
            "hoodie",
            "overall",
            "shirtCrewNeck",
            "shirtScoopNeck",
            "shirtVNeck"
          ],
          value: "blazerSweater"
        },
        clothesColor: {
          options: [
            "black",
            "blue01",
            "blue02",
            "blue03",
            "gray01",
            "gray02",
            "heather",
            "pastelBlue",
            "pastelGreen",
            "pastelOrange",
            "pastelRed",
            "pastelYellow",
            "pink",
            "red",
            "white"
          ],
          value: "black"
        },
        clothesGraphicsType: {
          options: [
            "none",
            "bat",
            "cumbia",
            "diamond",
            "pizza",
            "resist",
            "selena",
            "bear",
            "skullOutline",
            "skull"
          ],
          value: "none"
        },
        eyebrowType: {
          options: [
            "angry",
            "angryNatural",
            "default",
            "defaultNatural",
            "flatNatural",
            "frownNatural",
            "raisedExcited",
            "raisedExcitedNatural",
            "sadConcerned",
            "sadConcernedNatural",
            "unibrowNatural",
            "updown",
            "updownNatural"
          ],
          value: "default"
        },
        eyesType: {
          options: [
            "close",
            "cry",
            "default",
            "dizzy",
            "eyeroll",
            "happy",
            "hearts",
            "side",
            "squint",
            "surprised",
            "wink",
            "winkWacky"
          ],
          value: "default"
        },
        facialHairType: {
          options: [
            "none",
            "beardMedium",
            "beardLight",
            "beardMajestic",
            "moustacheFancy",
            "moustacheMagnum"
          ],
          value: "none"
        },
        facialHairColor: {
          options: [
            "auburn",
            "black",
            "blonde",
            "blondeGolden",
            "brown",
            "brownDark",
            "platinum",
            "red"
          ],
          value: "brown"
        },
        mouthType: {
          options: [
            "concerned",
            "default",
            "disbelief",
            "eating",
            // "grimace",
            "sad",
            // "screamOpen",
            "serious",
            "smile",
            "tongue",
            "twinkle",
            "vomit"
          ],
          value: "default"
        },
        skinColor: {
          options: [
            "tanned",
            "yellow",
            "pale",
            "light",
            "brown",
            "darkBrown",
            "dark"
          ],
          value: "pale"
        },
        topType: {
          options: [
            "none",
            "hat",
            "hijab",
            "turban",
            "winterHat1",
            "winterHat2",
            "winterHat3",
            "winterHat4",
            "longHairBigHair",
            "longHairBob",
            "longHairBun",
            "longHairCurly",
            "longHairCurvy",
            "longHairDreads",
            "longHairFro",
            "longHairFroBand",
            "longHairNotTooLong",
            // "longHairShavedSides",
            "longHairMiaWallace",
            "longHairStraight",
            "longHairStraight2",
            "longHairStraightStrand",
            "shortHairDreads01",
            "shortHairDreads02",
            "shortHairFrizzle",
            "shortHairShaggyMullet",
            "shortHairShortCurly",
            "shortHairShortFlat",
            "shortHairShortRound",
            "shortHairShortWaved",
            "shortHairSides",
            "shortHairTheCaesar",
            "shortHairTheCaesarSidePart"
          ],
          value: "shortHairShortFlat"
        },
        topColor: {
          options: [
            "auburn",
            "black",
            "blonde",
            "blondeGolden",
            "brown",
            "brownDark",
            "platinum",
            "red",
            "blue01",
            "blue02",
            "blue03",
            "gray01",
            "gray02",
            "heather",
            "pastelBlue",
            "pastelGreen",
            "pastelOrange",
            "pastelRed",
            "pastelYellow",
            "pink",
            "red01",
            "white"
          ],
          value: "black"
        }
      }
    }
  },
  computed: {
    avatarData() {
      const avatar = {};
      Object.keys(this.avatar).forEach(key => {
        if (key !== 'clothesGraphicsType') {
          avatar[key] = this.avatar[key];
        }
      });
      return avatar;
    }
  },
  watch: {
    avatar: {
      handler() {
        this.setValue();
      },
      deep: true
    },
    value() {
      this.initAvatar();
    }
  },
  mounted() {
    this.initAvatar();
  },
  methods: {
    /**
     * Assign value for vue-avataaars component
     */
    initAvatar() {
      Object.keys(this.avatar).forEach((item, i) => {
        if (this.getQueryParam(item)) this.avatar[item].value = this.getQueryParam(item);
      });
    },
    /**
     * Randomize value
     */
    randomAvatar() {
      Object.keys(this.avatar).forEach((item, i) => {
        let rand = this.avatar[item].options[Math.floor(Math.random() * this.avatar[item].options.length)];
        this.avatar[item].value = rand;
      });
      this.setValue();
    },
    /**
     * Set value from avatar values
     * Assign result to value props
     */
    setValue() {
      let url = "avatar?";
      Object.keys(this.avatar).forEach((item, i) => {
        if (i < this.ObjLength(this.avatar) - 1) {
          url += `${item}=${this.avatar[item].value}&`;
        } else {
          url += `${item}=${this.avatar[item].value}`;
        }
      });
      this.$emit("update:value", url);
    },
    /**
     * Count Obj
     * @param {Object} obj 
     * @returns {Number}
     */
    ObjLength(obj) {
      let size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    },
    /**
     * Get avatar url
     * @param {Object} result 
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
