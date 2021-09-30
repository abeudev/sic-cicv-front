<template>
  <v-container grid-list-lg pl-0 pr-0 id="tab-requirements">
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="primary--text">Requirements</h3>
        <ul>
          <li>NodeJS v8 or above</li>
          <li>MongoDB v4</li>
          <li>Javascript Skill</li>
          <li>Basic MongoDB Skill</li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <h3 class="primary--text">Installation</h3>
        <ul>
          <li class="mb-2">
            <h4>Backend</h4>
            <ul>
              <li>Find file index.js in <code>/src/config/index.js</code></li>
              <li>Update the <code>database</code> field <code>username, password, dbname, url</code></li>
              <li>Update <code>server</code> field to your server url</li>
              <li>Update <code>frontEnd.baseUrl</code> field</li>
              <li>Update <code>jwt</code> field as you wish</li>
              <li>
                Update <code>mail</code> field as your email. This will be used to send activation email for register user and forgot password. Don't forget to enable access to your email.
              </li>
              <li>Create a Database</li>
              <li>
                Run <code>npm install</code> inside folder <code>backend-nodejs</code>
              </li>
              <li>
                Run <code>npm run dev</code> for dev, <code>npm start</code> for prod
              </li>
            </ul>
          </li>
          <li class="mb-2">
            <h4>Frontend</h4>
            <ul>
              <li>Find file .env in frontend root folder</li>
              <li>Update <code>VUE_APP_API_BASE_URL</code> field to your server url</li>
              <li>
                Update <code>VUE_APP_API_KEY_GMAP</code> field to API Key Google Map. 
                See <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">Generating a Google Maps API key</a>
              </li>
              <li>
                Run <code>npm install</code> inside folder <code>frontend-vue</code>
              </li>
              <li>
                Run <code>npm run dev</code> for dev, <code>npm run build</code> to build for prod
              </li>
              <li>
                Open page <code>/install</code>
              </li>
              <li>Fill the form and submit</li>
              <li>It will create Super Admin User and default Site Configurations</li>
            </ul>
            <v-card class="mt-2">
              <img
                src="@/assets/installPage.png"
                class="grey darken-4"
              />
            </v-card>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  
};
</script>