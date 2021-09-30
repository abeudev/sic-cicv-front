const menu = {
  menuUsage: () => import('./usage'),
  menuAbsolute: () => import('./absolute'),
  menuActivatorTooltip: () => import('./menuActivatorTooltip'),
  menuHover: () => import('./hover'),
  menuMenus: () => import('./menus'),
  menuCustomTransition: () => import('./customTransition'),
  menuPopover: () => import('./popover')
}

export default menu;