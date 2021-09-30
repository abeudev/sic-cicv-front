import Vue from 'vue';
import alerts from '@/components/uiElements/alerts/init';
import avatars from '@/components/uiElements/avatars/init';
import badges from '@/components/uiElements/badges/init';
import bottomNav from '@/components/uiElements/bottom-navigation/init';
import bottomSheet from '@/components/uiElements/bottom-sheets/init';
import breadcrumbs from '@/components/uiElements/breadcrumbs/init';
import buttons from '@/components/uiElements/buttons/init';
import card from '@/components/uiElements/cards/init';
import chip from '@/components/uiElements/chips/init';
import dialog from '@/components/uiElements/dialogs/init';
import expansionPanel from '@/components/uiElements/expansion-panels/init';
import grid from '@/components/uiElements/grid/init';
import fab from '@/components/uiElements/floating-action-buttons/init';
import hover from '@/components/uiElements/hover/init';
import icon from '@/components/uiElements/icons/init';
import list from '@/components/uiElements/lists/init';
import menu from '@/components/uiElements/menus/init';
import progress from '@/components/uiElements/progress/init';
import rating from '@/components/uiElements/ratings/init';
import snackbar from '@/components/uiElements/snackbars/init';
import tab from '@/components/uiElements/tabs/init';
import timeline from '@/components/uiElements/timelines/init';
import toolbar from '@/components/uiElements/toolbars/init';
import tooltip from '@/components/uiElements/tooltips/init';
import treeview from '@/components/uiElements/treeview/init';
import autocomplete from '@/components/uiElements/autocompletes/init';
import combobox from '@/components/uiElements/combobox/init';
import forms from '@/components/uiElements/forms/init';
import selects from '@/components/uiElements/selects/init';
import selectionControl from '@/components/uiElements/selection-controls/init';
import sliders from '@/components/uiElements/sliders/init';
import textarea from '@/components/uiElements/textarea/init';
import textfields from '@/components/uiElements/text-fields/init';

const components = {
  // UI Elements
  ...alerts,
  ...avatars,
  ...badges,
  ...bottomNav,
  ...bottomSheet,
  ...breadcrumbs,
  ...buttons,
  ...card,
  ...chip,
  ...dialog,
  ...expansionPanel,
  ...grid,
  ...fab,
  ...hover,
  ...icon,
  ...list,
  ...menu,
  ...progress,
  ...rating,
  ...snackbar,
  ...tab,
  ...timeline,
  ...toolbar,
  ...tooltip,
  ...treeview,
  // Form Elements
  ...autocomplete,
  ...combobox,
  ...forms,
  ...selects,
  ...selectionControl,
  ...sliders,
  ...textarea,
  ...textfields
}

/**
 * Register UI Elements to Main App
 */
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});