const progress = {
  progressUsage: () => import('./usage'),
  progressCircularColored: () => import('./circularColored'),
  progressCircularIndeterminate: () => import('./circularIndeterminate'),
  progressCircularSizeAndWidth: () => import('./circularSizeAndWidth'),
  progressCircularRotate: () => import('./circularRotate'),
  progressLinearDeterminate: () => import('./linearDeterminate'),
  progressLinearIndeterminate: () => import('./linearIndeterminate'),
  progressLinearCustomHeightAndContextualColors: () => import('./linearCustomHeightAndContextualColors'),
  progressLinearCustomColors: () => import('./linearCustomColors')
}

export default progress;