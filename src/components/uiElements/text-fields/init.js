const textfields = {
  textfieldsUsage: () => import('./usage'),
  textfieldsSingleLine: () => import('./singleLine'),
  textfieldsDisabledAndReadonly: () => import('./disabledAndReadonly'),
  textfieldsIcon: () => import('./icon'),
  textfieldsClearable: () => import('./clearable'),
  textfieldsIconEvents: () => import('./iconEvents'),
  textfieldsIconSlots: () => import('./iconSlots'),
  textfieldsLabelSlot: () => import('./labelSlot'),
  textfieldsCharacterCounter: () => import('./characterCounter'),
  textfieldsPassword: () => import('./password'),
  textfieldsValidation: () => import('./validation'),
  textfieldsFullWidthWithCharacterCounter: () => import('./fullWidthWithCharacterCounter'),
  textfieldsHint: () => import('./hint'),
  textfieldsPrefixesAndSuffixes: () => import('./prefixesAndSuffixes'),
  textfieldsBox: () => import('./box'),
  textfieldsSolo: () => import('./solo'),
  textfieldsOutline: () => import('./outline'),
  textfieldsCustomColors: () => import('./customColors'),
  textfieldsMasks: () => import('./masks'),
  textfieldsProgressBar: () => import('./progressBar')
}

export default textfields;