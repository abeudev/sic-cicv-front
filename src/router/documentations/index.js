const Documentations = () => import('@/views/documentations/Documentations');

const QuickStart = () => import('@/views/documentations/quickStart/QuickStart');

const DataTable = () => import('@/views/documentations/dataTable/DataTable');
const LocationPicker = () => import('@/views/documentations/locationPicker/LocationPicker');
const AvatarGenerator = () => import('@/views/documentations/avatarGenerator/AvatarGenerator');
const PhotoCropper = () => import('@/views/documentations/photoCropper/PhotoCropper');
const FormFields = () => import('@/views/documentations/formFields/FormFields');
const MultiUpload = () => import('@/views/documentations/multiUpload/MultiUpload');

const documentations = [
  {
    path: '/documentations',
    name: 'documentations',
    meta: { title: 'Documentations', layout: 'admin', requiresAuth: true },
    component: Documentations,
    redirect: '/documentations/datatable',
    children: [
      {
        path: '/documentations/quick-start',
        name: 'docsQuickStart',
        parent: 'documentations',
        meta: { title: 'Quick Start', layout: 'admin', requiresAuth: true },
        component: QuickStart
      },
      {
        path: '/documentations/datatable',
        name: 'docsDataTable',
        parent: 'documentations',
        meta: { title: 'DataTable', layout: 'admin', requiresAuth: true },
        component: DataTable
      },
      {
        path: '/documentations/avatar-generator',
        name: 'docsAvatarGenerator',
        parent: 'documentations',
        meta: { title: 'Avatar Generator', layout: 'admin', requiresAuth: true },
        component: AvatarGenerator
      },
      {
        path: '/documentations/photo-cropper',
        name: 'docsPhotoCropper',
        parent: 'documentations',
        meta: { title: 'Photo Cropper', layout: 'admin', requiresAuth: true },
        component: PhotoCropper
      },
      {
        path: '/documentations/multi-upload',
        name: 'docsMultiUpload',
        parent: 'documentations',
        meta: { title: 'Multi Upload', layout: 'admin', requiresAuth: true },
        component: MultiUpload
      },
      {
        path: '/documentations/form-fields',
        name: 'docsFormFields',
        parent: 'documentations',
        meta: { title: 'Form Fields', layout: 'admin', requiresAuth: true },
        component: FormFields
      },
      {
        path: '/documentations/location-picker',
        name: 'docsLocationPicker',
        parent: 'documentations',
        meta: { title: 'Location Picker', layout: 'admin', requiresAuth: true },
        component: LocationPicker
      }
    ]
  }
];

export default documentations;