const selects = {
  selectsUsage: () => import('./usage'),
  selectsLight: () => import('./light'),
  selectsIcons: () => import('./icons'),
  selectsMultiple: () => import('./multiple'),
  selectsCustomTextAndValue: () => import('./customTextAndValue'),
  selectsSlots: () => import('./slots'),
  selectsSelectionAppearance: () => import('./selectionAppearance'),
}

export default selects;