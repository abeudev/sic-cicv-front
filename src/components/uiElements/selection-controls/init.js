const selectionControl = {
  selectionControlUsage: () => import('./usage'),
  selectionControlCheckboxesBoolean: () => import('./checkboxesBoolean'),
  selectionControlCheckboxesArray: () => import('./checkboxesArray'),
  selectionControlCheckboxesStates: () => import('./checkboxesStates'),
  selectionControlCheckboxesColors: () => import('./checkboxesColors'),
  selectionControlCheckboxesInlineTexfield: () => import('./checkboxesInlineTexfield'),
  selectionControlRadiosDefault: () => import('./radiosDefault'),
  selectionControlRadiosDirection: () => import('./radiosDirection'),
  selectionControlRadiosColors: () => import('./radiosColors'),
  selectionControlSwitchesBoolean: () => import('./switchesBoolean'),
  selectionControlSwitchesArray: () => import('./switchesArray'),
  selectionControlSwitchesStates: () => import('./switchesStates'),
  selectionControlSwitchesColors: () => import('./switchesColors'),
  selectionControlLabelSlot: () => import('./labelSlot')
}

export default selectionControl;