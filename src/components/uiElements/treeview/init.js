const treeview = {
  treeviewUsage: () => import('./usage'),
  treeviewHumanResources: () => import('./humanResources'),
  treeviewFileExplorer: () => import('./fileExplorer'),
  treeviewDirectory: () => import('./directory'),
  treeviewHotspots: () => import('./hotspots')
}

export default treeview;