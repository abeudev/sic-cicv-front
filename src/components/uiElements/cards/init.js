const card = {
  cardUsage: () => import('./usage'),
  cardMediaWithText: () => import('./mediaWithText'),
  cardHorizontal: () => import('./horizontal'),
  cardGrids: () => import('./grids'),
  cardCustomActions: () => import('./customActions'),
  cardTwitterCard: () => import('./twitterCard')
}

export default card;