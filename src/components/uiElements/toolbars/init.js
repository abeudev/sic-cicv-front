const toolbar = {
  toolbarUsage: () => import('./usage'),
  toolbarAppBar: () => import('./appBar'),
  toolbarAppBarItems: () => import('./appBarItems'),
  toolbarAppBarExtension: () => import('./appBarExtension'),
  toolbarColumnWidthWithHierarchy: () => import('./columnWidthWithHierarchy'),
  toolbarFlexibleAndCard: () => import('./flexibleAndCard'),
  toolbarFloatingWithSearch: () => import('./floatingWithSearch'),
  toolbarVariations: () => import('./variations'),
  toolbarProminent: () => import('./prominent'),
  toolbarDense: () => import('./dense'),
  toolbarScrolling: () => import('./scrolling'),
  toolbarAppBarMenu: () => import('./appBarMenu')
}

export default toolbar;