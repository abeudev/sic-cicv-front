const buttons = {
  buttonsUsage: () => import('./usage'),
  buttonsFlat: () => import('./flat'),
  buttonsRaised: () => import('./raised'),
  buttonsDepressed: () => import('./depressed'),
  buttonsDropdown: () => import('./dropdown'),
  buttonsIcon: () => import('./icon'),
  buttonsFloating: () => import('./floating'),
  buttonsLoaders: () => import('./loaders'),
  buttonsSizing: () => import('./sizing'),
  buttonsOutline: () => import('./outline'),
  buttonsRound: () => import('./round'),
  buttonsBlock: () => import('./block')
}

export default buttons;