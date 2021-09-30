const alerts = {
  alertUsage: () => import('./usage'),
  alertClosable: () => import('./closable'),
  alertIcon: () => import('./icon'),
  alertTransition: () => import('./transition'),
  alertOutline: () => import('./outline')
}

export default alerts;