import uiElementsData from '@/views/uiElements/uiElements.json';

const uiElementsWrapper = {};
uiElementsData.forEach(ui => {
  if (!uiElementsWrapper[ui.type + 'Heading']) uiElementsWrapper[ui.type + 'Heading'] = [];
  if (!uiElementsWrapper[ui.type]) uiElementsWrapper[ui.type] = [];
  uiElementsWrapper[ui.type + 'Heading'].push(ui.name)
  uiElementsWrapper[ui.type].push({
    text: ui.title,
    name: ui.name,
    icon: "fiber_manual_record"
  });
});

const menuItems = [
  { 
    heading: "Principal", 
    names: [
      "dashboard", 
      "siteConfigurations", 
      "accountLogs"
    ] 
  },
  { icon: "dashboard", text: "Tableau de bord", name: "dashboard" },
  { icon: "settings", text: "Configurations du site", name: "siteConfigurations" },
  { icon: "update", text: "Logs", name: "accountLogs" },
  { 
    heading: "Metier", 
    names: [
      "boardingTypesTable", 
      "transactionsTable", 
      "colisTable",
      "colisTypeTable",
      "warehouseTable",
      "colisTrackerTable",

    ] 
  },
  { icon: "list", text: "Type d'embarquement", name: "boardingTypesTable" },
  { icon: "event", text: "Envois", name: "transactionsTable" },
  { icon: "add_shopping_cart", text: "colis", name: "colisTable" },
  { icon: "list", text: "type de colis", name: "colisTypeTable" },
  { icon: "store", text: "Entrepôt", name: "warehouseTable" },
  { icon: "menu", text: "traçage de colis externe", name: "colisTrackerTable" },
  { 
    heading: "Utilisateur", 
    names: [
      "usersTable", 
      "deliveryManTable",
      "clientTable",
      "agentTable",
      "rolesTable", 
    ] 
  },
  { icon: "group", text: "Tous les Users", name: "usersTable" },
  { icon: "receipt", text: "Livreur", name: "deliveryManTable" },
  { icon: "perm_identity", text: "Client", name: "clientTable" },
  { icon: "view_list", text: "Agent", name: "agentTable" },
  { icon: "lock", text: "Roles et Permissions", name: "rolesTable" },
 
  { 
    heading: "Sample Pages", 
    names: [
      "feedsTable", 
      "assetsTable",
    ] 
  },
  { icon: "pages", text: "Feeds", name: "feedsTable" },
  { icon: "cloud_upload", text: "File Uploads", name: "assetsTable" },

  { 
    heading: "Documentation", 
    names: [
      "docsQuickStart",
      "docsFormFields", 
      "docsDataTable", 
      "docsAvatarGenerator", 
      "docsPhotoCropper", 
      "docsMultiUpload", 
      "docsLocationPicker",
      ...uiElementsWrapper.formElementsHeading,
      ...uiElementsWrapper.uiElementsHeading
    ]
  },
  { icon: "book", text: "Quick Start", name: "docsQuickStart" },
  {
    icon: "chrome_reader_mode",
    iconArrow: "keyboard_arrow_down",
    text: "Helper Components",
    name: "documentations",
    model: false,
    children: [
      {
        text: "Form Fields",
        icon: "fiber_manual_record",
        name: "docsFormFields"
      },
      {
        text: "Location Picker",
        icon: "fiber_manual_record",
        name: "docsLocationPicker"
      },
      {
        text: "Datatable",
        icon: "fiber_manual_record",
        name: "docsDataTable"
      },
      {
        text: "Avatar Generator",
        icon: "fiber_manual_record",
        name: "docsAvatarGenerator"
      },
      {
        text: "Photo Cropper",
        icon: "fiber_manual_record",
        name: "docsPhotoCropper"
      },
      {
        text: "Multi Upload",
        icon: "fiber_manual_record",
        name: "docsMultiUpload"
      }
    ]
  },
  {
    icon: "content_paste",
    iconArrow: "keyboard_arrow_down",
    text: "Form Elements",
    name: "formElements",
    model: false,
    children: [...uiElementsWrapper.formElements]
  },
  {
    icon: "widgets",
    iconArrow: "keyboard_arrow_down",
    text: "UI Elements",
    name: "uiElements",
    model: false,
    children: [...uiElementsWrapper.uiElements]
  }
]

export default menuItems;