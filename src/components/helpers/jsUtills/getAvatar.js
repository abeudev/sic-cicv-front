const avatar = {
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

/**
 * Count Obj
 * @param {Object} obj 
 * @returns {Number}
 */
const ObjLength = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

/**
 * Get avatar url
 * @param {Object} result 
 * @returns {String}
 */
const getValue = function(result) {
  let url = "avatar?";
  Object.keys(result).forEach((item, i) => {
    if (i < ObjLength(result) - 1) {
      url += `${item}=${result[item]}&`;
    } else {
      url += `${item}=${result[item]}`;
    }
  });
  return url;
}

/**
 * Get avatar
 * @returns {String}
 */
export function getRandomAvatar() {
  const result = {};
  Object.keys(avatar).forEach((item, i) => {
    let rand = avatar[item].options[Math.floor(Math.random() * avatar[item].options.length)];
    result[item] = rand;
  });
  return getValue(result);
}