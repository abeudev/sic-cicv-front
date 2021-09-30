const tab = {
  tabUsage: () => import('./usage'),
  tabFixedTabs: () => import('./fixedTabs'),
  tabRight: () => import('./right'),
  tabContent: () => import('./content'),
  tabSearch: () => import('./search'),
  tabIconsAndText: () => import('./iconsAndText'),
  tabDesktop: () => import('./desktop'),
  tabAlignWithTitle: () => import('./alignWithTitle'),
  tabGrow: () => import('./grow'),
  tabOverflowToMenu: () => import('./overflowToMenu'),
  tabPagination: () => import('./pagination'),
  tabIcons: () => import('./icons')
}

export default tab;