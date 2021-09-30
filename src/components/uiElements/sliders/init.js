const sliders = {
  slidersUsage: () => import('./usage'),
  slidersThumb: () => import('./thumb'),
  slidersCustomThumb: () => import('./customThumb'),
  slidersTicks: () => import('./ticks'),
  slidersDiscrete: () => import('./discrete'),
  slidersIcons: () => import('./icons'),
  slidersEditableNumericValue: () => import('./editableNumericValue'),
  slidersCustomColors: () => import('./customColors'),
  slidersValidation: () => import('./validation'),
  slidersRange: () => import('./range'),
  slidersMinMax: () => import('./minMax'),
  slidersMetronome: () => import('./metronome')
}

export default sliders;