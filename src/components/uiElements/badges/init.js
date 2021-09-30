const badges = {
  badgeUsage: () => import('./usage'),
  badgeOverlap: () => import('./overlap'),
  badgeInline: () => import('./inline'),
  badgeIcon: () => import('./icon'),
  badgeVisibility: () => import('./visibility')
}

export default badges;