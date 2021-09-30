const grid = {
  gridUsage: () => import('./usage'),
  gridPlayground: () => import('./playground'),
  gridOffset: () => import('./offset'),
  gridOrder: () => import('./order'),
  gridDirectionAndAlign: () => import('./directionAndAlign'),
  gridRowColumnBreakpoint: () => import('./rowColumnBreakpoint'),
  gridGrowShrink: () => import('./growShrink'),
  gridNestedGrid: () => import('./nestedGrid'),
  gridUniqueLayouts: () => import('./uniqueLayouts'),
  gridSpacer: () => import('./spacer'),
  gridTags: () => import('./tags')
}

export default grid;