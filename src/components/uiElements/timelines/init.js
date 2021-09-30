const timeline = {
  timelineUsage: () => import('./usage'),
  timelineSmall: () => import('./small'),
  timelineIcons: () => import('./icons'),
  timelineAvatars: () => import('./avatars'),
  timelineColor: () => import('./color'),
  timelineSlot: () => import('./slot'),
  timelineAlert: () => import('./alert'),
  timelineAdvanced: () => import('./advanced')
}

export default timeline;