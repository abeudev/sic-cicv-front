const dialog = {
  dialogUsage: () => import('./usage'),
  dialogWithoutActivator: () => import('./withoutActivator'),
  dialogModal: () => import('./modal'),
  dialogFullscreen: () => import('./fullscreen'),
  dialogForm: () => import('./form'),
  dialogScrollable: () => import('./scrollable'),
  dialogOverflowed: () => import('./overflowed'),
  dialogAdvanced: () => import('./advanced'),
  dialogLoader: () => import('./loader')
}

export default dialog;