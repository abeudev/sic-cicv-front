import uiElementsData from '@/views/uiElements/uiElements.json';

const UiElements = () => import('@/views/uiElements/UiElements');
const FormElements = () => import('@/views/uiElements/FormElements');
const Wrapper = () => import('@/views/uiElements/Wrapper');

const uiElementsWrapper = {};
uiElementsData.forEach(ui => {
  if (!uiElementsWrapper[ui.type]) uiElementsWrapper[ui.type] = [];
  uiElementsWrapper[ui.type].push({
    path: ui.type == 'uiElements' ? '/ui-elements/' + ui.path : '/form-elements/' + ui.path,
    name: ui.name,
    parent: ui.type == 'uiElements' ? 'uiElements' : 'formElements',
    meta: { title: ui.title, layout: 'admin', requiresAuth: true },
    component: Wrapper
  });
});

const uiElements = [
  {
    path: '/form-elements',
    name: 'formElements',
    meta: { title: 'Form Elements', layout: 'admin', requiresAuth: true },
    component: FormElements,
    redirect: '/form-elements/autocompletes',
    children: [...uiElementsWrapper.formElements]
  },
  {
    path: '/ui-elements',
    name: 'uiElements',
    meta: { title: 'UI Elements', layout: 'admin', requiresAuth: true },
    component: UiElements,
    redirect: '/ui-elements/alerts',
    children: [...uiElementsWrapper.uiElements]
  }
];

export default uiElements;