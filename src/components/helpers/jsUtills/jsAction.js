import { updateRowTable, deleteRowTable } from "../../../api/utilities/datatable";

/**
 * Archive Helper
 * @param {Component} component 
 * @param {String} url 
 * @param {String} id 
 * @returns {Boolean}
 */
export async function archiveItem(component, url, id) {
  const body = {
    _id: id,
    isActive: false
  };
  const del = await component.$root.$confirm(
    "Archive?",
    "Are you sure you want to archive this data?",
    { color: "error lighten-1" }
  );
  try {
    if (del) {
      component.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
      await updateRowTable(url, body);
      component.$root.$dialogLoader.hide();
      component.$snotify.success("Data archived", "Success");
    }
    return del;
  } catch (error) {
    console.log(error)
    component.notifyErrors(error);
    component.$root.$dialogLoader.hide();
    return false;
  }
}

/**
 * Activate Helper
 * @param {Component} component 
 * @param {String} url 
 * @param {String} id 
 * @returns {Boolean}
 */
export async function activateItem(component, url, id) {
  const body = {
    _id: id,
    isActive: true
  };
  const activate = await component.$root.$confirm(
    "Activate?",
    "Are you sure you want to activate this data?",
    { color: "success lighten-1" }
  );
  try {
    if (activate) {
      component.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
      await updateRowTable(url, body);
      component.$root.$dialogLoader.hide();
      component.$snotify.success("Data activated", "Success");
    }
    return activate;
  } catch (error) {
    console.log(error)
    component.notifyErrors(error);
    component.$root.$dialogLoader.hide();
    return false;
  }
}

/**
 * Delete Helper
 * @param {Component} component 
 * @param {String} url 
 * @param {String} id 
 * @returns {Boolean}
 */
export async function deleteItem(component, url, id) {
  const deleteUrl = url + '/' + id;
  const del = await component.$root.$confirm(
    "Delete?",
    "Are you sure you want to delete this data?",
    { color: "error lighten-1" }
  );
  try {
    if (del) {
      component.$root.$dialogLoader.show('Please wait...', { color: 'primary' });
      await deleteRowTable(deleteUrl);
      component.$root.$dialogLoader.hide();
      component.$snotify.success("Data deleted", "Success");
    }
    return del;
  } catch (error) {
    console.log(error)
    component.notifyErrors(error);
    component.$root.$dialogLoader.hide();
    return false;
  }
}