const rating = {
  ratingUsage: () => import('./usage'),
  ratingSizes: () => import('./sizes'),
  ratingLength: () => import('./length'),
  ratingIncrements: () => import('./increments'),
  ratingSlots: () => import('./slots'),
  ratingCard: () => import('./card'),
  ratingAdvanced: () => import('./advanced')
}

export default rating;