const expansionPanel = {
  expansionPanelUsage: () => import('./usage'),
  expansionPanelExpand: () => import('./expand'),
  expansionPanelExternal: () => import('./external'),
  expansionPanelDisabledAndReadonly: () => import('./disabledAndReadonly'),
  expansionPanelPopout: () => import('./popout'),
  expansionPanelCustomIcons: () => import('./customIcons'),
  expansionPanelIconSlot: () => import('./iconSlot'),
  expansionPanelFocusable: () => import('./focusable')
}

export default expansionPanel;