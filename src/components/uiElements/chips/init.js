const chip = {
  chipUsage: () => import('./usage'),
  chipColored: () => import('./colored'),
  chipIcon: () => import('./icon'),
  chipOutline: () => import('./outline'),
  chipLabel: () => import('./label'),
  chipClosable: () => import('./closable'),
  chipInSelects: () => import('./inSelects'),
}

export default chip;