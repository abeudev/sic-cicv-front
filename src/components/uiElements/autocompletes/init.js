const autocomplete = {
  autocompleteUsage: () => import('./usage'),
  autocompleteApi: () => import('./api'),
  autocompleteScopedSlots: () => import('./scopedSlots'),
  autocompleteCustomFilter: () => import('./customFilter'),
  autocompleteAsynchronous: () => import('./asynchronous'),
  autocompleteAdvanced: () => import('./advanced')
}

export default autocomplete;